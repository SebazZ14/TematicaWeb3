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
@Table(name = "articulos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Articulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false, length = 80)
    private String categoria;

    @Column(columnDefinition = "TEXT")
    private String resumen;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contenido;

    @Column(length = 50)
    private String icono;

    private Integer tiempoLectura;

    @Column(length = 100)
    private String autor;
}
