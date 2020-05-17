package com.houses.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.houses.common.model.User;

//这个注解代表这是一个mybatis的操作数据库的类
@Repository
public interface UserDao {

	// 根据user获得一个User类
	@Select("select * from admin where user=#{user}")
	User getUser(String user);

	// 插入一个User
	@Insert("insert into admin (user,pass) values(#{user},#{pass})")
	boolean setUser(User user);

	// 修改密码
	@Insert("update admin set pass=#{pass} where user=#{user}")
	boolean changePass(User user);

	@Select("SELECT id,user FROM admin order by id desc limit #{start}, #{limit}")
	List<User> queryUsersPaged(User user);

	@Select("select count(*) from admin")
	Integer queryUsersCount();



}