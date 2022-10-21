/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.hospital.citasmedicas.Service;

import com.hospital.citasmedicas.Modelo.Cita;
import java.util.List;

/**
 *
 * @author Usuario
 */
public interface ServiceCita {
    
    List<Cita> getListaCita();
    Cita crearCita(Cita cita);
    Cita ActualizarCita(Cita cita); //Ac
    Boolean EliminarCita(Long id);
    
}
