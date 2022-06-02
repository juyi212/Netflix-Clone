package com.netflix.clone.repository.mapper;

import com.netflix.clone.repository.dto.UserZzim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserZzimRepository extends JpaRepository<UserZzim, Long> { }
