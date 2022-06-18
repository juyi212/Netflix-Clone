package com.netflix.clone.repository.mapper;

import com.netflix.clone.repository.dto.MovieCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MovieCategoryRepository extends JpaRepository<MovieCategory, Long> {

    @Query(value = "select category_id from movie_category mc where mc.movie_id = :movieId", nativeQuery = true)
    List<String> findByMovieId(int movieId);
}
