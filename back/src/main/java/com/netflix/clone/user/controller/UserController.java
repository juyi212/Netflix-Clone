package com.netflix.clone.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.clone.repository.dto.User;
import com.netflix.clone.user.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

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
	public ResponseEntity<?> login(@RequestBody User user, HttpSession session) throws Exception {
		Map<String,Object> checkMap = userService.login(user);
		User check=(User) checkMap.get("user");
		Map<String, Object> resultMap = new HashMap<>();
		if (check != null) {
			// 파라미터 1번째 것은 FE 대로 따라가기..
			resultMap.put("auth-token", checkMap.get("token"));
			resultMap.put("uNo", check.getuNo());
			resultMap.put("uId", check.getuId()); 
			resultMap.put("uPassword", check.getuPassword());
			resultMap.put("uName", check.getuName());
			resultMap.put("uJoinDate", check.getuJoinDate());
			resultMap.put("uProvider", check.getuProvider());
			return new ResponseEntity<Map<String,Object>>(resultMap, HttpStatus.OK);
		}
		return new ResponseEntity<String>("로그인 실패", HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/auth/kakao/callback")
	public ResponseEntity<?> kakaoCallback(@RequestBody User user, HttpServletResponse response, HttpSession session) throws Exception { // Data를 return 해주는 controller method
		User kakaoUser = new User();
		System.out.println(user.toString());
		kakaoUser.setuId(user.getuId());
		kakaoUser.setuPassword(user.getuPassword());
		kakaoUser.setuName(user.getuName());
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
		User toLogin = userService.selectUser(user);
		
		Map<String, Object> resultMap = new HashMap<>();
		Map<String, Object> checkMap = userService.login(toLogin);
		User check=(User) checkMap.get("user");
		if(check != null) {
			resultMap.put("auth-token", checkMap.get("token"));
			resultMap.put("uNo", check.getuNo());
			resultMap.put("uId", check.getuId()); 
			resultMap.put("uPassword", check.getuPassword());
			resultMap.put("uName", check.getuName());
			resultMap.put("uJoinDate", check.getuJoinDate());
			resultMap.put("uProvider", check.getuProvider());
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		}
		resultMap.put("message", "로그인에 실패하였습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.NO_CONTENT);
	}
}
