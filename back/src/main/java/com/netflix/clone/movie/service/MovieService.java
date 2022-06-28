package com.netflix.clone.movie.service;

import java.util.List;

import com.netflix.clone.repository.dto.Movie;
import com.netflix.clone.repository.dto.UserZzim;

public interface MovieService {
    List<Movie> getPopularMovie() throws Exception;

    List<Movie> getCategoryMovie(String genreId) throws Exception;

    List<Movie> getCountryMovie(String oriCountry) throws Exception;

    Movie getMovieDetail(int movieId) throws Exception;

    int updateMovieLike(int movieId) throws Exception;

    int updateMovieDislike(int movieId) throws Exception;

    List<Movie> getMovieZzim(String userNo) throws Exception;

    List<Movie> getSearchMovie(String searchKey) throws Exception;

	List<UserZzim> getUserBymovieZzim(int movieId) throws Exception;

	List<UserZzim> getMovieZzimeByUser(String userNo) throws Exception;
}
