package com.houses.common.model;

import javax.validation.constraints.NotNull;

import com.houses.common.BaseDao;

public class User extends BaseDao {
	
	private int id;
	@NotNull(message = "用户名不能为空")
	private String user;
	@NotNull(message = "密码不能为空")
	private String pass;
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

}