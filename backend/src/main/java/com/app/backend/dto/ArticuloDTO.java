package com.app.backend.dto;

public record ArticuloDTO(
        Long id,
        String titulo,
        String categoria,
        String resumen,
        String contenido,
        String icono,
        Integer tiempoLectura,
        String autor
) {}
