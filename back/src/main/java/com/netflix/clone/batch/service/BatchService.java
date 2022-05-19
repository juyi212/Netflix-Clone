package com.netflix.clone.batch.service;

public interface BatchService {
    /* MovieDB에서 14일 이내 수정된 영화 정보 조회*/
    int getChangeMovie() throws Exception;
}
