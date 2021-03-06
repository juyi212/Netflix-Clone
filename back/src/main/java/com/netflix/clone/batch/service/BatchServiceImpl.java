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
                    // ????????????
                    movie.setAdult(detailObject.get("adult").getAsString().equals("false") ? 'N' : 'Y');
                    // ?????? ??????
                    movie.setTitle(detailObject.get("title").getAsString());
                    // ??????
                    movie.setOverview(detailObject.get("overview").getAsString());
                    // ?????? ??????
                    movie.setOriginTitle(detailObject.get("original_title").getAsString());
                    // ??????
                    JsonArray anotherArray = detailObject.getAsJsonArray("production_countries");
                    JsonObject anotherObject = null;
                    if(anotherArray.size() > 0) {
                        anotherObject = (JsonObject) anotherArray.get(0);
                        String originCountry = anotherObject.get("name").getAsString();
                        switch (originCountry){
                            case "United States of America" :
                                originCountry = "??????";
                                break;
                            case "United Kingdom" :
                                originCountry = "??????";
                                break;
                            case "Hungary" :
                                originCountry = "?????????";
                                break;
                            case "Japan" :
                                originCountry = "??????";
                                break;
                            case "India" :
                                originCountry = "??????";
                                break;
                            case "Italy" :
                                originCountry = "????????????";
                                break;
                            case "Hong Kong" :
                                originCountry = "??????";
                                break;
                            case "Germany" :
                                originCountry = "??????";
                                break;
                            case "South Korea" :
                                originCountry = "????????????";
                                break;
                            case "China" :
                                originCountry = "??????";
                                break;
                            case "Spain" :
                                originCountry = "?????????";
                                break;
                            case "Mexico" :
                                originCountry = "?????????";
                                break;
                            case "France" :
                                originCountry = "?????????";
                                break;
                            case "Argentina" :
                                originCountry = "???????????????";
                                break;
                            case "Poland" :
                                originCountry = "?????????";
                                break;
                            case "Australia" :
                                originCountry = "??????";
                                break;
                            default :
                                break;

                        }
                        movie.setOriginCountry(originCountry);
                    }
                    // ?????????
                    if(!detailObject.get("release_date").getAsString().equals("") && detailObject.get("release_date").getAsString() != null) {
                        movie.setReleaseDate(detailObject.get("release_date").getAsString());
                    }
                    // ????????? URL
                    if(!detailObject.get("poster_path").isJsonNull()) {
                        String posterPath = "https://image.tmdb.org/t/p/w1280" + detailObject.get("poster_path").getAsString();
                        movie.setPosterPath(posterPath);
                    }
                    movie.setIsDisplay('Y');
                    movie.setVoteCount(detailObject.get("vote_count").getAsInt());
                    movie.setVoteAverage(detailObject.get("vote_average").getAsInt());
                    movie.setPopularity(detailObject.get("popularity").getAsFloat());

                    movieRepository.save(movie);

                    // ????????????
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

    @Override
    public int getPopulareMovie() throws Exception {
        for(int p=1; p<=20; p++) {
            String api = "https://api.themoviedb.org/3/movie/popular?api_key=" + movieKey + "&language=ko-KR&page=" + p;

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
                        // ????????????
                        movie.setAdult(detailObject.get("adult").getAsString().equals("false") ? 'N' : 'Y');
                        // ?????? ??????
                        movie.setTitle(detailObject.get("title").getAsString());
                        // ??????
                        movie.setOverview(detailObject.get("overview").getAsString());
                        // ?????? ??????
                        movie.setOriginTitle(detailObject.get("original_title").getAsString());
                        // ??????
                        JsonArray anotherArray = detailObject.getAsJsonArray("production_countries");
                        JsonObject anotherObject = null;
                        if(anotherArray.size() > 0) {
                            anotherObject = (JsonObject) anotherArray.get(0);
                            String originCountry = anotherObject.get("name").getAsString();
                            switch (originCountry){
                                case "United States of America" :
                                    originCountry = "??????";
                                    break;
                                case "United Kingdom" :
                                    originCountry = "??????";
                                    break;
                                case "Hungary" :
                                    originCountry = "?????????";
                                    break;
                                case "Japan" :
                                    originCountry = "??????";
                                    break;
                                case "India" :
                                    originCountry = "??????";
                                    break;
                                case "Italy" :
                                    originCountry = "????????????";
                                    break;
                                case "Hong Kong" :
                                    originCountry = "??????";
                                    break;
                                case "Germany" :
                                    originCountry = "??????";
                                    break;
                                case "South Korea" :
                                    originCountry = "????????????";
                                    break;
                                case "China" :
                                    originCountry = "??????";
                                    break;
                                case "Spain" :
                                    originCountry = "?????????";
                                    break;
                                case "Mexico" :
                                    originCountry = "?????????";
                                    break;
                                case "France" :
                                    originCountry = "?????????";
                                    break;
                                case "Argentina" :
                                    originCountry = "???????????????";
                                    break;
                                case "Poland" :
                                    originCountry = "?????????";
                                    break;
                                case "Australia" :
                                    originCountry = "??????";
                                    break;
                                default :
                                    break;

                            }
                            movie.setOriginCountry(originCountry);
                        }
                        // ?????????
                        if(!detailObject.get("release_date").getAsString().equals("") && detailObject.get("release_date").getAsString() != null) {
                            movie.setReleaseDate(detailObject.get("release_date").getAsString());
                        }
                        // ????????? URL
                        if(!detailObject.get("poster_path").isJsonNull()) {
                            String posterPath = "https://image.tmdb.org/t/p/w1280" + detailObject.get("poster_path").getAsString();
                            movie.setPosterPath(posterPath);
                        }
                        // ?????? URL
                        if(!detailObject.get("backdrop_path").isJsonNull()) {
                            String bannerPath = "https://image.tmdb.org/t/p/w1280" + detailObject.get("backdrop_path").getAsString();
                            movie.setBannerPath(bannerPath);
                        }
                        movie.setIsDisplay('Y');
                        movie.setVoteCount(detailObject.get("vote_count").getAsInt());
                        movie.setVoteAverage(detailObject.get("vote_average").getAsInt());
                        movie.setPopularity(detailObject.get("popularity").getAsFloat());

                        movieRepository.save(movie);

                        // ????????????
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
        }

        return 0;
    }
}
