package com.netflix.clone.movie.controller;

import com.netflix.clone.movie.service.MovieService;
import com.netflix.clone.repository.dto.Movie;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    /* 인기 영화 정보(10개) 조회*/
    @ApiOperation(value = "인기 영화 정보(10개) 조회 Restful API", response = Movie.class)
    @GetMapping("/popular_movie")
    public List<Movie> getPopularMovie() {
        List<Movie> movieList = null;
        try {
            movieList = movieService.getPopularMovie();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieList;
    }

    /* 카테고리 별 영화 정보(20개) 조회*/
    @ApiOperation(value = "카테고리 별 영화 정보(20개) 조회 Restful API", response = Movie.class)
    @GetMapping("/category_movie")
    public List<Movie> getCategoryMovie(@RequestParam("genreId") String genreId) {
        List<Movie> movieList = null;
        try {
            movieList = movieService.getCategoryMovie(genreId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieList;
    }

    /* 국가 별 영화 정보(20개) 조회*/
    @ApiOperation(value = "국가 별 영화 정보(20개) 조회 Restful API", response = Movie.class)
    @GetMapping("/country_movie")
    public List<Movie> getCountryMovie(@RequestParam("oriCountry") String oriCountry) {
        List<Movie> movieList = null;
        try {
            movieList = movieService.getCountryMovie(oriCountry);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieList;
    }
}
