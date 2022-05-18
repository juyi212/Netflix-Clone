package com.netflix.clone.batch.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.netflix.clone.repository.dto.User;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequestMapping("/batch")
public class BatchController {

    @Value("${moviedb_key}")
    private String movieKey;

    /* 최근 수정된 영화 조회 */
    @ApiOperation(value = "최근 14일 내 수정된 영화 조회 Restful API", response = User.class)
    @GetMapping("/change_movie")
    public String getChangeMovie() {
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

            System.out.println(result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject object = element.getAsJsonObject();
            JsonArray items = object.getAsJsonArray("results");

            for(int i=0;i<items.size();i++) {
                object = (JsonObject) items.get(i);
                String id = object.get("id").getAsString();
                System.out.println(id);
            }

            conn.disconnect();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "OK";
    }
}
