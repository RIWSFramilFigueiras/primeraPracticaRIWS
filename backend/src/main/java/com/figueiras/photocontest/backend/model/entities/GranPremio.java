package com.figueiras.photocontest.backend.model.entities;

import org.apache.solr.client.solrj.beans.Field;

import java.util.Date;

public class GranPremio {

    @Field public String granPremio;
    @Field public Date fecha;
    @Field public String nombre;
    @Field public String apellido;
    @Field public String iniciales;
    @Field public String equipo;

    public GranPremio(String granPremio, Date fecha, String nombre, String apellido, String iniciales, String equipo) {
        this.granPremio = granPremio;
        this.fecha = fecha;
        this.nombre = nombre;
        this.apellido = apellido;
        this.iniciales = iniciales;
        this.equipo = equipo;
    }

    public GranPremio() {}
}
