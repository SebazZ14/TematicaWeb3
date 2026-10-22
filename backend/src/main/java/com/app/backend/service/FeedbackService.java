package com.app.backend.service;

import com.app.backend.dto.CrearFeedbackDTO;
import com.app.backend.dto.FeedbackDTO;
import com.app.backend.model.Feedback;
import com.app.backend.repository.FeedbackRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    public List<FeedbackDTO> listarTodos() {
        return repository.findAllByOrderByFechaDesc().stream()
                .map(this::convertirADTO)
                .toList();
    }

    public FeedbackDTO guardarFeedback(CrearFeedbackDTO dto) {
        String nombre = (dto.nombre() == null || dto.nombre().isBlank()) ? "Anónimo" : dto.nombre().trim();
        String tipo = (dto.tipoMensaje() == null || dto.tipoMensaje().isBlank()) ? "Sugerencia" : dto.tipoMensaje().trim();
        String mensaje = (dto.mensaje() == null) ? "" : dto.mensaje().trim();

        Feedback feedback = new Feedback(
                null,
                nombre,
                tipo,
                mensaje,
                LocalDateTime.now()
        );

        Feedback guardado = repository.save(feedback);
        return convertirADTO(guardado);
    }

    private FeedbackDTO convertirADTO(Feedback f) {
        return new FeedbackDTO(
                f.getId(),
                f.getNombre(),
                f.getTipoMensaje(),
                f.getMensaje(),
                f.getFecha()
        );
    }
}
