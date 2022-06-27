package com.netflix.clone.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.clone.repository.dto.Chatmessage;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/pub/chat/enter"
    @MessageMapping(value = "/chat/enter")
    public void enter(Chatmessage message){
        message.setMessage(message.getUserId() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping(value = "/chat/message")
    public void message(Chatmessage message){
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}