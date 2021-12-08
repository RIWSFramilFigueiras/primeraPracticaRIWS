package com.figueiras.photocontest.backend.model.entities;

public class ResultadoFacetado {

    private String apellido;
    private long ocurrencias;

    public ResultadoFacetado() {
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public long getOcurrencias() {
        return ocurrencias;
    }

    public void setOcurrencias(long ocurrencias) {
        this.ocurrencias = ocurrencias;
    }
}
