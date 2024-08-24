package com.Marriage_planner.Marriage_planner.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Marriage_planner.Marriage_planner.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{

	User findByEmail(String email);
}
