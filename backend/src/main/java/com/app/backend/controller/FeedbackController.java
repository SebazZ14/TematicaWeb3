package com.app.backend.controller;

import com.app.backend.dto.CrearFeedbackDTO;
import com.app.backend.dto.FeedbackDTO;
import com.app.backend.service.FeedbackService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @PostMapping
    public ResponseEntity<FeedbackDTO> guardarFeedback(@RequestBody CrearFeedbackDTO dto) {
        FeedbackDTO creado = service.guardarFeedback(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
}
