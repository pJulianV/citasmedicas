/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hospital.citasmedicas.ServiceImpl;

import com.hospital.citasmedicas.Dao.PacienteDao;
import com.hospital.citasmedicas.Modelo.Paciente;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hospital.citasmedicas.Service.ServicePaciente;

/**
 *
 * @author Usuario
 */
@Service
public class ServicePacienteImpl implements ServicePaciente {
    
    @Autowired
    private PacienteDao getDao;

    @Override
    public List<Paciente> getListaPaciente() {
        return getDao.findAll();
    }
    @Override
    public Paciente crearPaciente(Paciente paciente) {
        if (paciente != null) {
            return getDao.save(paciente);
        }
        return null;
    }
    @Override
    public Paciente ActualizarPaciente(Paciente paciente) {
        if (paciente != null && paciente.getIdpk() != 0) {
            Paciente pacienteBD = getDao.getReferenceById(paciente.getIdpk());
            if (pacienteBD != null) {
                pacienteBD.setNombre(paciente.getNombre());
                pacienteBD.setTelefono(paciente.getTelefono());
                pacienteBD.setTelefono(paciente.getTelefono());
                return getDao.save(pacienteBD);
            }
        }
        return null;
    }
    @Override
    public Boolean EliminarPaciente(Long id) {
 
        if(id != null && id != 0){
            Paciente pacienteBD = getDao.getReferenceById(id);
            if(pacienteBD != null){
                getDao.deleteById(id);
                 return true;
            }
          }
           return false;
    }

    
}
