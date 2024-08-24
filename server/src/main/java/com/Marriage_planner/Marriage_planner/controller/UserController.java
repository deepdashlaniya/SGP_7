package com.Marriage_planner.Marriage_planner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Marriage_planner.Marriage_planner.model.User;
import com.Marriage_planner.Marriage_planner.services.MyUserDetailsService;
import com.Marriage_planner.Marriage_planner.services.userService;

@RestController
@CrossOrigin()
public class UserController {
	
	
	@Autowired
	public userService service;
	public MyUserDetailsService userService;
	
	@RequestMapping("/login")
	public String home(@RequestBody User user) {
		return service.Verify(user);
	}
	
	
	@PostMapping("/register")
	public User getRegister(@RequestBody User user) {
		return service.Register(user);
	}

	@GetMapping("/check")
	public String check(){
		return "done";
	}
	
}
