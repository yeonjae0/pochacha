package com.ssafy.oho.test;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://localhost")
		.allowedOrigins("https://ohogame.shop")
                //.allowedOrigins("https://localhost:3000")
		.allowedOrigins("https://43.201.150.143:")
		.allowedOrigins("https://172.26.3.152")
		.allowedOrigins("https://172.17.0.1")
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");
    }
}

