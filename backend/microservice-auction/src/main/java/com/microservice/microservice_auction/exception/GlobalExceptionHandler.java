package com.microservice.microservice_auction.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 404 Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Not Found");
        body.put("message", ex.getMessage());
        body.put("path", req.getRequestURI());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    // 400 Bad Request por JSON mal formado o propiedades desconocidas
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleBadRequest(HttpMessageNotReadableException ex, HttpServletRequest req) {
        // Loggea la excepción completa para ver el stacktrace en consola
        log.error("Error al parsear JSON en " + req.getRequestURI(), ex);

        Throwable cause = ex.getCause();
        String detail = (cause != null ? cause.getMessage() : ex.getMessage());

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Bad Request");
        body.put("message", "JSON inválido: " + detail);
        body.put("path", req.getRequestURI());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    // 400 Bad Request por validaciones @Valid fallidas
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        // Loggea la excepción para depuración si quieres
        log.error("Error de validación en " + req.getRequestURI(), ex);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Validation Failed");

        String msg = ex.getBindingResult()
                       .getFieldErrors()
                       .stream()
                       .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                       .findFirst()
                       .orElse(ex.getMessage());
        body.put("message", msg);
        body.put("path", req.getRequestURI());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
}
