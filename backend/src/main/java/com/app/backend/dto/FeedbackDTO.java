package com.app.backend.dto;

import java.time.LocalDateTime;

public record FeedbackDTO(
        Long id,
        String nombre,
        String tipoMensaje,
        String mensaje,
        LocalDateTime fecha
) {}
