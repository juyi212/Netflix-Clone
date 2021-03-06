package com.netflix.clone.movie.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netflix.clone.repository.dto.Movie;
import com.netflix.clone.repository.dto.UserZzim;
import com.netflix.clone.repository.mapper.MovieCategoryRepository;
import com.netflix.clone.repository.mapper.MovieRepository;
import com.netflix.clone.repository.mapper.UserZzimRepository;

@Service
public class MovieServiceImpl implements MovieService{

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MovieCategoryRepository movieCategoryRepository;
    @Autowired
    private UserZzimRepository userZzimRepository;

    @Override
    public List<Movie> getPopularMovie(String userNo) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findTop10ByOrderByPopularityDesc().forEach(e -> movieList.add(e));

        for(int i=0; i<movieList.size(); i++) {
            List<String> categoryList = movieCategoryRepository.findByMovieId(movieList.get(i).getId());
            movieList.get(i).setCategory(categoryList);

            UserZzim userZzim = null;
            userZzim = userZzimRepository.findByUserNoAndZzim(movieList.get(i).getId(), Integer.parseInt(userNo));
            if(userZzim != null) {
                movieList.get(i).setIsZzim("Y");
            }else {
                movieList.get(i).setIsZzim("N");
            }
        }

        return movieList;
    }

    @Override
    public List<Movie> getCategoryMovie(String genre, String userNo) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findTop20ByCategory(genre).forEach(e -> movieList.add(e));

        for(int i=0; i<movieList.size(); i++) {
            List<String> categoryList = movieCategoryRepository.findByMovieId(movieList.get(i).getId());
            movieList.get(i).setCategory(categoryList);

            UserZzim userZzim = null;
            userZzim = userZzimRepository.findByUserNoAndZzim(movieList.get(i).getId(), Integer.parseInt(userNo));
            if(userZzim != null) {
                movieList.get(i).setIsZzim("Y");
            }else {
                movieList.get(i).setIsZzim("N");
            }
        }

        return movieList;
    }

    @Override
    public List<Movie> getCountryMovie(String oriCountry, String userNo) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findTop20ByOriginCountry(oriCountry).forEach(e -> movieList.add(e));

        for(int i=0; i<movieList.size(); i++) {
            List<String> categoryList = movieCategoryRepository.findByMovieId(movieList.get(i).getId());
            movieList.get(i).setCategory(categoryList);

            UserZzim userZzim = null;
            userZzim = userZzimRepository.findByUserNoAndZzim(movieList.get(i).getId(), Integer.parseInt(userNo));
            if(userZzim != null) {
                movieList.get(i).setIsZzim("Y");
            }else {
                movieList.get(i).setIsZzim("N");
            }
        }

        return movieList;
    }

    @Override
    public Movie getMovieDetail(int movieId, String userNo) throws Exception {
        Movie movie = null;
        movie = movieRepository.findById(movieId);

        List<String> categoryList = movieCategoryRepository.findByMovieId(movie.getId());
        movie.setCategory(categoryList);

        UserZzim userZzim = null;
        userZzim = userZzimRepository.findByUserNoAndZzim(movieId, Integer.parseInt(userNo));
        if(userZzim != null) {
            movie.setIsZzim("Y");
        }else {
          movie.setIsZzim("N");
        }

        return movie;
    }

    @Override
    @Transactional
    public int updateMovieLike(int movieId) throws Exception {
        Movie movie = movieRepository.findById(movieId);
        movie.setVoteCount(movie.getVoteCount() + 1);

        return 1;
    }

    @Override
    @Transactional
    public int updateMovieDislike(int movieId) throws Exception {
        Movie movie = movieRepository.findById(movieId);
        movie.setVoteCount(movie.getVoteCount() - 1);

        return 1;
    }

    @Override
    public List<Movie> getMovieZzim(String userNo) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findByZzim(userNo).forEach(e -> movieList.add(e));

        for(int i=0; i<movieList.size(); i++) {
            List<String> categoryList = movieCategoryRepository.findByMovieId(movieList.get(i).getId());
            movieList.get(i).setCategory(categoryList);
        }

        return movieList;
    }

    @Override
    public List<Movie> getSearchMovie(String searchKey) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findBySearchKey(searchKey).forEach(e -> movieList.add(e));

        for(int i=0; i<movieList.size(); i++) {
            List<String> categoryList = movieCategoryRepository.findByMovieId(movieList.get(i).getId());
            movieList.get(i).setCategory(categoryList);
        }

        return movieList;
    }

	@Override
	public List<UserZzim> getUserBymovieZzim(int movieId) throws Exception {
		return userZzimRepository.findBymovieId(movieId);
	}

	@Override
	public List<UserZzim> getMovieZzimeByUser(String userNo) throws Exception {
		// TODO Auto-generated method stub
		return userZzimRepository.findByuserNo(Integer.parseInt(userNo));
	}
}
