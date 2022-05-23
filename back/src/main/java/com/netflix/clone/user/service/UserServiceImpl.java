package com.netflix.clone.user.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.netflix.clone.repository.dto.User;
import com.netflix.clone.repository.dto.UserAccount;
import com.netflix.clone.repository.mapper.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
	
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    private final RestTemplate restTemplate;
    private final String kakaoOauth2ClinetId = "53fac96dcc45b034a080250c417a2227";
    private final String frontendRedirectUrl = "http://localhost:3000/user/kakao";
	/* 일반 로그인 */
	@Override
	public User login(User user) throws Exception {
        User check=userRepository.findByuId(user.getuId());
        if(passwordEncoder.matches(user.getuPassword(), check.getuPassword())) {
        	return check;
        }
		return null;
		
	}

	/* 일반 회원 가입 */
	@Override
	public User insertUser(User user) throws Exception {
		
		user.setuPassword(passwordEncoder.encode(user.getuPassword()));
		user.generateEuAuthKey();
		// 3. 남은 유저 정보들 삽입 처리
		return userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String uId) throws UsernameNotFoundException {
        User user = userRepository.findByuId(uId);
        
        if (user == null) {
            throw new UsernameNotFoundException(uId);
        }

        return new UserAccount(user);
	}

	@Override
	public User selectUser(User user) throws Exception {
		return userRepository.findByuId(user.getuId());
	}

	@Override
	public User createKakaoUser(User user) throws Exception {
		user.generateEuAuthKey();
		// 3. 남은 유저 정보들 삽입 처리
		return userRepository.save(user);
	}

	@Override
	public User selectUserByToken(String token) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return userRepository.findByuId(authentication.getName());
	}

	@Override
	public User oauth2AuthorizationKakao(String accessCode) throws Exception {
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

	    LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    params.add("grant_type", "authorization_code");
	    params.add("client_id", kakaoOauth2ClinetId);
	    params.add("redirect_uri", frontendRedirectUrl);
	    params.add("code", accessCode);

	    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

	    String url = "https://kauth.kakao.com/oauth/token";

	    ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
	    String []temp=response.getBody().replace("{", "").replace("}", "").replace("\"", "").split(",");
	    Map<String, String> resultMap = new HashMap<>();
	    for (int i = 0; i < temp.length; i++) {
			String result[]=temp[i].split(":");
			resultMap.put(result[0], result[1]);
		}
	    
	    // access-token to user info
	    headers = new HttpHeaders();
	    headers.set("Authorization", "Bearer " + resultMap.get("access_token"));
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

	    params = new LinkedMultiValueMap<>();
	    request = new HttpEntity<>(params, headers);

	    url = "https://kapi.kakao.com/v2/user/me";
	    
	    String userInfo=restTemplate.postForObject(url, request, String.class);
	    
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(userInfo);
        
        JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
        JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
        
        String id= element.getAsJsonObject().get("id").getAsString();
        String nickname = properties.getAsJsonObject().get("nickname").getAsString();
        String profileImage = properties.getAsJsonObject().get("profile_image").getAsString();
        String thumbnailImage = properties.getAsJsonObject().get("thumbnail_image").getAsString();
//        String email = kakao_account.getAsJsonObject().get("email").getAsString();
        
        User kakaoUser= new User();
//        kakaoUser.setuId(email);
        kakaoUser.setuId(id);
        kakaoUser.setuName(nickname);
        kakaoUser.setuPassword(resultMap.get("access_token"));
        return kakaoUser;
	}

	@Override
	public User deleteUser(String uId) throws Exception {
		userRepository.deleteByuId(uId);
		return userRepository.findByuId(uId);
	}

	@Override
	public User updateKakaoUser(User kakaoUser) {
		return userRepository.save(kakaoUser);
	}

	@Override
	public String kakaoUserLogout(String access_token) {
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	    headers.set("Authorization", "Bearer " + access_token);
	    
	    LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

	    String url = "https://kapi.kakao.com/v1/user/logout";
	    
	    String result = restTemplate.postForObject(url, request, String.class);
		System.out.println(result);
		
		return result;
	}
}
