package com.app.backend.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Manejador global defensivo para capturar errores de validación de seguridad,
 * previniendo fuga de detalles internos del servidor o base de datos.
 */
@RestControllerAdvice
public class GlobalSecurityExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarErroresValidacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errores.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "Error de Validación de Seguridad");
        respuesta.put("mensaje", "La solicitud contiene caracteres no permitidos o datos inválidos.");
        respuesta.put("detalles", errores);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> manejarArgumentosIlegales(IllegalArgumentException ex) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "Solicitud No Válida");
        respuesta.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
    }

    @ExceptionHandler(org.springframework.validation.BindException.class)
    public ResponseEntity<Map<String, Object>> manejarBindException(org.springframework.validation.BindException ex) {
        Map<String, String> errores = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errores.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "Error de Validación de Seguridad");
        respuesta.put("mensaje", "La solicitud contiene caracteres no permitidos o datos inválidos.");
        respuesta.put("detalles", errores);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> manejarExcepcionGenerica(Exception ex) {
        ex.printStackTrace();
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "Error de Validación de Seguridad (" + ex.getClass().getSimpleName() + ")");
        respuesta.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
    }
}
