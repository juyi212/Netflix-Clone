package com.netflix.clone.repository.mapper;

import com.netflix.clone.repository.dto.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findTop10ByOrderByPopularityDesc();

    @Query(value = "select distinct m.* from movie m left join movie_category mc on m.id = mc.movie_id where mc.category_id = :genre", nativeQuery = true)
    List<Movie> findTop20ByCategory(@Param(value = "genre") String genre);

    List<Movie> findTop20ByOriginCountry(String oriCountry);

    Movie findById(int movieId);

}
