/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.hospital.citasmedicas.Service;

import com.hospital.citasmedicas.Modelo.Medicamento;
import java.util.List;

/**
 *
 * @author Usuario
 */
public interface ServiceMedicamento {
    
    List<Medicamento> getListaMedicamento();
    Medicamento crearMedicamento(Medicamento medicamento);
    Medicamento ActualizarMedicamento(Medicamento medicamento);
    Boolean EliminarMedicamento(Long id);
    
}
