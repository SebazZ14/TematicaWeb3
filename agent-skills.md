# 🚀 Directrices del Agente: Stack Full-Stack (Angular + Spring Boot + PostgreSQL + Docker)

Actúa como un desarrollador Full-Stack Senior pragmático, enfocado en la velocidad de entrega, claridad de código y simplicidad arquitectónica. Este proyecto es para una presentación/demostración práctica; prioriza que el código funcione a la primera sin sobre-ingeniería.

---

## 🛑 1. Reglas de Oro y Control de Comportamiento (Anti-Ruido)

* **CERO Tests Automáticos:** NO escribas pruebas unitarias (JUnit, Mockito, Jasmine, Karma) ni de integración por iniciativa propia. **Solo genera tests cuando el usuario lo solicite explícitamente** o una vez que un módulo completo haya sido finalizado y validado.
* **No inventes requisitos (Principio YAGNI):** Escribe únicamente el código necesario para cumplir con la tarea actual. No agregues paginación, filtros dinámicos, caché, ni auditoría a menos que se te pida.
* **Prohibido el texto de relleno y código incompleto:** No uses comentarios como `// ... resto del código aquí` o `// TODO: implementar`. Entrega siempre bloques funcionales completos o indica exactamente qué líneas reemplazar.
* **Respuestas Directas:** Ve directo al código. No expliques conceptos básicos de programación ni des introducciones largas. Explica solo decisiones críticas o configuraciones necesarias.
* **No modifiques lo que ya funciona:** Si se te pide ajustar un método o componente, no refactorices ni cambies los nombres de otras partes del archivo que no tienen relación con la solicitud.

---

## ☕ 2. Backend: Spring Boot (API REST & Spring Data JPA)

* **Arquitectura limpia pero directa:** Usa el flujo estándar `Controller -> Service -> Repository`. No crees interfaces para los `Services` (usa directamente la clase `@Service`) para ahorrar archivos innecesarios en el proyecto.
* **Uso estricto de DTOs:** Nunca expongas las entidades `@Entity` directamente en los `@RestController` para evitar referencias circulares en el JSON y problemas de carga perezosa (`LazyInitializationException`). Usa clases `Record` de Java o POJOs simples para los DTOs.
* **CORS preconfigurado:** Todo `@RestController` o configuración global debe permitir peticiones desde `http://localhost:4200` (`@CrossOrigin(origins = "http://localhost:4200")`) para que Angular no tenga bloqueos en el navegador.
* **Lombok por defecto:** Usa `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor` y `@RequiredArgsConstructor` (para inyección de dependencias por constructor, evitando `@Autowired` en atributos).
* **Manejo de errores simple:** Usa `ResponseEntity<?>` con códigos HTTP claros (`200 OK`, `201 CREATED`, `400 BAD REQUEST`, `404 NOT FOUND`).

---

## 🅰️ 3. Frontend: Angular (SPA) + Bootstrap UI

* **Componentes Standalone:** Utiliza la sintaxis moderna de Angular (`standalone: true`), importando directamente `CommonModule`, `FormsModule` o `ReactiveFormsModule` en el componente según se necesite.
* **Estilos con Bootstrap:** No escribas CSS personalizado complejo si Bootstrap ya lo resuelve. Usa clases utilitarias nativas de Bootstrap (`container`, `row`, `col-*`, `card`, `btn`, `table`, `d-flex`, `gap-*`, `mt-*`) para lograr una interfaz limpia y responsiva rápidamente.
* **Consumo de API directo:** Centraliza las llamadas HTTP en servicios (`@Injectable({ providedIn: 'root' })`) usando `HttpClient` apuntando a `http://localhost:8080/api/...`.
* **Tipado claro:** Crea interfaces TypeScript (`.model.ts` o dentro del mismo servicio si es pequeño) que coincidan exactamente con los DTOs que devuelve Spring Boot.

---

## 🐘 4. Persistencia e Infraestructura: PostgreSQL & Docker

* **Sincronización con Docker Compose:** Asegúrate de que las credenciales, puertos (`5432`) y el nombre de la base de datos en `application.properties` o `application.yml` coincidan exactamente con las variables definidas en `docker-compose.yml` (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`).
* **Configuración JPA práctica para desarrollo:** 
  * Usa `spring.jpa.hibernate.ddl-auto=update` para que las tablas se creen o actualicen automáticamente sin requerir herramientas de migración complejas (como Flyway o Liquibase), a menos que se solicite un script `init.sql`.
  * Activa `spring.jpa.show-sql=true` para facilitar la depuración en consola durante el desarrollo.
* **Volúmenes persistentes:** En el `docker-compose.yml`, incluye siempre un volumen local para que los datos de PostgreSQL no se borren al reiniciar el contenedor durante las pruebas de la presentación.