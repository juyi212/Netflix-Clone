package com.netflix.clone.repository.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "movie_category")
@NoArgsConstructor
@AllArgsConstructor
public class MovieCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id; // AI

    @Column(name = "movie_id", nullable = false)
    private int movieId;

    @Column(name = "category_id", nullable = false)
    private int categoryId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}
