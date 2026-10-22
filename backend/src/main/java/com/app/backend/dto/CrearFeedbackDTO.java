package com.app.backend.dto;

public record CrearFeedbackDTO(
        String nombre,
        String tipoMensaje,
        String mensaje
) {}
