package com.app.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record GuardarResultadoDTO(
        @NotBlank(message = "El nombre del participante es obligatorio")
        @Size(min = 2, max = 60, message = "El nombre debe tener entre 2 y 60 caracteres")
        @Pattern(
                regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s.'\\-]{2,60}$",
                message = "El nombre solo puede contener letras, acentos y espacios. No se permiten caracteres especiales como $, <, > o scripts"
        )
        String nombreParticipante,

        @NotNull(message = "El puntaje es obligatorio")
        @Min(value = 0, message = "El puntaje no puede ser negativo")
        @Max(value = 20, message = "El puntaje excede el límite permitido")
        Integer puntaje,

        @NotNull(message = "El total de preguntas es obligatorio")
        @Min(value = 1, message = "El total de preguntas debe ser al menos 1")
        @Max(value = 50, message = "El total de preguntas excede el límite permitido")
        Integer totalPreguntas
) {}
