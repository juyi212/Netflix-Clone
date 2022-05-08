package com.netflix.clone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("Netflix-Clone")
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Netflix-Clone")
				.description("Netflix-Clone")
				.termsOfServiceUrl("https://www.notion.so/PJT-4131b4a0b22145d9b82ca1d14a8b8045")
				.license("Netflix-Clone")
				.licenseUrl("https://www.notion.so/PJT-4131b4a0b22145d9b82ca1d14a8b8045").version("1.0").build();
	}
}