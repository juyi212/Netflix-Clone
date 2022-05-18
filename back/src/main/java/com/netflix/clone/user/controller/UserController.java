package com.netflix.clone.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.clone.repository.dto.User;
import com.netflix.clone.user.jwt.JwtService;
import com.netflix.clone.user.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	/* jwt 객체 불러오기 */
	@Autowired
	private JwtService jwtService;
	
	/* C :: 회원 가입 */
	@ApiOperation(value = "회원가입을 위한 Restful API(uId,uPassword,uName)", response = User.class)
	@PostMapping("/join")
	public ResponseEntity<String> createUser(@RequestBody User user, HttpServletRequest request) throws Exception {
		if (userService.insertUser(user) != null) {
			return new ResponseEntity<String>(user.getuId() + "계정 가입 성공", HttpStatus.OK);
		}
		return new ResponseEntity<String>("계정 가입 실패", HttpStatus.NO_CONTENT);
	}

	/* 일반 로그인 */
	@ApiOperation(value = "로그인 처리하는 Restful API(uId,uPassword)", response = User.class)
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, HttpSession session, HttpServletResponse response) throws Exception {
		User check = userService.login(user);
		Map<String, Object> resultMap = new HashMap<>();
		if (check != null) {
			// 파라미터 1번째 것은 FE 대로 따라가기..
			String token = jwtService.create(check);
			resultMap.put("auth-token", token);
			resultMap.put("uNo", check.getuNo());
			resultMap.put("uId", check.getuId()); 
			resultMap.put("uPassword", check.getuPassword());
			resultMap.put("uName", check.getuName());
			resultMap.put("uJoinDate", check.getuJoinDate());
			resultMap.put("uProvider", check.getuProvider());
			
			response.setHeader("auth-token", token);
	        Cookie cookie = new Cookie("auth-token", token);
	        cookie.setPath("/");
	        cookie.setHttpOnly(true);
	        cookie.setSecure(true);
	        response.addCookie(cookie);
			
			return new ResponseEntity<Map<String,Object>>(resultMap, HttpStatus.OK);
		}
		return new ResponseEntity<String>("로그인 실패", HttpStatus.NO_CONTENT);
	}
	
	/* 정보조회 */
	@ApiOperation(value = "정보조회 처리하는 Restful API", response = User.class)
	@PostMapping("/info")
	public ResponseEntity<?> getInfo( HttpSession session, HttpServletRequest request) throws Exception {
		HttpStatus status = null;
		Map<String, Object> resultMap = new HashMap<>();

		try {
			resultMap.putAll(jwtService.get(request.getHeader("auth-token")));
			status = HttpStatus.ACCEPTED;
		} catch (RuntimeException e) {
			resultMap.put("errMessage", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@PostMapping("/auth/kakao/callback")
	public ResponseEntity<?> kakaoCallback(@RequestBody String accessCode, HttpServletResponse response, HttpSession session) throws Exception { // Data를 return 해주는 controller method
		User kakaoUser = userService.oauth2AuthorizationKakao(accessCode);
		kakaoUser.setuPassword("kakaopassword");
		kakaoUser.setuProvider("kakao");
		// 가입자 혹은 비가입자 체크해서 처리
		try {
			User originUser = userService.selectUser(kakaoUser);
			if(originUser == null) {
				userService.createKakaoUser(kakaoUser);
				System.out.println("카카오 아이디로 회원가입 성공");
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		User check = userService.selectUser(kakaoUser);
		
		Map<String, Object> resultMap = new HashMap<>();
		if(check != null) {
			String token = jwtService.create(check);
			resultMap.put("auth-token", token);
			resultMap.put("uNo", check.getuNo());
			resultMap.put("uId", check.getuId()); 
			resultMap.put("uPassword", check.getuPassword());
			resultMap.put("uName", check.getuName());
			resultMap.put("uJoinDate", check.getuJoinDate());
			resultMap.put("uProvider", check.getuProvider());
			
	        response.setHeader("auth-token", token);

	        Cookie cookie = new Cookie("auth-token", token);
	        cookie.setPath("/");
	        cookie.setHttpOnly(true);
	        cookie.setSecure(true);
	        response.addCookie(cookie);
			
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		}
		resultMap.put("message", "로그인에 실패하였습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.NO_CONTENT);
	}
}
