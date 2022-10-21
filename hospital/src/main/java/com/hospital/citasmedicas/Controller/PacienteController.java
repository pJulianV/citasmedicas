/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hospital.citasmedicas.Controller;

import com.hospital.citasmedicas.Modelo.Paciente;
import com.hospital.citasmedicas.ServiceImpl.ServicePacienteImpl;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
@RequestMapping(value = "/paciente")

public class PacienteController {
    
     @Autowired
    private ServicePacienteImpl servicePaciente;

    @GetMapping(value = "")
    public ResponseEntity<List<Paciente>> ListaPaciente() {
        List<Paciente> lista = servicePaciente.getListaPaciente();
        return ResponseEntity.ok(lista);
    }

    @PostMapping(value = "")
    public ResponseEntity<Paciente> CrearPaciente(@Valid @RequestBody Paciente cita, 
            BindingResult result) {
        if (result.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, result.getFieldError()
                    .getDefaultMessage());
        }
        Paciente crear = servicePaciente.crearPaciente(cita);
        return ResponseEntity.ok(crear);
    }

    @PutMapping(value = "")
    public ResponseEntity<Paciente> ActualizarPaciente(@RequestBody Paciente cita) {
        Paciente actualizar = servicePaciente.ActualizarPaciente(cita);
        return ResponseEntity.ok(actualizar);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> EliminarPaciente(@PathVariable("id") Long id) {
        if (id != null) {
            if (servicePaciente.EliminarPaciente(id)) {
                return ResponseEntity.ok().body("Eliminado");
            }
        }

        return ResponseEntity.notFound().build();
    }
    
}
