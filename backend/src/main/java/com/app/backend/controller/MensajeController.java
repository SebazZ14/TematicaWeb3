package com.app.backend.controller;

import com.app.backend.dto.MensajeDTO;
import com.app.backend.service.MensajeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mensaje")
@CrossOrigin(origins = "http://localhost:4200")
public class MensajeController {

    private final MensajeService service;

    public MensajeController(MensajeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<MensajeDTO> getMensaje() {
        return ResponseEntity.ok(service.obtenerOCrearSaludo());
    }
}