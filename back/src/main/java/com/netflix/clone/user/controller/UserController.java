package com.netflix.clone.user.controller;

import javax.servlet.http.HttpServletRequest;
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
		User check = userService.login(user);

		if (check != null) {
			return new ResponseEntity<User>(check, HttpStatus.OK);
		}
		return new ResponseEntity<String>("로그인 실패", HttpStatus.NO_CONTENT);
	}
}
