package com.app.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CrearFeedbackDTO(
        @Size(max = 60, message = "El nombre no puede superar los 60 caracteres")
        @Pattern(
                regexp = "^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s.'\\-]{2,60})?$",
                message = "El nombre contiene caracteres especiales no válidos"
        )
        String nombre,

        @NotBlank(message = "El tipo de mensaje es obligatorio")
        @Pattern(
                regexp = "^(Sugerencia|Agradecimiento|Experiencia|Pregunta|Sugerencia Constructiva|Agradecimiento / Reconocimiento|Caso Práctico / Consulta|Retroalimentación del Proyecto)$",
                message = "El tipo de mensaje debe ser válido (Sugerencia, Agradecimiento, Experiencia, etc.)"
        )
        String tipoMensaje,

        @NotBlank(message = "El mensaje no puede estar vacío")
        @Size(min = 5, max = 500, message = "El mensaje debe tener entre 5 y 500 caracteres")
        @Pattern(
                regexp = "^[^<>{}\\[\\]\\\\^`$]*$",
                message = "El mensaje no debe contener etiquetas HTML, scripts ni caracteres de inyección ($ < > { } [ ] \\ ^ `)"
        )
        String mensaje
) {}
