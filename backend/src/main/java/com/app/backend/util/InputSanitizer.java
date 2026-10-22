package com.app.backend.util;

import java.util.regex.Pattern;

/**
 * Utilidad de sanitización defensiva para mitigar vulnerabilidades XSS,
 * inyección de código y caracteres maliciosos o corruptos.
 */
public final class InputSanitizer {

    private static final Pattern HTML_TAG_PATTERN = Pattern.compile("<[^>]*>", Pattern.CASE_INSENSITIVE);
    private static final Pattern SCRIPT_PATTERN = Pattern.compile("(?i)(javascript:|onerror=|onload=|eval\\(|<script>)", Pattern.CASE_INSENSITIVE);
    private static final Pattern MULTI_SPACE_PATTERN = Pattern.compile("\\s+");
    // Permite letras (incluyendo acentos, diéresis, ñ), números básicos, espacios y puntuación estándar de redacción
    private static final Pattern DANGEROUS_CHARS_PATTERN = Pattern.compile("[<>{}\\[\\]\\\\^~`$]");

    private InputSanitizer() {}

    /**
     * Sanitiza nombres de personas, eliminando caracteres especiales, tags y símbolos de inyección.
     */
    public static String sanitizeNombre(String input) {
        if (input == null) {
            return "";
        }
        String clean = HTML_TAG_PATTERN.matcher(input).replaceAll("");
        clean = SCRIPT_PATTERN.matcher(clean).replaceAll("");
        clean = DANGEROUS_CHARS_PATTERN.matcher(clean).replaceAll("");
        clean = MULTI_SPACE_PATTERN.matcher(clean).replaceAll(" ").trim();
        return clean;
    }

    /**
     * Sanitiza texto general de comentarios o mensajes, eliminando etiquetas HTML
     * y vectores de ataque XSS mientras preserva puntuación válida.
     */
    public static String sanitizeTexto(String input) {
        if (input == null) {
            return "";
        }
        String clean = HTML_TAG_PATTERN.matcher(input).replaceAll("");
        clean = SCRIPT_PATTERN.matcher(clean).replaceAll("");
        clean = clean.replace("<", "&lt;").replace(">", "&gt;");
        clean = MULTI_SPACE_PATTERN.matcher(clean).replaceAll(" ").trim();
        return clean;
    }
}
