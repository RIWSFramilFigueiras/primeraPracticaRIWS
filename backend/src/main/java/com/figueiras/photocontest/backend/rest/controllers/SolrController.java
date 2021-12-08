package com.figueiras.photocontest.backend.rest.controllers;

import com.figueiras.photocontest.backend.model.entities.GranPremio;
import com.figueiras.photocontest.backend.model.entities.RespuestaSolr;
import com.figueiras.photocontest.backend.model.entities.ResultadoFacetado;
import com.figueiras.photocontest.backend.model.entities.VueltaRapida;
import com.figueiras.photocontest.backend.rest.dtos.UsuarioCambioContraseñaDto;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/grandesPremios")
public class SolrController {

    // Se establece la URL al core porque todas las peticiones van a ese mismo core
    private final String SOLR_URL = "http://localhost:8983/solr/formulaData";

    private HttpSolrClient getSolrClient(){
        return new HttpSolrClient.Builder(SOLR_URL)
                .withConnectionTimeout(10000)
                .withSocketTimeout(60000)
                .build();
    }

    @PostMapping("/victorias")
    private RespuestaSolr obtenerVictorias(@RequestBody FormulaDataQueryParams queryParams)
            throws SolrServerException, IOException, ParseException {
        final SolrClient client = getSolrClient();

        // Si las fechas han sido especificadas, se transforman al formato esperado por Solr
        final String fechaDesde = transformDateToSolrFormat(queryParams.getFechaDesde());
        final String fechaHasta = transformDateToSolrFormat(queryParams.getFechaHasta());

        final String queryStr =
                "granPremio:" + queryParams.getGranPremio() + " && " +
                "nombre:" + queryParams.getNombre() + " && " +
                "apellido:" + queryParams.getApellido() + " && " +
                "iniciales:" + queryParams.getIniciales() + " && " +
                "equipo:" + queryParams.getEquipo() + " && " +
                "fecha:[" + fechaDesde + " TO " + fechaHasta + "]";
        final SolrQuery query = new SolrQuery(queryStr);
        // Ordenar por fecha
        query.setSort("fecha", SolrQuery.ORDER.asc);

        // Paginacion
        query.setStart((queryParams.getPage() - 1) * queryParams.getSize());
        query.setRows(queryParams.getSize());

        // Añadiendo el campo de facetado
        query.addFacetField("apellido");

        final QueryResponse response = client.query(query);
        final List<GranPremio> resultadoBusqueda = response.getBeans(GranPremio.class);

        // Se recuperan los datos relativos al facetado, en este caso solo de apellido, pero queda preparado para varios
        List<FacetField> facetFields = response.getFacetFields();
        List<ResultadoFacetado> resultadoFacetado = getResultadoFacetado(facetFields);

        RespuestaSolr resultado = new RespuestaSolr();
        resultado.setResultadoBusqueda(resultadoBusqueda);
        resultado.setResultadoFacetado(resultadoFacetado);

        return resultado;
    }

    @PostMapping("/vueltasRapidas")
    private RespuestaSolr obtenerVueltasRapidas(@RequestBody FormulaDataQueryParams queryParams)
            throws SolrServerException, IOException, ParseException {
        final SolrClient client = getSolrClient();

        String queryStr =
            "granPremio_fl:" + queryParams.getGranPremio() + " && " +
            "nombre_fl:" + queryParams.getNombre() + " && " +
            "apellido_fl:" + queryParams.getApellido() + " && " +
            "iniciales_fl:" + queryParams.getIniciales() + " && " +
            "equipo_fl:" + queryParams.getEquipo();

        // Si viene fecha, se añade a query, si no no se filtra por fecha para
        // que aparezcan todas las vueltas rápidas
        if(!queryParams.getAno().equals("")){
            queryStr = queryStr + " && " + "ano:" + queryParams.getAno();
        }
        
        final SolrQuery query = new SolrQuery(queryStr);
        // Ordenar por fecha
        query.setSort("ano", SolrQuery.ORDER.asc);

        // Paginacion
        query.setStart((queryParams.getPage() - 1) * queryParams.getSize());
        query.setRows(queryParams.getSize());

        // Añadiendo el campo de facetado
        query.addFacetField("apellido_fl");

        final QueryResponse response = client.query(query);
        final List<VueltaRapida> resultadoBusqueda = response.getBeans(VueltaRapida.class);

        // Se recuperan los datos relativos al facetado, en este caso solo de apellido, pero queda preparado para varios
        List<FacetField> facetFields = response.getFacetFields();
        List<ResultadoFacetado> resultadoFacetado = getResultadoFacetado(facetFields);

        RespuestaSolr resultado = new RespuestaSolr();
        resultado.setResultadoBusqueda(resultadoBusqueda);
        resultado.setResultadoFacetado(resultadoFacetado);

        return resultado;
    }

    private String transformDateToSolrFormat(String date) throws ParseException {
        if(!date.equals("*")){
            return date + "T00:00:00Z";
        }else{
            return date;
        }
    }

    private List<ResultadoFacetado> getResultadoFacetado(List<FacetField> facetFields){
        List<ResultadoFacetado> resultadoFacetado = new ArrayList<>();
        for (int i = 0; i < facetFields.size(); i++) {
            FacetField facetField = facetFields.get(i);
            List<FacetField.Count> facetInfo = facetField.getValues();

            // Se eliminan los apellidos con 0 coincidencias
            for (FacetField.Count facetInstance : facetInfo) {
                if(facetInstance.getCount() != 0){
                    ResultadoFacetado rf = new ResultadoFacetado();
                    rf.setApellido(facetInstance.getName());
                    rf.setOcurrencias(facetInstance.getCount());
                    resultadoFacetado.add(rf);
                }
            }
        }
        return  resultadoFacetado;
    }
}
