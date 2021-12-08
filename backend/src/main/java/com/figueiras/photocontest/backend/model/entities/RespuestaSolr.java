package com.figueiras.photocontest.backend.model.entities;

import java.util.List;

public class RespuestaSolr {

    private List resultadoBusqueda;
    private List resultadoFacetado;

    public RespuestaSolr() {
    }

    public List getResultadoBusqueda() {
        return resultadoBusqueda;
    }

    public void setResultadoBusqueda(List resultadoBusqueda) {
        this.resultadoBusqueda = resultadoBusqueda;
    }

    public List getResultadoFacetado() {
        return resultadoFacetado;
    }

    public void setResultadoFacetado(List resultadoFacetado) {
        this.resultadoFacetado = resultadoFacetado;
    }
}
