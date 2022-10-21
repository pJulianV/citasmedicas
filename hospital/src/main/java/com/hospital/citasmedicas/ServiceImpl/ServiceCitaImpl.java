/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hospital.citasmedicas.ServiceImpl;

import com.hospital.citasmedicas.Dao.CitaDao;
import com.hospital.citasmedicas.Modelo.Cita;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hospital.citasmedicas.Service.ServiceCita;

/**
 *
 * @author Usuario
 */

@Service

public class ServiceCitaImpl implements ServiceCita{

    @Autowired
    private CitaDao getDao;
    
    @Override
    public List<Cita> getListaCita() {
        return getDao.findAll();
    }
    @Override
    public Cita crearCita(Cita cita) {
        if(cita != null){
            return getDao.save(cita);
        }
        return null;
    }
    @Override
    public Cita ActualizarCita(Cita cita) {
        if(cita != null && cita.getIdpk() != 0){
            Cita citaBD = getDao.getReferenceById(cita.getIdpk());
            if(citaBD != null){
                citaBD.setConsultorio(cita.getConsultorio()==0?citaBD.getConsultorio()
                        :citaBD.getConsultorio()+citaBD.getConsultorio());
                return getDao.save(citaBD);
            } 
        }
        return null;
    }
    @Override
    public Boolean EliminarCita(Long id) {
          if(id != null && id != 0){
            Cita citaBD = getDao.getReferenceById(id);
            if(citaBD != null){
                getDao.deleteById(id);
                 return true;
            }
          }
           return false;
    }
  
}
