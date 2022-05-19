package com.netflix.clone.movie.controller;

import com.netflix.clone.movie.service.MovieService;
import com.netflix.clone.repository.dto.Movie;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    /* 오늘의 인기 영화 정보 조회*/
    @ApiOperation(value = "오늘의 인기 영화 정보 조회 Restful API", response = Movie.class)
    @GetMapping("/trend_today_movies")
    public List<Movie> getTrendTodayMovies() {
        List<Movie> movieList = null;
        try {
            movieList = movieService.getTrendTodayMovies();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieList;
    }
}
