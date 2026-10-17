package com.app.backend.service;

import com.app.backend.dto.MensajeDTO;
import com.app.backend.model.Mensaje;
import com.app.backend.repository.MensajeRepository;
import org.springframework.stereotype.Service;

@Service
public class MensajeService {

    private final MensajeRepository repository;

    public MensajeService(MensajeRepository repository) {
        this.repository = repository;
    }

    public MensajeDTO obtenerOCrearSaludo() {
        return repository.findAll().stream()
                .findFirst()
                .map(m -> new MensajeDTO(m.getId(), m.getTexto()))
                .orElseGet(() -> {
                    Mensaje nuevo = repository.save(new Mensaje(null, "Â¡Hola Mundo desde Spring Boot y PostgreSQL en Docker!"));
                    return new MensajeDTO(nuevo.getId(), nuevo.getTexto());
                });
    }
}