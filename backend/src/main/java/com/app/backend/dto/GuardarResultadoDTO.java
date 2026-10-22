package com.app.backend.dto;

public record GuardarResultadoDTO(
        String nombreParticipante,
        Integer puntaje,
        Integer totalPreguntas
) {}
