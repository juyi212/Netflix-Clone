package com.netflix.clone.batch.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.netflix.clone.repository.dto.Movie;
import com.netflix.clone.repository.dto.MovieCategory;
import com.netflix.clone.repository.mapper.MovieCategoryRepository;
import com.netflix.clone.repository.mapper.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class BatchServiceImpl implements BatchService{
    @Value("${moviedb_key}")
    private String movieKey;

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MovieCategoryRepository movieCategoryRepository;


    @Override
    public int getChangeMovie() throws Exception {
        String api = "https://api.themoviedb.org/3/movie/changes?api_key=" + movieKey + "&page=1";

        try {
            URL url = new URL(api);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject object = element.getAsJsonObject();
            JsonArray items = object.getAsJsonArray("results");

            for(int i=0;i<items.size();i++) {
                Movie movie = new Movie();
                object = (JsonObject) items.get(i);
                String movieId = object.get("id").getAsString();
                movie.setId(Integer.parseInt(movieId));
                String detailApi = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + movieKey + "&language=ko-KR";

                try {
                    URL detailUrl = new URL(detailApi);
                    HttpURLConnection detailConn = (HttpURLConnection) detailUrl.openConnection();
                    detailConn.setRequestMethod("GET");
                    detailConn.setRequestProperty("Accept", "application/json");
                    BufferedReader detailBr = null;
                    try {
                        detailBr = new BufferedReader(new InputStreamReader(
                                (detailConn.getInputStream())));
                    } catch(Exception e) {
                        e.printStackTrace();
                    }

                    String detailLine = "";
                    String detailResult = "";

                    while ((detailLine = detailBr.readLine()) != null) {
                        detailResult += detailLine;
                    }

                    JsonParser detailParser = new JsonParser();
                    JsonElement detailElement = detailParser.parse(detailResult);
                    JsonObject detailObject = detailElement.getAsJsonObject();
                    // 청불여부
                    movie.setAdult(detailObject.get("adult").getAsString().equals("false") ? 'N' : 'Y');
                    // 한국 제목
                    movie.setTitle(detailObject.get("title").getAsString());
                    // 개요
                    movie.setOverview(detailObject.get("overview").getAsString());
                    // 원작 제목
                    movie.setOriginTitle(detailObject.get("original_title").getAsString());
                    // 국가
                    JsonArray anotherArray = detailObject.getAsJsonArray("production_countries");
                    JsonObject anotherObject = null;
                    if(anotherArray.size() > 0) {
                        anotherObject = (JsonObject) anotherArray.get(0);
                        String originCountry = anotherObject.get("name").getAsString();
                        switch (originCountry){
                            case "United States of America" :
                                originCountry = "미국";
                                break;
                            case "United Kingdom" :
                                originCountry = "영국";
                                break;
                            case "Hungary" :
                                originCountry = "헝가리";
                                break;
                            case "Japan" :
                                originCountry = "일본";
                                break;
                            case "India" :
                                originCountry = "인도";
                                break;
                            case "Italy" :
                                originCountry = "이탈리아";
                                break;
                            case "Hong Kong" :
                                originCountry = "홍콩";
                                break;
                            case "Germany" :
                                originCountry = "독일";
                                break;
                            case "South Korea" :
                                originCountry = "대한민국";
                                break;
                            case "China" :
                                originCountry = "중국";
                                break;
                            case "Spain" :
                                originCountry = "스페인";
                                break;
                            case "Mexico" :
                                originCountry = "멕시코";
                                break;
                            case "France" :
                                originCountry = "프랑스";
                                break;
                            case "Argentina" :
                                originCountry = "아르헨티나";
                                break;
                            case "Poland" :
                                originCountry = "폴란드";
                                break;
                            case "Australia" :
                                originCountry = "호주";
                                break;
                            default :
                                break;

                        }
                        movie.setOriginCountry(originCountry);
                    }
                    // 개봉일
                    if(!detailObject.get("release_date").getAsString().equals("") && detailObject.get("release_date").getAsString() != null) {
                        movie.setReleaseDate(detailObject.get("release_date").getAsString());
                    }
                    // 포스터 URL
                    if(!detailObject.get("poster_path").isJsonNull()) {
                        String posterPath = "https://image.tmdb.org/t/p/w1280" + detailObject.get("poster_path").getAsString();
                        movie.setPosterPath(posterPath);
                    }
                    movie.setIsDisplay('Y');
                    movie.setVoteCount(detailObject.get("vote_count").getAsInt());
                    movie.setVoteAverage(detailObject.get("vote_average").getAsInt());
                    movie.setPopularity(detailObject.get("popularity").getAsFloat());

                    movieRepository.save(movie);

                    // 카테고리
                    anotherArray = detailObject.getAsJsonArray("genres");
                    for(int j=0;j<anotherArray.size();j++) {
                        MovieCategory movieCategory = new MovieCategory();
                        anotherObject = (JsonObject) anotherArray.get(j);
                        int genre = anotherObject.get("id").getAsInt();
                        movieCategory.setMovieId(Integer.parseInt(movieId));
                        movieCategory.setCategoryId(genre);

                        movieCategoryRepository.save(movieCategory);
                    }

                    conn.disconnect();

                } catch (Exception e) {
                    throw e;
                }

            }
            conn.disconnect();
        } catch (Exception e) {
            throw e;
        }

        return 0;
    }
}
