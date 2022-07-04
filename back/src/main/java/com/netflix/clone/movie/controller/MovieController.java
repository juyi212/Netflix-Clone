package com.netflix.clone.movie.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.clone.movie.service.MovieService;
import com.netflix.clone.repository.dto.Movie;
import com.netflix.clone.repository.dto.UserZzim;

import io.swagger.annotations.ApiOperation;

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
    public ResponseEntity<?> getMovieDetail(@RequestParam("movieId") String movieId, @RequestParam("userNo") String userNo) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        Movie movie = null;

        try {
            movie = movieService.getMovieDetail(Integer.parseInt(movieId), userNo);
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

    /* 영화 좋아요 해제 */
    @ApiOperation(value = "영화 좋아요 해제 Restful API")
    @PutMapping("/movie_dislike")
    public String updateMovieDislike(@RequestParam("movieId") String movieId) {
        try {
            if(movieService.updateMovieDislike(Integer.parseInt(movieId)) <= 0) {
                return "FAIL";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "FAIL";
        }

        return "OK";
    }

    /* 사용자 별 찜한 영화 조회 */
    @ApiOperation(value = "사용자 별 찜한 영화 조회 Restful API", response = Movie.class)
    @GetMapping("/movie_zzim")
    public List<Movie> getMovieZzim(@RequestParam("userNo") String userNo) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        List<Movie> movieList = null;

        try {
            movieList = movieService.getMovieZzim(userNo);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieList;
    }
    
    /* 사용자 별 찜한 영화 조회 */
    @ApiOperation(value = "사용자가 찜한 영화 기반 추천 Restful API", response = Movie.class)
    @GetMapping("/recommendMovie")
    public ResponseEntity<?> recommendMovie(@RequestParam("userNo") String userNo,  HttpServletRequest request, HttpServletResponse response) {
    	List<UserZzim> movieList = null;
    	List<Movie> resultLsit= null;
    	try {
    		movieList = movieService.getMovieZzimeByUser(userNo);
    		if(movieList.size()==0) {
    			return new ResponseEntity<String>("유저가 찜한 영화가 없음", HttpStatus.NO_CONTENT);
    		}
    		UserZzim recommendMovie=movieList.get((int)(Math.random()*movieList.size()));
    		
    		List<UserZzim> userList= movieService.getUserBymovieZzim(recommendMovie.getMovieId());
    		if(userList.size()<=1) {
    			return new ResponseEntity<String>("영화를 찜한 유저가 없음", HttpStatus.NO_CONTENT);
    		}
    		UserZzim movieZzim = userList.get((int)(Math.random()*userList.size()));
    		resultLsit = movieService.getMovieZzim(String.valueOf(movieZzim.getUserNo()));
    	} catch (Exception e) {
    		e.printStackTrace();
    		return new ResponseEntity<String>(e.getMessage(), HttpStatus.NO_CONTENT);
    	}
    	
    	return new ResponseEntity<List<Movie>>(resultLsit, HttpStatus.ACCEPTED);
    }

    /* 영화 검색 */
    @ApiOperation(value = "영화 검색 Restful API", response = Movie.class)
    @GetMapping("/search_movie")
    public List<Movie> getSearchMovie(@RequestParam("searchKey") String searchKey) {
        List<Movie> movieList = null;

        try {
            movieList = movieService.getSearchMovie(searchKey);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movieList;
    }

}
