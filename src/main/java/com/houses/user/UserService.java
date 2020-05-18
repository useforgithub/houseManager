package com.houses.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.houses.common.dto.PageDto;
import com.houses.common.model.User;
import com.houses.common.vo.HouseMainInfoVo;
import com.houses.dao.UserDao;
import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

@Service
public class UserService {
	// 自动注入一个userDao
	@Autowired
	private UserDao userDao;

	// 新增用户
	public int register(@Valid User user) {
//        System.out.println(user.getUser());
		User x = userDao.getUser(user.getUser());
		// 判断用户是否存在
		if (x == null) {
			userDao.setUser(user);
			return 0;
		} else {
			System.out.println("用户已注册");
			System.out.println(user.getUser());
			System.out.println(user.getPass());
			return 1;
		}
	}

	// 用户登陆逻辑
	public String login(@Valid User user) {
		// 通过用户名获取用户
		User dbUser = userDao.getUser(user.getUser());

		// 若获取失败
		if (dbUser == null) {
			return "登陆失败";
		}
		// 获取成功后，将获取用户的密码和传入密码对比
		else if (!dbUser.getPass().equals(user.getPass())) {
			return "登陆失败";
		} else {
			// 若密码也相同则登陆成功
			// 让传入用户的属性和数据库保持一致
			user.setId(dbUser.getId());
			return "登陆成功";
		}
	}

	// 修改密码逻辑
	public int changePass(@Valid User user) {
//        System.out.println(user.getUser());
		User x = userDao.getUser(user.getUser());
		// 判断用户是否存在
		if (x == null) {
			return 1;
		} else {
			userDao.changePass(user);
			return 0;
		}
	}

	public PageDto<List<User>> queryUsers(User user) {
		PageDto<List<User>> pageDto = new PageDto<>();

		Integer count = userDao.queryUsersCount();

		user.setStart((user.getPage() - 1) * user.getLimit());

		List<User> userVoList = userDao.queryUsersPaged(user);

		pageDto.setCount(count);
		pageDto.setData(userVoList);
		return pageDto;
	}

	public int deleteUserById(int id) {
//      System.out.println(user.getUser());
		if(userDao.deleteUserById(id)) {
			return 0;
		}else {
			return 1;
		}
	}
	
	public String getUserById(int id) {
//      System.out.println(user.getUser());
		return userDao.getUserById(id); 
	}
}
