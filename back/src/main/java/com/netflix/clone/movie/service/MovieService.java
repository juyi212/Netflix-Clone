package com.netflix.clone.movie.service;

import com.netflix.clone.repository.dto.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> getTrendTodayMovies() throws Exception;
}
