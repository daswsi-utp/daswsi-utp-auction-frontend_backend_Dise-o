package com.microservicio.usuarios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
public class UsuariosApplication {
    public static void main(String[] args) {

        SpringApplication.run(UsuariosApplication.class, args);
    }
}