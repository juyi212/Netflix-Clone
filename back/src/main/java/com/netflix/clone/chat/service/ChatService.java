package com.netflix.clone.chat.service;

import java.util.List;

import com.netflix.clone.repository.dto.Chatroom;

public interface ChatService {

	Chatroom createChatroom(Chatroom chatroom) throws Exception;

	Chatroom findChatroombyRoomId(String roomId);

	List<Chatroom> findAllRoom();
}
