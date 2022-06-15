package com.netflix.clone.movie.service;

import com.netflix.clone.repository.dto.Movie;
import com.netflix.clone.repository.dto.MovieCategory;
import com.netflix.clone.repository.mapper.MovieCategoryRepository;
import com.netflix.clone.repository.mapper.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MovieCategoryRepository movieCategoryRepository;

    @Override
    public List<Movie> getPopularMovie() throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findTop10ByOrderByPopularityDesc().forEach(e -> movieList.add(e));

        for(int i=0; i<movieList.size(); i++) {
            List<MovieCategory> categoryList = movieCategoryRepository.findByMovieId(movieList.get(i).getId());
            StringBuilder sb = new StringBuilder("");

            for(int j=0; j<categoryList.size(); j++) {
                sb.append(categoryList.get(j).getCategoryId());
                if(j < categoryList.size() - 1) {
                    sb.append(",");
                }
            }

            movieList.get(i).setCategory(sb.toString());
        }

        return movieList;
    }

    @Override
    public List<Movie> getCategoryMovie(String genre) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findTop20ByCategory(genre).forEach(e -> movieList.add(e));

        return movieList;
    }

    @Override
    public List<Movie> getCountryMovie(String oriCountry) throws Exception {
        List<Movie> movieList = new ArrayList<>();
        movieRepository.findTop20ByOriginCountry(oriCountry).forEach(e -> movieList.add(e));

        return movieList;
    }

    @Override
    public Movie getMovieDetail(int movieId) throws Exception {
        Movie movie = null;
        movie = movieRepository.findById(movieId);

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

        return movieList;
    }


}
