package com.app.backend.repository;

import com.app.backend.model.PreguntaQuiz;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreguntaQuizRepository extends JpaRepository<PreguntaQuiz, Long> {
    List<PreguntaQuiz> findByDimensionIgnoreCase(String dimension);
}
