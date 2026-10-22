package com.app.backend.config;

import com.app.backend.model.Articulo;
import com.app.backend.model.Feedback;
import com.app.backend.model.PreguntaQuiz;
import com.app.backend.model.ResultadoQuiz;
import com.app.backend.repository.ArticuloRepository;
import com.app.backend.repository.FeedbackRepository;
import com.app.backend.repository.PreguntaQuizRepository;
import com.app.backend.repository.ResultadoQuizRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ArticuloRepository articuloRepository;
    private final PreguntaQuizRepository preguntaQuizRepository;
    private final ResultadoQuizRepository resultadoQuizRepository;
    private final FeedbackRepository feedbackRepository;

    public DataSeeder(
            ArticuloRepository articuloRepository,
            PreguntaQuizRepository preguntaQuizRepository,
            ResultadoQuizRepository resultadoQuizRepository,
            FeedbackRepository feedbackRepository) {
        this.articuloRepository = articuloRepository;
        this.preguntaQuizRepository = preguntaQuizRepository;
        this.resultadoQuizRepository = resultadoQuizRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public void run(String... args) {
        seedArticulos();
        seedPreguntasQuiz();
        seedResultadosQuiz();
        seedFeedback();
    }

    private void seedArticulos() {
        if (articuloRepository.count() > 0) return;

        List<Articulo> articulos = List.of(
            new Articulo(
                null,
                "Los 3 Estilos de Comunicación: Pasivo, Agresivo y Asertivo",
                "Asertividad",
                "Aprende a reconocer la diferencia entre callar por temor, imponerse por la fuerza o expresar tus ideas con claridad y respeto mutuo.",
                "La comunicación asertiva es la habilidad de expresar nuestros deseos, opiniones y sentimientos de manera directa, honesta y respetuosa, sin agredir a los demás ni someterse a su voluntad.\n\n"
                    + "1. Estilo Pasivo: Quien lo adopta evita el conflicto a costa de sus propios derechos. Suele generar frustración interna, resentimiento y falta de reconocimiento.\n"
                    + "2. Estilo Agresivo: Busca ganar siempre, interrumpe, descalifica y no escucha. Destruye relaciones de equipo y genera ambientes de tensión.\n"
                    + "3. Estilo Asertivo: El equilibrio óptimo. Utiliza mensajes en primera persona ('Yo pienso...', 'Yo siento...'), mantiene contacto visual firme pero calmado y busca acuerdos ganar-ganar.\n\n"
                    + "En entornos de desarrollo de software y trabajo en equipo, la asertividad permite defender decisiones técnicas con fundamentos y recibir críticas sin tomarlas como ataques personales.",
                "bi-chat-heart",
                4,
                "Sebastian Huarachi & Dennis Vera"
            ),
            new Articulo(
                null,
                "El Arte de la Escucha Activa: Escuchar para Comprender, No para Contestar",
                "Escucha Activa",
                "Más del 60% de los problemas de comunicación se originan en no escuchar con atención plena. Descubre cómo transformar tu forma de interactuar.",
                "Oír es un proceso biológico involuntario; escuchar activamente es un acto consciente de generosidad e interés genuino.\n\n"
                    + "Técnicas fundamentales para la escucha activa:\n"
                    + "1. Silencio consciente: Evita formular tu respuesta mental mientras la otra persona aún está hablando.\n"
                    + "2. Parafraseo clarificador: Usa fórmulas como 'Si te entendí bien, lo que necesitas es...' para asegurar comprensión mutua.\n"
                    + "3. Lenguaje corporal receptivo: Asiente suavemente, mantén la mirada y evita distraerte con pantallas secundarias.\n"
                    + "4. Preguntas abiertas: En lugar de preguntas de sí o no, pregunta: '¿Qué opinas sobre este enfoque?' o '¿Cómo te gustaría que lo resolvamos?'\n\n"
                    + "Practicar la escucha activa multiplica la productividad en equipos de desarrollo ágil y proyectos colaborativos.",
                "bi-ear",
                3,
                "Sebastian Huarachi & Dennis Vera"
            ),
            new Articulo(
                null,
                "El Lenguaje No Verbal: Lo que tu Postura y Mirada Revelan",
                "Lenguaje No Verbal",
                "Los estudios de comunicación señalan que más del 70% del impacto de un mensaje recae en el tono de voz y la expresión corporal.",
                "Las palabras transmiten datos, pero el cuerpo transmite emociones y credibilidad.\n\n"
                    + "Claves no verbales para una comunicación de alto impacto:\n"
                    + "- Contacto visual equilibrado: Demuestra seguridad e interés; evita desviar la mirada constantemente o fijarla de manera intimidante.\n"
                    + "- Postura abierta: Brazos sin cruzar, torso ligeramente orientado hacia el interlocutor y hombros relajados.\n"
                    + "- Tono y modulación de voz: Un tono sereno, con pausas estratégicas, transmite calma incluso en discusiones técnicas complejas.\n"
                    + "- Coherencia: Si felicitas a alguien pero tu rostro luce contrariado, tu mensaje perderá veracidad.\n\n"
                    + "La congruencia entre lo que dices y cómo lo dices genera confianza inmediata.",
                "bi-person-check",
                3,
                "Sebastian Huarachi & Dennis Vera"
            ),
            new Articulo(
                null,
                "Técnicas Asertivas para Resolver Conflictos en Equipos",
                "Resolución de Conflictos",
                "Estrategias prácticas como el 'Método DEPO' y el 'Mensaje Yo' para abordar desacuerdos y dar feedback sin herir susceptibilidades.",
                "El desacuerdo en un equipo no es sinónimo de fracaso; es una oportunidad de crecimiento cuando se gestiona con madurez comunicativa.\n\n"
                    + "Herramientas prácticas recomendadas:\n"
                    + "1. El Método DEPO (Mensaje Yo):\n"
                    + "   - D (Describir): Plantea el hecho objetivo sin juzgar ('En los últimos dos entregables no recibí tu módulo antes de la fecha pactada').\n"
                    + "   - E (Expresar): Comparte el impacto ('Esto me genera sobrecarga porque debemos integrar a última hora').\n"
                    + "   - P (Proponer): Sugiere una alternativa constructiva ('Propongo que revisemos el avance dos días antes').\n"
                    + "   - O (Ofrecer consecuencias): Resalta el beneficio mutuo ('Así ambos trabajaremos con mayor tranquilidad y calidad').\n\n"
                    + "2. Disco Rayado: Repetir con calma y respeto tu posición ante presiones que vulneren tus compromisos pactados.\n"
                    + "3. Banco de Niebla: Aceptar la parte de verdad en una crítica sin perder tu seguridad.",
                "bi-lightning-charge",
                5,
                "Sebastian Huarachi & Dennis Vera"
            )
        );

        articuloRepository.saveAll(articulos);
    }

    private void seedPreguntasQuiz() {
        if (preguntaQuizRepository.count() > 0) return;

        List<PreguntaQuiz> preguntas = List.of(
            new PreguntaQuiz(
                null,
                "Estás en un grupo de trabajo y un integrante no entregó su parte asignada a pocas horas de la entrega final. ¿Cuál es la respuesta asertiva?",
                "No le dices nada para no generar discusión, pero haces todo su trabajo con frustración y luego te quejas con el docente.",
                "Le reclamas agresivamente por el grupo de WhatsApp diciéndole que es un irresponsable y que lo retirarás del proyecto de inmediato.",
                "Te comunicas directamente con él, le explicas de forma calmada el impacto del retraso en el equipo y acuerdan un plazo límite final para resolverlo.",
                "Decides no entregar el trabajo grupal para que él también repruebe y aprenda la lección.",
                3,
                "La comunicación asertiva aborda el problema de forma directa y calmada, enfocándose en la conducta y las soluciones, no en el ataque personal ni en la sumisión.",
                "Resolución de Conflictos"
            ),
            new PreguntaQuiz(
                null,
                "Durante una exposición de tu proyecto, un compañero cuestiona una de tus conclusiones técnicas. ¿Cuál es la mejor reacción?",
                "Escuchas con atención sin interrumpir, agradeces la observación y explicas con fundamentos los datos que respaldan tu propuesta.",
                "Te enojas, lo interrumpes de inmediato y comienzas a atacar los puntos débiles de su propio trabajo.",
                "Bajas la mirada, te disculpas inmediatamente aunque tengas la razón y te sientas avergonzado.",
                "Ignoras su comentario como si no existiera y continúas hablando rápidamente para no responderle.",
                1,
                "La escucha activa y la seguridad asertiva permiten recibir críticas constructivas como aportes al diálogo sin adoptar una postura defensiva.",
                "Escucha Activa"
            ),
            new PreguntaQuiz(
                null,
                "Un compañero de clase te pide tu código final minutos antes del plazo límite para copiarlo textualmente. ¿Cómo respondes asertivamente?",
                "Se lo envías por miedo a que se enoje o hable mal de ti con el resto de la clase.",
                "Le dices con firmeza y respeto: 'No puedo pasarte mi trabajo porque nos perjudicaría a ambos, pero puedo explicarte con gusto la duda que tengas'.",
                "Le insultas diciéndole que es un mal estudiante y que no merece estar en la carrera.",
                "Finges que no leíste su mensaje y apagas las notificaciones para evadir la respuesta.",
                2,
                "Decir 'no' de manera asertiva implica fijar límites claros y respetuosos, ofreciendo apoyo formativo alternativo sin comprometer tu integridad académica.",
                "Asertividad"
            ),
            new PreguntaQuiz(
                null,
                "¿Qué comportamiento del lenguaje corporal refuerza de manera más efectiva la empatía y cercanía en una conversación interpersonal?",
                "Cruzar los brazos y mirar frecuentemente el reloj o la pantalla del teléfono.",
                "Mantener contacto visual natural, postura corporal abierta y asentir de forma receptiva para demostrar atención plena.",
                "Mirar fijamente a los ojos sin pestañear para imponer autoridad.",
                "Mantener la vista orientada hacia el suelo mientras hablas para parecer humilde.",
                2,
                "Una postura corporal abierta y el contacto visual equilibrado proyectan empatía, seguridad e interés genuino en la interacción.",
                "Lenguaje No Verbal"
            ),
            new PreguntaQuiz(
                null,
                "En una reunión de desarrollo, alguien comete una equivocación al explicar una parte técnica. ¿Cuál es la forma más constructiva de abordarlo?",
                "Decir en tono burlón frente a todos: '¡Qué barbaridad, no tienes idea de cómo funciona este framework!'.",
                "Quedarte callado aunque sepas que el error afectará todo el despliegue del sistema.",
                "Decir: 'Buen punto. Quisiera complementar esa idea: revisando la documentación observo que este parámetro funciona de esta manera... ¿qué les parece si lo validamos juntos?'.",
                "Enviar un mensaje privado al docente para que le descuente puntos a tu compañero.",
                3,
                "El feedback constructivo valida la participación, aporta la precisión con respeto y datos objetivos, facilitando la colaboración en equipo.",
                "Feedback Constructivo"
            ),
            new PreguntaQuiz(
                null,
                "Te sientes sobrecargado por la cantidad de tareas asignadas en tu equipo y consideras que la distribución es desigual. ¿Qué actitud es asertiva?",
                "Abandonar el grupo de trabajo sin dar explicaciones ni responder mensajes.",
                "Convocar una breve reunión de coordinación, exponer de manera objetiva las tareas actuales y proponer una redistribución equitativa.",
                "Publicar quejas indirectas en redes sociales sobre lo injustos que son tus compañeros de equipo.",
                "Hacer solo lo mínimo indispensable y entregar el proyecto incompleto sin avisar.",
                2,
                "La proactividad asertiva previene el desgaste emocional (burnout) mediante el diálogo transparente y la renegociación responsable de acuerdos.",
                "Manejo Emocional y Acuerdos"
            )
        );

        preguntaQuizRepository.saveAll(preguntas);
    }

    private void seedResultadosQuiz() {
        if (resultadoQuizRepository.count() > 0) return;

        List<ResultadoQuiz> resultados = List.of(
            new ResultadoQuiz(null, "Sebastian Huarachi", 6, 6, "Comunicador Asertivo Ejemplar", LocalDateTime.now().minusHours(3)),
            new ResultadoQuiz(null, "Dennis Vera", 6, 6, "Comunicador Asertivo Ejemplar", LocalDateTime.now().minusHours(2)),
            new ResultadoQuiz(null, "Estudiante Invitado", 5, 6, "Comunicador Asertivo", LocalDateTime.now().minusHours(1))
        );

        resultadoQuizRepository.saveAll(resultados);
    }

    private void seedFeedback() {
        if (feedbackRepository.count() > 0) return;

        List<Feedback> feedbacks = List.of(
            new Feedback(null, "Dennis Vera", "Agradecimiento", "Excelente iniciativa para promover la comunicación asertiva y el trabajo en equipo en la carrera de Sistemas Informáticos.", LocalDateTime.now().minusDays(1)),
            new Feedback(null, "Sebastian Huarachi", "Sugerencia", "Recomiendo aplicar el método DEPO en las reuniones de retrospectiva de proyectos de software.", LocalDateTime.now().minusHours(5))
        );

        feedbackRepository.saveAll(feedbacks);
    }
}
