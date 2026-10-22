package com.app.backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.app.backend.controller.FeedbackController;
import com.app.backend.controller.QuizController;
import com.app.backend.exception.GlobalSecurityExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootTest
class SecuritySanitizationTest {

    @Autowired
    private QuizController quizController;

    @Autowired
    private FeedbackController feedbackController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();

        this.mockMvc = MockMvcBuilders
                .standaloneSetup(quizController, feedbackController)
                .setControllerAdvice(new GlobalSecurityExceptionHandler())
                .setValidator(validator)
                .build();
    }

    @Test
    @DisplayName("Debe rechazar intento de inyección de caracteres especiales ($$$) en nombre de participante")
    void debeRechazarCaracteresEspecialesEnQuiz() throws Exception {
        String payload = """
            {
                "nombreParticipante": "Sebastián Timoteo Huarachi Garcia$$$",
                "puntaje": 6,
                "totalPreguntas": 6
            }
            """;

        mockMvc.perform(post("/api/quiz/resultado")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Error de Validación de Seguridad"))
                .andExpect(jsonPath("$.detalles.nombreParticipante").exists());
    }

    @Test
    @DisplayName("Debe rechazar ataque XSS (<script>) en nombre de participante")
    void debeRechazarAtaqueXssEnQuiz() throws Exception {
        String payload = """
            {
                "nombreParticipante": "<script>alert('xss')</script>",
                "puntaje": 6,
                "totalPreguntas": 6
            }
            """;

        mockMvc.perform(post("/api/quiz/resultado")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Error de Validación de Seguridad"));
    }

    @Test
    @DisplayName("Debe rechazar ataque SQL Injection (' OR '1'='1) en nombre de participante")
    void debeRechazarSqlInjectionEnQuiz() throws Exception {
        String payload = """
            {
                "nombreParticipante": "admin' OR '1'='1; --",
                "puntaje": 6,
                "totalPreguntas": 6
            }
            """;

        mockMvc.perform(post("/api/quiz/resultado")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Error de Validación de Seguridad"));
    }

    @Test
    @DisplayName("Debe rechazar puntajes anómalos (negativos o superiores al límite)")
    void debeRechazarPuntajeInvalidoEnQuiz() throws Exception {
        String payload = """
            {
                "nombreParticipante": "Sebastian Vera",
                "puntaje": -5,
                "totalPreguntas": 6
            }
            """;

        mockMvc.perform(post("/api/quiz/resultado")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Debe aceptar nombres legítimos con acentos, tildes y espacios válidos")
    void debeAceptarNombreValidoConAcentos() throws Exception {
        String payload = """
            {
                "nombreParticipante": "Sebastián Timoteo Huarachi García",
                "puntaje": 6,
                "totalPreguntas": 6
            }
            """;

        mockMvc.perform(post("/api/quiz/resultado")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nombreParticipante").value("Sebastián Timoteo Huarachi García"))
                .andExpect(jsonPath("$.puntaje").value(6));
    }

    @Test
    @DisplayName("Debe rechazar feedback con etiquetas HTML maliciosas en el mensaje")
    void debeRechazarFeedbackConHtml() throws Exception {
        String payload = """
            {
                "nombre": "Estudiante",
                "tipoMensaje": "Sugerencia",
                "mensaje": "Mensaje con <img src=x onerror=alert(1)> malicioso"
            }
            """;

        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Error de Validación de Seguridad"));
    }

    @Test
    @DisplayName("Debe aceptar feedback con contenido limpio y válido")
    void debeAceptarFeedbackValido() throws Exception {
        String payload = """
            {
                "nombre": "Dennis Vera",
                "tipoMensaje": "Agradecimiento",
                "mensaje": "Excelente iniciativa sobre comunicación asertiva en el desarrollo web."
            }
            """;

        mockMvc.perform(post("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nombre").value("Dennis Vera"))
                .andExpect(jsonPath("$.tipoMensaje").value("Agradecimiento"));
    }
}
