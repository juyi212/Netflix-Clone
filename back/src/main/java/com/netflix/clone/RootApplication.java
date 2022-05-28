package com.netflix.clone;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@MapperScan(basePackages = "com.netflix.clone.repository.mapper")
public class RootApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(RootApplication.class, args);
	}

	/* 시큐리티 적용하면, 고쳐질수 있는 부분? */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:3000")
		.allowedOrigins("http://3.39.105.32")
		.allowedMethods("*")
		.allowedHeaders("*")
		.exposedHeaders("auth-token").allowCredentials(true);
	}

	@PostConstruct
	public void setTimezone() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
}
