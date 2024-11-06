package com.MatchMyMovie.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApiConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Voeg OPTIONS toe
                .allowedHeaders("*") // Toestaan van alle headers
                .allowCredentials(true); // Indien van toepassing
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}