package com.netflix.clone.user.service;

import com.netflix.clone.repository.dto.User;

public interface UserService {

	/* 로그인 */
	User login(User user) throws Exception;

	/* C :: 회원 가입 */
	User insertUser(User user) throws Exception;
	
	/* R :: 회원 조회 */
	User selectUser(User user) throws Exception;
	
	/* R :: 회원 조회 */
	User selectUserByToken(String token) throws Exception;
//
//	/* U :: 회원 수정 - 비밀번호 수정 */
//	int updateUser(User user) throws Exception;
//
	/* D :: 회원 삭제 */
	User deleteUser(String uId) throws Exception;
//
//	/* R :: 아이디 중복 체크 */
//	int checkUId(String uId) throws Exception;
//
//	/* R :: 비밀번호 찾기 */
//	int findPasswordByUId(String uId) throws Exception;
//
	/* 카카오 회원 가입 */
	User createKakaoUser(User user) throws Exception;

	User oauth2AuthorizationKakao(String accessCode) throws Exception;

	User updateKakaoUser(User kakaoUser);

	String kakaoUserLogout(String access_token);

    int insertMovieZzim(int movieId, int userNo) throws Exception;

    int deleteMovieZzim(int movieId, int userNo) throws Exception;

    /* 카카오 로그인 */
//	Map<String, Object> kakaoLogin(User user) throws Exception;
//
//	/* 로그인 시, 이메일로 맞는 salt 값 받아오기 */
//	String getuSaltByUId(String getUId) throws Exception;

}