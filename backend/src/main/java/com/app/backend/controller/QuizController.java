package com.app.backend.controller;

import com.app.backend.dto.GuardarResultadoDTO;
import com.app.backend.dto.PreguntaQuizDTO;
import com.app.backend.dto.ResultadoQuizDTO;
import com.app.backend.service.QuizService;
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
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {

    private final QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }

    @GetMapping("/preguntas")
    public ResponseEntity<List<PreguntaQuizDTO>> listarPreguntas() {
        return ResponseEntity.ok(service.listarPreguntas());
    }

    @PostMapping("/resultado")
    public ResponseEntity<ResultadoQuizDTO> guardarResultado(@jakarta.validation.Valid @RequestBody GuardarResultadoDTO dto) {
        ResultadoQuizDTO resultado = service.guardarResultado(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
    }

    @GetMapping("/mejores-puntajes")
    public ResponseEntity<List<ResultadoQuizDTO>> obtenerMejoresPuntajes() {
        return ResponseEntity.ok(service.obtenerMejoresPuntajes());
    }
}
