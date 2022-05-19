package com.netflix.clone.repository.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "movie")
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // MovieDB 내 고유 id (auto_increment 아님)

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 500)
    private String overview;

    @Column(nullable = false, length = 200)
    private String origin_title;

    @Column(nullable = false, length = 50)
    private String genre_id;

    @Column(nullable = false, length = 50)
    private String origin_language;

    @Column(nullable = false)
    private String release_date;

    @Column(nullable = false, length = 500)
    private String poster_path;

    @Column(nullable = true, length = 500)
    private String video_path;

    @Column(nullable = false, length = 1)
    private char is_display;

    @Column(nullable = false)
    private int vote_count;

    @Column(nullable = false)
    private int vote_average;

    @Column(nullable = false)
    private float popularity;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getOrigin_title() {
        return origin_title;
    }

    public void setOrigin_title(String origin_title) {
        this.origin_title = origin_title;
    }

    public String getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(String genre_id) {
        this.genre_id = genre_id;
    }

    public String getOrigin_language() {
        return origin_language;
    }

    public void setOrigin_language(String origin_language) {
        this.origin_language = origin_language;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public String getVideo_path() {
        return video_path;
    }

    public void setVideo_path(String video_path) {
        this.video_path = video_path;
    }

    public char getIs_display() {
        return is_display;
    }

    public void setIs_display(char is_display) {
        this.is_display = is_display;
    }

    public int getVote_count() {
        return vote_count;
    }

    public void setVote_count(int vote_count) {
        this.vote_count = vote_count;
    }

    public int getVote_average() {
        return vote_average;
    }

    public void setVote_average(int vote_average) {
        this.vote_average = vote_average;
    }

    public float getPopularity() {
        return popularity;
    }

    public void setPopularity(float popularity) {
        this.popularity = popularity;
    }
}
