package com.netflix.clone.user.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.netflix.clone.repository.dto.User;
import com.netflix.clone.repository.dto.UserAccount;
import com.netflix.clone.repository.mapper.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
	
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
	
	/* 일반 로그인 */
	@Override
	public Map<String,Object> login(User user) throws Exception {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                new UserAccount(user),
                user.getuPassword(),
//                List.of(new SimpleGrantedAuthority("ROLE_USER")));
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
        SecurityContextHolder.getContext().setAuthentication(token);
        User check=userRepository.findByuId(user.getuId());
		Map<String, Object> resultMap = new HashMap<>();
        if(passwordEncoder.matches(user.getuPassword(), check.getuPassword())) {
        	System.out.println(token);
        	resultMap.put("user", user);
        	resultMap.put("token", token);
        	return resultMap;
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
}
