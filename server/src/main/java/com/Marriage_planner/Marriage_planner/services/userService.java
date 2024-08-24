package com.Marriage_planner.Marriage_planner.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Marriage_planner.Marriage_planner.model.User;
import com.Marriage_planner.Marriage_planner.repo.UserRepo;

@Service
public class userService {

	@Autowired
	private UserRepo userRepo; 

	@Autowired
	AuthenticationManager authManager;

	@Autowired
	private JWTService jwtService;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	public User Register(User user) {

		user.setPassword(encoder.encode(user.getPassword()));
		return userRepo.save(user);
	}


	public String Verify (User user){
		Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

		if(authentication.isAuthenticated()){
			return jwtService.generateToken(user.getEmail());
		}
		return "fail";
	}
}
