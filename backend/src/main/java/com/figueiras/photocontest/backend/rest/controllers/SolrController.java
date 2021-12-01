package com.figueiras.photocontest.backend.rest.controllers;

import com.figueiras.photocontest.backend.model.entities.GranPremio;
import com.figueiras.photocontest.backend.rest.dtos.UsuarioCambioContraseñaDto;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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

    @PostMapping("/query")
    private List<GranPremio> querySolr(@RequestBody FormulaDataQueryParams queryParams)
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


        final QueryResponse response = client.query(query);
        final List<GranPremio> resultado = response.getBeans(GranPremio.class);

        return resultado;
    }

    private String transformDateToSolrFormat(String date) throws ParseException {
        if(!date.equals("*")){
            return date + "T00:00:00Z";
        }else{
            return date;
        }
    }
}
