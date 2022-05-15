package com.netflix.clone.repository.mapper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.netflix.clone.repository.dto.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long>{

	User findByuId(String uId);

	User findByuName(String uName);

	void deleteByuId(String uId);

	User findByuNo(int uNo);

}
