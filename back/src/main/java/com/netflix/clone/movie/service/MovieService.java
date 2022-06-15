package com.netflix.clone.movie.service;

import com.netflix.clone.repository.dto.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> getPopularMovie() throws Exception;

    List<Movie> getCategoryMovie(String genreId) throws Exception;

    List<Movie> getCountryMovie(String oriCountry) throws Exception;

    Movie getMovieDetail(int movieId) throws Exception;

    int updateMovieLike(int movieId) throws Exception;

    int updateMovieDislike(int movieId) throws Exception;
}
