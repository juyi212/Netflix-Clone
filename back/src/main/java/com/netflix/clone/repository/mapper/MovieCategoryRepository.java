package com.netflix.clone.repository.mapper;

import com.netflix.clone.repository.dto.MovieCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieCategoryRepository extends JpaRepository<MovieCategory, Long> {
}
