package com.netflix.clone.repository.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.netflix.clone.repository.dto.UserZzim;

@Transactional
public interface UserZzimRepository extends JpaRepository<UserZzim, Long> {

	List<UserZzim> findBymovieId(int id);

	List<UserZzim> findByuserNo(int userNo);
	
	
}
