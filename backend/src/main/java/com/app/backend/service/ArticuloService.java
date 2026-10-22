package com.app.backend.service;

import com.app.backend.dto.ArticuloDTO;
import com.app.backend.model.Articulo;
import com.app.backend.repository.ArticuloRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ArticuloService {

    private final ArticuloRepository repository;

    public ArticuloService(ArticuloRepository repository) {
        this.repository = repository;
    }

    public List<ArticuloDTO> listarTodos() {
        return repository.findAll().stream()
                .map(this::convertirADTO)
                .toList();
    }

    public Optional<ArticuloDTO> obtenerPorId(Long id) {
        return repository.findById(id).map(this::convertirADTO);
    }

    public List<ArticuloDTO> listarPorCategoria(String categoria) {
        return repository.findByCategoriaIgnoreCase(categoria).stream()
                .map(this::convertirADTO)
                .toList();
    }

    private ArticuloDTO convertirADTO(Articulo a) {
        return new ArticuloDTO(
                a.getId(),
                a.getTitulo(),
                a.getCategoria(),
                a.getResumen(),
                a.getContenido(),
                a.getIcono(),
                a.getTiempoLectura(),
                a.getAutor()
        );
    }
}
