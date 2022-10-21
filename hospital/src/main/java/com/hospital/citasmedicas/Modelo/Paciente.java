/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hospital.citasmedicas.Modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "paciente")


public class Paciente {
        
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "paci_id_pk")
    private Long idpk;
    
    @Column(name = "paci_nombre", nullable = false)
    private String nombre;
    

    @Column(name = "paci_apellido")
    private String apellido;
    
    @Column(name = "paci_tel")
    @Size(min = 8,max = 15,message = "el numero telefono solo se "
            + "permiten un rango de 9 a 15 carateres")
    private String telefono;
    
    
    public Paciente() {
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Long getIdpk() {
        return idpk;
    }

    public void setIdpk(Long idpk) {
        this.idpk = idpk;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
    
}
