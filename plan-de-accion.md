# 🎯 Plan de Acción: EduConnect - Convocatoria Web III 2026
**Temática Oficial Seleccionada:** 5. Comunicación Efectiva  
**Institución:** Instituto Técnico Nacional de Comercio "Federico Álvarez Plata" Nocturno  
**Asignatura:** Diseño y Programación Web III (Gestión 2026)  
**Desarrolladores:** Sebastian Timoteo Huarachi Garcia & Dennis Abimael Vera Ustariz  
**Stack Tecnológico:** Angular 22 (SPA + Bootstrap 5) + Spring Boot (Java 21) + PostgreSQL (Docker)

---

## 📊 Estado Actual del Proyecto
* [x] **Base de Datos:** Contenedor Docker `postgres_db` corriendo en el puerto 5432 (`appdb`).
* [x] **Backend:** Proyecto Spring Boot conectado y verificado con PostgreSQL.
* [x] **Frontend:** Proyecto Angular configurado con Bootstrap 5.3.8 y conexión base probada.

---

## FASE 0: Infraestructura y Entorno (✅ COMPLETADO)
* [x] **Paso 0.1:** Docker Compose configurado con PostgreSQL 16 y persistencia de volumen.
* [x] **Paso 0.2:** Spring Boot estructurado con dependencias JPA, Web, PostgreSQL, Lombok.
* [x] **Paso 0.3:** `application.properties` configurado (`ddl-auto=update`, `show-sql=true`).
* [x] **Paso 0.4:** Angular configurado en modo standalone con enrutador.
* [x] **Paso 0.5:** Bootstrap instalado y configurado en `angular.json` / `styles.css`.
* **✅ COMMIT 1:** `feat(setup): estructura base del backend y frontend con conexion a base de datos`

---

## FASE 1: Modelado de Entidades JPA y Seeder de Datos Temáticos (✅ COMPLETADO)
**Objetivo:** Crear las entidades de la base de datos alineadas 100% a la temática "Comunicación Efectiva" y a los requisitos de la convocatoria, con precarga de datos para DBeaver.

* [x] **Paso 1.1:** Crear entidad `Articulo` (`id`, `titulo`, `categoria`, `resumen`, `contenido`, `icono`, `tiempoLectura`) para la **Sección Informativa (B)**.
* [x] **Paso 1.2:** Crear entidad `PreguntaQuiz` (`id`, `enunciado`, `opcionA`, `opcionB`, `opcionC`, `opcionD`, `respuestaCorrecta`, `explicacion`, `dimension`) para la **Sección Quiz (C)**.
* [x] **Paso 1.3:** Crear entidad `ResultadoQuiz` (`id`, `nombreParticipante`, `puntaje`, `totalPreguntas`, `nivelComunicacion`, `fecha`) para registrar intentos y cumplir con el requisito de "registro de respuestas" de la convocatoria.
* [x] **Paso 1.4:** Crear entidad `Feedback` (`id`, `nombre`, `tipoMensaje`, `mensaje`, `fecha`) para el buzón interactivo.
* [x] **Paso 1.5:** Crear componente `DataSeeder` (`CommandLineRunner`) en Spring Boot que inserte automáticamente al iniciar:
  * 4 artículos sobre Comunicación Asertiva, Escucha Activa, Barreras de la Comunicación y Lenguaje Corporal.
  * 6 preguntas tipo test con casos prácticos de comunicación.
* [x] **Paso 1.6:** Verificar en DBeaver/PostgreSQL que las tablas y registros iniciales existan.
* **✅ COMMIT 2:** `feat(backend): entidades jpa y seeder de datos de comunicacion efectiva`

---

## FASE 2: Backend - API REST de Contenido y Recursos (✅ COMPLETADO)
**Objetivo:** Exponer endpoints para alimentar el Inicio y la Sección Informativa.

* [x] **Paso 2.1:** Crear `ArticuloDTO` (record Java).
* [x] **Paso 2.2:** Crear `ArticuloRepository` y `ArticuloService` (listar todos y filtrar por categoría).
* [x] **Paso 2.3:** Crear `ArticuloController` con endpoint `GET /api/articulos` y `GET /api/articulos/{id}` con `@CrossOrigin(origins = "http://localhost:4200")`.
* [x] **Paso 2.4:** Verificar endpoints con navegador o cliente HTTP.
* **✅ COMMIT 3:** `feat(backend): api rest de articulos y contenido educativo`

---

## FASE 3: Backend - API REST de Quiz y Buzón de Feedback (✅ COMPLETADO)
**Objetivo:** Exponer endpoints para el quiz interactivo, guardado de resultados y buzón.

* [x] **Paso 3.1:** Crear DTOs: `PreguntaQuizDTO`, `ResultadoQuizDTO`, `GuardarResultadoDTO`, `FeedbackDTO`, `CrearFeedbackDTO`.
* [x] **Paso 3.2:** Crear `QuizService` y `QuizController`:
  * `GET /api/quiz/preguntas` (obtiene el listado de preguntas desde PostgreSQL).
  * `POST /api/quiz/resultado` (guarda el resultado del usuario en `ResultadoQuiz` y retorna diagnóstico).
  * `GET /api/quiz/mejores-puntajes` (top 10 participantes destacados).
* [x] **Paso 3.3:** Crear `FeedbackService` y `FeedbackController`:
  * `GET /api/feedback` (listar mensajes constructivos).
  * `POST /api/feedback` (enviar nuevo mensaje o sugerencia).
* **✅ COMMIT 4:** `feat(backend): api rest de quiz, registro de resultados y buzon`

---

## FASE 4: Frontend - Navegación y Sección A (Inicio y Presentación) (✅ COMPLETADO)
**Objetivo:** Desarrollar el layout general, navegación y la primera sección obligatoria de la convocatoria.

* [x] **Paso 4.1:** Arquitectura multipágina SPA con enrutador Angular (`/inicio`, `/guias`, `/quiz`, `/buzon`, `/desarrolladores`) y `NavbarComponent` responsivo con menú hamburguesa interactivo (auto-cierre al seleccionar opción o hacer clic fuera) y estado `routerLinkActive`.
* [x] **Paso 4.2:** Diseñar `InicioComponent` (Sección A de la Convocatoria):
  * **Hero Banner:** Introducción de impacto al valor de la comunicación efectiva en el ámbito académico y laboral.
  * **Objetivos del Sitio:** Pilares clave (Asertividad, Escucha, Empatía, Resolución de Conflictos).
  * **Accesos Rápidos (CTA):** Botones y tarjetas directas con `routerLink` a "¿Qué tan asertivo eres? (Quiz)" y "Explorar Guías".
  * **Módulos Interactivos:** Tarjetas de navegación rápida a cada sección.
* **✅ COMMIT 5:** `feat(frontend): arquitectura multipagina spa con angular router y navbar interactivo`

---

## FASE 5: Frontend - Sección B (Informativa) y Sección C (Quiz Interactivo) (✅ COMPLETADO)
**Objetivo:** Completar el núcleo temático y la interacción obligatoria con base de datos.

* [x] **Paso 5.1:** Crear `ArticuloService` en Angular y componente `ArticulosComponent` (Sección B):
  * Tarjetas con categorías temáticas (Asertividad, Escucha Activa, Lenguaje No Verbal, Resolución de Conflictos).
  * Modal interactivo para lectura detallada y tips prácticos aplicables.
* [x] **Paso 5.2:** Crear `QuizService` en Angular y componente `QuizComponent` (Sección C):
  * Carga dinámica de preguntas desde `GET /api/quiz/preguntas`.
  * Barra de progreso de preguntas y selector de opciones A, B, C, D.
  * Formulario para ingresar nombre y registrar resultado (`POST /api/quiz/resultado`).
  * Pantalla de resultados con puntaje obtenido, badge de nivel diagnóstico y retroalimentación pregunta por pregunta.
  * Tabla de ranking/historial en vivo de PostgreSQL.
* **✅ COMMIT 6:** `feat(frontend): seccion informativa interactiva y modulo completo de quiz con postgresql`

---

## FASE 6: Frontend - Sección D (Desarrolladores) y Buzón de Feedback (✅ COMPLETADO)
**Objetivo:** Cumplir con la sección obligatoria de desarrolladores y añadir el valor innovador.

* [x] **Paso 6.1:** Crear `DesarrolladoresComponent` (Sección D de la Convocatoria):
  * Presentación del equipo (Sebastian Timoteo Huarachi Garcia y Dennis Abimael Vera Ustariz - Carrera: Sistemas Informáticos - Inst. Técnico Nac. de Comercio "Federico Álvarez Plata").
  * Propósito del proyecto y problemática abordada.
  * Stack tecnológico interactivo con insignias y logos (Angular 22, Spring Boot, PostgreSQL, Docker, Bootstrap).
  * Resumen de funcionalidades implementadas y créditos.
* [x] **Paso 6.2:** Crear `BuzonComponent` (Buzón de práctica de comunicación constructiva):
  * Formulario con selector de tipo de mensaje (Agradecimiento, Sugerencia constructiva, Duda).
  * Muro visual de mensajes recibidos en tiempo real desde PostgreSQL.
* [x] **Paso 6.3:** Revisión de diseño responsivo en móviles y modo visual pulido con Bootstrap 5.
* **✅ COMMIT 7:** `feat(frontend): seccion oficial de desarrolladores y buzon de feedback`

---

## FASE 7: Verificación, Documentación y Entrega
**Objetivo:** Pruebas finales, preparación de la demostración y entrega antes del límite del 22 de Octubre.

* [x] **Paso 7.1:** Prueba integral del flujo web completo de punta a punta (Backend 8080 + Frontend 4200 + PostgreSQL).
* [x] **Paso 7.2:** Verificación en vivo de datos en DBeaver/PostgreSQL (tablas `preguntas_quiz`, `resultados_quiz`, `articulos`, `feedback`).
* [x] **Paso 7.3:** Verificación de contenedores Docker (`docker ps` - contenedor `postgres_db` activo).
* [ ] **Paso 7.4:** Preparar el repositorio GitHub público y despliegue para la URL pública exigida por el formulario de entrega.
* [ ] **Paso 7.5:** Completar el Formulario de Google Forms: https://forms.gle/MoCPR84ACERBAy6H7
* **✅ COMMIT 8:** `docs: documentacion final, capturas y preparacion de entrega`

---

## 📌 Checklist de Cumplimiento de la Rúbrica (100 Puntos)
| Criterio | Puntos | Cómo lo cumplimos en el proyecto |
| :--- | :---: | :--- |
| **Funcionamiento y propósito** | 25 pts | Navegación fluida SPA, API REST operativa y quiz funcional que persiste datos en PostgreSQL. |
| **Pertinencia temática y aporte** | 25 pts | 100% enfocado en Comunicación Efectiva con contenido educativo de valor y diagnóstico asertivo. |
| **Diseño y usabilidad móvil** | 25 pts | Interfaz moderna y adaptable desarrollada con componentes y utilidades Bootstrap 5. |
| **Creatividad e innovación** | 25 pts | Arquitectura desacoplada en Docker con Spring Boot, DBeaver en vivo, Seeder automático y ranking de quiz. |