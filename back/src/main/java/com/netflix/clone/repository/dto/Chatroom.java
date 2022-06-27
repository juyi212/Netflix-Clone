package com.netflix.clone.repository.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chatroom")
@Getter
@Setter
public class Chatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private String roomId;

    private Set<WebSocketSession> sessions = new HashSet<>();
    //WebSocketSession은 Spring에서 Websocket Connection이 맺어진 세션

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_url")
    private String imageUrl;


    public static Chatroom create(String name){
    	Chatroom room = new Chatroom();

        room.roomId = UUID.randomUUID().toString();
        room.roomName = name;
        return room;
    }

}