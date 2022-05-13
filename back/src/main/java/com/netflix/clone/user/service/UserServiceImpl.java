package com.netflix.clone.user.service;

import java.util.Arrays;

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
	public User login(User user) throws Exception {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                new UserAccount(user),
                user.getuPassword(),
//                List.of(new SimpleGrantedAuthority("ROLE_USER")));
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
        SecurityContextHolder.getContext().setAuthentication(token);
        User check=userRepository.findByuId(user.getuId());
        if(passwordEncoder.matches(user.getuPassword(), check.getuPassword())) {
        	System.out.println(token);
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
}
