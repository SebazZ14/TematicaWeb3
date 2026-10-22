package com.app.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "preguntas_quiz")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PreguntaQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String enunciado;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String opcionA;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String opcionB;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String opcionC;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String opcionD;

    @Column(nullable = false)
    private Integer respuestaCorrecta; // 1: A, 2: B, 3: C, 4: D

    @Column(columnDefinition = "TEXT")
    private String explicacion;

    @Column(length = 80)
    private String dimension; // ej. Asertividad, Escucha Activa, Lenguaje No Verbal
}
