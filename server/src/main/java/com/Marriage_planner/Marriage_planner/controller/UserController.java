package com.Marriage_planner.Marriage_planner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Marriage_planner.Marriage_planner.model.ResponseDTO;
import com.Marriage_planner.Marriage_planner.model.ResponseUser;
import com.Marriage_planner.Marriage_planner.model.User;
import com.Marriage_planner.Marriage_planner.model.Vender;
import com.Marriage_planner.Marriage_planner.repo.venderRepo;
import com.Marriage_planner.Marriage_planner.services.MyUserDetailsService;
import com.Marriage_planner.Marriage_planner.services.userService;

@RestController
@CrossOrigin()
public class UserController {
	
	
	@Autowired
	public userService service;
	public MyUserDetailsService userService;
	
	@PostMapping("/login")
	public ResponseEntity<ResponseDTO<ResponseUser>> home(@RequestBody User user) {
		return service.Verify(user);
	}
	
	
	@PostMapping("/register")
	public ResponseEntity<ResponseDTO<User>> getRegister(@RequestBody User user) {
		return service.Register(user);
	}

	@GetMapping("/check")
	public String check(){
		return "done";
	}
	
}
