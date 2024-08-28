package com.Marriage_planner.Marriage_planner.services;

import org.aspectj.apache.bcel.generic.RET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Marriage_planner.Marriage_planner.model.ResponseDTO;
import com.Marriage_planner.Marriage_planner.model.ResponseUser;
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
	
	public ResponseEntity<ResponseDTO<User>> Register(User user) {
		try {
			user.setPassword(encoder.encode(user.getPassword()));
			User savedUser = userRepo.save(user);

			if(savedUser.getEmail() != ""){
				ResponseDTO<User> responseDto = new ResponseDTO<>(HttpStatus.OK,"Registation Sucessfully...",null);
				return new ResponseEntity<>(responseDto,HttpStatus.OK);
			}else{
				ResponseDTO<User> responseDto = new ResponseDTO<>(HttpStatus.BAD_REQUEST,"Registation unsucessfully...",null);
				return new ResponseEntity<>(responseDto,HttpStatus.BAD_REQUEST);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			ResponseDTO<User> responseDto = new ResponseDTO<>(HttpStatus.BAD_REQUEST,"Registation unsucessfully..." + e.getMessage(),null);
			return new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
		}

		
	}


	public ResponseEntity<ResponseDTO<ResponseUser>> Verify (User user){

		try {
			
			Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
	
			ResponseUser response = new ResponseUser();
			if(authentication.isAuthenticated()){
				String token = jwtService.generateToken(user.getEmail());
	
				User newUser = userRepo.findByEmail(user.getEmail());
				response.setFirstname(newUser.getFirstName());
				response.setLastname(newUser.getLastName());
				response.setEmail(user.getEmail());
				response.setToken(token);
				
				ResponseDTO<ResponseUser> responseDto = new ResponseDTO<>(HttpStatus.OK,"Login Sucessfull",response);
				return new ResponseEntity<>(responseDto,HttpStatus.OK);
			}
			ResponseDTO<ResponseUser> responseDto = new ResponseDTO<>(HttpStatus.BAD_REQUEST,"Login unsucessfully...",null);
			return new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);

		} catch (Exception e) {
			ResponseDTO<ResponseUser> responseDto = new ResponseDTO<>(HttpStatus.BAD_REQUEST,"Login unsucessfully..." + e.getMessage(),null);
			return new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
		}
	}
}
