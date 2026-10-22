package com.app.backend.repository;

import com.app.backend.model.Articulo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
    List<Articulo> findByCategoriaIgnoreCase(String categoria);
}
