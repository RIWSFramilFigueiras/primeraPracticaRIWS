package com.figueiras.photocontest.backend.model.entities;

import org.apache.solr.client.solrj.beans.Field;

public class VueltaRapida {

    @Field public String granPremio_fl;
    @Field public String tiempo_fl;
    @Field public String nombre_fl;
    @Field public String apellido_fl;
    @Field public String iniciales_fl;
    @Field public String equipo_fl;
    @Field public int ano;

    public VueltaRapida(String granPremio_fl, String tiempo_fl, String nombre_fl, String apellido_fl, String iniciales_fl, String equipo_fl, int ano) {
        this.granPremio_fl = granPremio_fl;
        this.tiempo_fl = tiempo_fl;
        this.nombre_fl = nombre_fl;
        this.apellido_fl = apellido_fl;
        this.iniciales_fl = iniciales_fl;
        this.equipo_fl = equipo_fl;
        this.ano = ano;
    }

    public VueltaRapida() {
    }
}
