package com.netflix.clone.repository.mapper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.netflix.clone.repository.dto.Chatroom;
import com.netflix.clone.repository.dto.User;

@Transactional
public interface ChatroomRepository  extends JpaRepository<Chatroom, Long>{
	
	Chatroom findByroomId(String roomId);

}
