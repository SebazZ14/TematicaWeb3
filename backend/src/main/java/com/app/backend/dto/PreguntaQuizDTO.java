package com.app.backend.dto;

public record PreguntaQuizDTO(
        Long id,
        String enunciado,
        String opcionA,
        String opcionB,
        String opcionC,
        String opcionD,
        Integer respuestaCorrecta,
        String explicacion,
        String dimension
) {}
