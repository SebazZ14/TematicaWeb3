# ==============================================================================
# Dockerfile Multietapa para Despliegue en Render.com / Railway
# Etapa 1: Compilación del proyecto Java 21 con Maven
# Etapa 2: Imagen ligera de ejecución con JRE 21
# ==============================================================================

# --- Etapa 1: Build ---
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build

# Copiar archivos de configuración de dependencias para aprovechar caché
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Descargar dependencias en modo offline para acelerar builds posteriores
RUN ./mvnw dependency:go-offline -B

# Copiar el código fuente y compilar el paquete JAR final
COPY src src
RUN ./mvnw clean package -DskipTests

# --- Etapa 2: Runtime ligero ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Crear usuario seguro sin privilegios de root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copiar el ejecutable generado en la etapa de construcción
COPY --from=builder /build/target/*.jar app.jar

# Render asigna el puerto mediante la variable de entorno PORT
EXPOSE 8080

# Parámetros JVM optimizados para contenedores en capas gratuitas (control de memoria)
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
