package com.netflix.clone.movie.controller;

import com.netflix.clone.movie.service.MovieService;
import com.netflix.clone.repository.dto.Movie;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    /* 영화 ID 별 조회 */
    @ApiOperation(value = "영화 ID 별 조회 Restful API", response = Movie.class)
    @GetMapping("/movie_detail")
    public Movie getMovieDetail(@RequestParam("movieId") String movieId) {
        Movie movie = null;
        try {
            movie = movieService.getMovieDetail(Integer.parseInt(movieId));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movie;
    }

    /* 영화 좋아요 */
    @ApiOperation(value = "영화 좋아요 Restful API")
    @PutMapping("/movie_like")
    public String updateMovieLike(@RequestParam("movieId") String movieId) {
        try {
            if(movieService.updateMovieLike(Integer.parseInt(movieId)) <= 0) {
                return "FAIL";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "FAIL";
        }

        return "OK";
    }
}
