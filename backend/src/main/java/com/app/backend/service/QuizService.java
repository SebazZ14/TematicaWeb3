package com.app.backend.service;

import com.app.backend.dto.GuardarResultadoDTO;
import com.app.backend.dto.PreguntaQuizDTO;
import com.app.backend.dto.ResultadoQuizDTO;
import com.app.backend.model.PreguntaQuiz;
import com.app.backend.model.ResultadoQuiz;
import com.app.backend.repository.PreguntaQuizRepository;
import com.app.backend.repository.ResultadoQuizRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    private final PreguntaQuizRepository preguntaRepository;
    private final ResultadoQuizRepository resultadoRepository;

    public QuizService(PreguntaQuizRepository preguntaRepository, ResultadoQuizRepository resultadoRepository) {
        this.preguntaRepository = preguntaRepository;
        this.resultadoRepository = resultadoRepository;
    }

    public List<PreguntaQuizDTO> listarPreguntas() {
        return preguntaRepository.findAll().stream()
                .map(this::convertirPreguntaADTO)
                .toList();
    }

    public ResultadoQuizDTO guardarResultado(GuardarResultadoDTO dto) {
        String nombre = (dto.nombreParticipante() == null || dto.nombreParticipante().isBlank())
                ? "Participante Anónimo"
                : dto.nombreParticipante().trim();

        int puntaje = dto.puntaje() != null ? dto.puntaje() : 0;
        int total = (dto.totalPreguntas() != null && dto.totalPreguntas() > 0) ? dto.totalPreguntas() : 6;

        String nivel = calcularNivel(puntaje, total);

        ResultadoQuiz resultado = new ResultadoQuiz(
                null,
                nombre,
                puntaje,
                total,
                nivel,
                LocalDateTime.now()
        );

        ResultadoQuiz guardado = resultadoRepository.save(resultado);
        return convertirResultadoADTO(guardado);
    }

    public List<ResultadoQuizDTO> obtenerMejoresPuntajes() {
        return resultadoRepository.findTop10ByOrderByPuntajeDescFechaDesc().stream()
                .map(this::convertirResultadoADTO)
                .toList();
    }

    private String calcularNivel(int puntaje, int total) {
        double ratio = (double) puntaje / total;
        if (ratio >= 0.85) {
            return "Comunicador Asertivo Ejemplar";
        } else if (ratio >= 0.65) {
            return "Comunicador Asertivo";
        } else if (ratio >= 0.45) {
            return "Comunicador en Desarrollo";
        } else {
            return "Comunicador Pasivo o Reactivo";
        }
    }

    private PreguntaQuizDTO convertirPreguntaADTO(PreguntaQuiz p) {
        return new PreguntaQuizDTO(
                p.getId(),
                p.getEnunciado(),
                p.getOpcionA(),
                p.getOpcionB(),
                p.getOpcionC(),
                p.getOpcionD(),
                p.getRespuestaCorrecta(),
                p.getExplicacion(),
                p.getDimension()
        );
    }

    private ResultadoQuizDTO convertirResultadoADTO(ResultadoQuiz r) {
        return new ResultadoQuizDTO(
                r.getId(),
                r.getNombreParticipante(),
                r.getPuntaje(),
                r.getTotalPreguntas(),
                r.getNivelComunicacion(),
                r.getFecha()
        );
    }
}
