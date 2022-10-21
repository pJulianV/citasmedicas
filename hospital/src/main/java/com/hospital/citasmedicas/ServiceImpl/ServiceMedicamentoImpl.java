/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hospital.citasmedicas.ServiceImpl;

import com.hospital.citasmedicas.Dao.MedicamentoDao;
import com.hospital.citasmedicas.Modelo.Medicamento;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hospital.citasmedicas.Service.ServiceMedicamento;

/**
 *
 * @author Usuario
 */
@Service

public class ServiceMedicamentoImpl implements ServiceMedicamento{
    
    @Autowired
    private MedicamentoDao getDao;

    @Override
    public List<Medicamento> getListaMedicamento() {
        return getDao.findAll();
    }
    @Override
    public Medicamento crearMedicamento(Medicamento medicamento) {
        if (medicamento != null) {
            return getDao.save(medicamento);
        }
        return null;
    }
    @Override
    public Medicamento ActualizarMedicamento(Medicamento medicamento) {
        if (medicamento != null && medicamento.getIdpk() != 0) {
            Medicamento medicamentoBD = getDao.getReferenceById(medicamento.getIdpk());
            if (medicamentoBD != null) {
                medicamentoBD.setCosto(medicamento.getCosto());
                medicamentoBD.setName(medicamento.getName());
                return getDao.save(medicamentoBD);
            }
        }
        return null;
    }

    @Override
    public Boolean EliminarMedicamento(Long id) {
        if (id != null && id != 0) {
            Medicamento medicamentoBD = getDao.getReferenceById(id);
            if (medicamentoBD != null) {
                getDao.deleteById(id);
                return true;
            }
        }
        return false;
    }

    
}
