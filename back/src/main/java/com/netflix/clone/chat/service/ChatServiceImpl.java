package com.netflix.clone.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.netflix.clone.repository.dto.Chatroom;
import com.netflix.clone.repository.mapper.ChatroomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

	private final ChatroomRepository chatroomRepository;
	
	@Override
	public Chatroom createChatroom(Chatroom chatroom) throws Exception{
		return chatroomRepository.save(chatroom);
	}

	@Override
	public Chatroom findChatroombyRoomId(String roomId) {
		// TODO Auto-generated method stub
		return chatroomRepository.findByroomId(roomId);
	}

	@Override
	public List<Chatroom> findAllRoom() {
		// TODO Auto-generated method stub
		return chatroomRepository.findAll();
	}

}
