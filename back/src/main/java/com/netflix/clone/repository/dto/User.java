package com.netflix.clone.repository.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@EqualsAndHashCode(of = "uNo")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class User {

	@Id // Primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uNo; // 시퀀스, auto_increment
	@Column(nullable = false, length = 100)
	private String uId;
	@Column(nullable = false, length = 100)
	private String uPassword;
	@Column(nullable = false, length = 100)
	private String uName;
	
	@ColumnDefault("'0'")
	private String uPayYn;
	
	private LocalDateTime uJoinDate;
	
	@ColumnDefault("'normal'")
	private String uProvider;
	
	private String uAuthKey;
	private LocalDateTime uAuthKeyGeneratedAt;
    
	public void generateEuAuthKey() {
		this.uAuthKey = UUID.randomUUID().toString();
		this.uAuthKeyGeneratedAt = LocalDateTime.now();
		this.uJoinDate = LocalDateTime.now();
	}
	public int getuNo() {
		return uNo;
	}
	public void setuNo(int uNo) {
		this.uNo = uNo;
	}
	public String getuPassword() {
		return uPassword;
	}
	public void setuPassword(String uPassword) {
		this.uPassword = uPassword;
	}
	public String getuName() {
		return uName;
	}
	public void setuName(String uName) {
		this.uName = uName;
	}

	public String getuProvider() {
		return uProvider;
	}
	public void setuProvider(String uProvider) {
		this.uProvider = uProvider;
	}

	public String getuId() {
		return uId;
	}
	public void setuId(String uId) {
		this.uId = uId;
	}
	public String getuPayYn() {
		return uPayYn;
	}
	public void setuPayYn(String uPayYn) {
		this.uPayYn = uPayYn;
	}
	public LocalDateTime getuJoinDate() {
		return uJoinDate;
	}
	public void setuJoinDate(LocalDateTime uJoinDate) {
		this.uJoinDate = uJoinDate;
	}
	public String getuAuthKey() {
		return uAuthKey;
	}
	public void setuAuthKey(String uAuthKey) {
		this.uAuthKey = uAuthKey;
	}
	public LocalDateTime getuAuthKeyGeneratedAt() {
		return uAuthKeyGeneratedAt;
	}
	public void setuAuthKeyGeneratedAt(LocalDateTime uAuthKeyGeneratedAt) {
		this.uAuthKeyGeneratedAt = uAuthKeyGeneratedAt;
	}
}
