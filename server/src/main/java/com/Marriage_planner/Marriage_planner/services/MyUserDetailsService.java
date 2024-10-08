package com.Marriage_planner.Marriage_planner.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Marriage_planner.Marriage_planner.model.User;
//import com.Marriage_planner.Marriage_planner.model.User;
import com.Marriage_planner.Marriage_planner.model.userPrincipal;
import com.Marriage_planner.Marriage_planner.repo.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{

	
	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		User user = userRepo.findByEmail(email);
		if(user == null) {
			System.out.println("User Not found");
			throw new UsernameNotFoundException("User not found");
		}
		
		return new userPrincipal(user);
	}
	
}
