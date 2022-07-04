package com.netflix.clone.repository.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.netflix.clone.repository.dto.UserZzim;

@Transactional
public interface UserZzimRepository extends JpaRepository<UserZzim, Long> {

	List<UserZzim> findBymovieId(int id);

	List<UserZzim> findByuserNo(int userNo);

	@Query(value = "select distinct uz.* from user_zzim uz where uz.movie_id = :movieId and uz.user_no = :userNo", nativeQuery = true)
	UserZzim findByUserNoAndZzim(@Param(value = "movieId") int movieId, @Param(value = "userNo") int userNo);
	
}
