package com.netflix.clone.movie.controller;

import com.netflix.clone.movie.service.MovieService;
import com.netflix.clone.repository.dto.Movie;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> getMovieDetail(@RequestParam("movieId") String movieId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        Movie movie = null;

        try {
            movie = movieService.getMovieDetail(Integer.parseInt(movieId));
            if(movie == null) {
                resultMap.put("errMessage", "영화 정보가 존재하지 않습니다.");
                resultMap.put("status", "error");
                status = HttpStatus.OK;

                return new ResponseEntity<Map<String, Object>>(resultMap, status);
            }

            resultMap.put("movie", movie);
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("errMessage", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;

            return new ResponseEntity<Map<String, Object>>(resultMap, status);
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
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
