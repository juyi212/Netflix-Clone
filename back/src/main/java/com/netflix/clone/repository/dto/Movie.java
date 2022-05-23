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
    private int id; // MovieDB 내 고유 id (auto_increment 아님)

    @Column(nullable = false)
    private char adult;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 2000)
    private String overview;

    @Column(name = "origin_title", nullable = false, length = 200)
    private String originTitle;

    @Column(name = "origin_country", length = 50)
    private String originCountry;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "poster_path", length = 500)
    private String posterPath;

    @Column(name = "video_path", length = 500)
    private String videoPath;

    @Column(name = "is_display", nullable = false, length = 1)
    private char isDisplay;

    @Column(name = "vote_count", nullable = false)
    private int voteCount;

    @Column(name = "vote_average", nullable = false)
    private int voteAverage;

    @Column(nullable = false)
    private float popularity;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public char getAdult() {
        return adult;
    }

    public void setAdult(char adult) {
        this.adult = adult;
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

    public String getOriginTitle() {
        return originTitle;
    }

    public void setOriginTitle(String originTitle) {
        this.originTitle = originTitle;
    }

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getVideoPath() {
        return videoPath;
    }

    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath;
    }

    public char getIsDisplay() {
        return isDisplay;
    }

    public void setIsDisplay(char isDisplay) {
        this.isDisplay = isDisplay;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public int getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(int voteAverage) {
        this.voteAverage = voteAverage;
    }

    public float getPopularity() {
        return popularity;
    }

    public void setPopularity(float popularity) {
        this.popularity = popularity;
    }
}
