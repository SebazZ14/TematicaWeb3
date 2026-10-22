package com.app.backend.dto;

import java.time.LocalDateTime;

public record ResultadoQuizDTO(
        Long id,
        String nombreParticipante,
        Integer puntaje,
        Integer totalPreguntas,
        String nivelComunicacion,
        LocalDateTime fecha
) {}
