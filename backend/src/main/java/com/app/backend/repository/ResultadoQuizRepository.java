package com.app.backend.repository;

import com.app.backend.model.ResultadoQuiz;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultadoQuizRepository extends JpaRepository<ResultadoQuiz, Long> {
    List<ResultadoQuiz> findTop10ByOrderByPuntajeDescFechaDesc();
}
