/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hospital.citasmedicas.Controller;

import com.hospital.citasmedicas.Modelo.Medicamento;
import com.hospital.citasmedicas.ServiceImpl.ServiceMedicamentoImpl;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author Usuario
 */
@RestController
@CrossOrigin(origins={"http://127.0.0.1:5502/"})
@RequestMapping(value = "/medicamento")




public class MedicamentoController {
    
     @Autowired
    private ServiceMedicamentoImpl serviceMedicamento;

    @GetMapping(value = "")
    public ResponseEntity<List<Medicamento>> ListaMedicamento() {
        List<Medicamento> lista = serviceMedicamento.getListaMedicamento();
        return ResponseEntity.ok(lista);
    }

    @PostMapping(value = "")
    public ResponseEntity<Medicamento> CrearMedicamento(@Valid @RequestBody Medicamento cita, BindingResult result) {
        if (result.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, result.getFieldError()
                    .getDefaultMessage());
        }
        Medicamento crear = serviceMedicamento.crearMedicamento(cita);
        return ResponseEntity.ok(crear);
    }

    @PutMapping(value = "")
    public ResponseEntity<Medicamento> ActualizarMedicamento(@RequestBody Medicamento cita) {
        Medicamento actualizar = serviceMedicamento.ActualizarMedicamento(cita);
        return ResponseEntity.ok(actualizar);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> EliminarMedicamento(@PathVariable("id") Long id) {
        if (id != null) {
            if (serviceMedicamento.EliminarMedicamento(id)) {
                return ResponseEntity.ok().body("Eliminado");
            }
        }

        return ResponseEntity.notFound().build();
    }
    
}
