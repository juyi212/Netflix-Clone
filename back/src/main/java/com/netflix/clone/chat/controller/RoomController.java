package com.netflix.clone.chat.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.clone.chat.service.ChatService;
import com.netflix.clone.repository.dto.Chatroom;

@RestController
@RequestMapping("/chat")
public class RoomController {

	@Autowired
	private ChatService chatService;
	
    //채팅방 목록 조회
    @GetMapping("/allrooms")
    public List<Chatroom> rooms(){

    	List<Chatroom> roomList=new ArrayList<>();
    	roomList=chatService.findAllRoom();
        return roomList;
    }

    //채팅방 개설
    @GetMapping("/createroom")
    public ResponseEntity<Chatroom> create(String roomName) throws Exception{

    	Chatroom cr=new Chatroom();
    	cr.setRoomName(roomName);
    	cr.setRoomId(UUID.randomUUID().toString());
    	Chatroom result=new Chatroom();
    	result=chatService.createChatroom(cr);
        return new ResponseEntity<Chatroom>(result, HttpStatus.NO_CONTENT);
    }

    //채팅방 조회
    @GetMapping("/findroom")
    public ResponseEntity<?> getRoom(String roomId){
    	
    	Chatroom result=new Chatroom();
    	result=chatService.findChatroombyRoomId(roomId);
    	
    	return new ResponseEntity<Chatroom>(result, HttpStatus.NO_CONTENT);
    }
}
