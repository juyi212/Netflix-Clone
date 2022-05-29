package com.netflix.clone.repository.mapper;

import com.netflix.clone.repository.dto.MovieCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MovieCategoryRepository extends JpaRepository<MovieCategory, Long> {
    List<MovieCategory> findByMovieId(int movieId);
}
