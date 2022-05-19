package com.netflix.clone.batch.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
            throw e;
        }

        return 0;
    }
}
