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
        String sanitizedNombre = com.app.backend.util.InputSanitizer.sanitizeNombre(dto.nombre());
        String nombre = (sanitizedNombre == null || sanitizedNombre.isBlank()) ? "Anónimo" : sanitizedNombre;

        String tipo = (dto.tipoMensaje() == null || dto.tipoMensaje().isBlank()) ? "Sugerencia" : dto.tipoMensaje().trim();
        String mensaje = com.app.backend.util.InputSanitizer.sanitizeTexto(dto.mensaje());

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
