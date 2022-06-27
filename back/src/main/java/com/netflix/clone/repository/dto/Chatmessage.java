package com.netflix.clone.repository.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chatmessage")
@Getter
@Setter
public class Chatmessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Integer id;
    
    @Column(name = "room_id")
    private Integer roomId;
    
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "message")
    private String message;

}