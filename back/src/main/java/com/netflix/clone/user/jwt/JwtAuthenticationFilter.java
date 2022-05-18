package com.netflix.clone.user.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService2) {
    	jwtService=jwtService2;
	}

	@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtService.resolveToken(request);

        if(token != null && jwtService.validateToken(token)){
            Authentication authentication = null;
			try {
				authentication = jwtService.getAuthentication(token);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}