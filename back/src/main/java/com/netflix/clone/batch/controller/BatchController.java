package com.netflix.clone.batch.controller;

import com.netflix.clone.batch.service.BatchService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/batch")
public class BatchController {

    @Autowired
    private BatchService batchService;

    /* MovieDB에서 14일 이내 수정된 영화 정보 DB 갱신*/
    @ApiOperation(value = "MovieDB에서 14일 이내 수정된 영화 정보 DB 갱신 Restful API")
    @GetMapping("/change_movie")
    public String getChangeMovie() {
        try {
            batchService.getChangeMovie();
        } catch (Exception e) {
            e.printStackTrace();
            return "FAIL";
        }
        return "OK";
    }
}
