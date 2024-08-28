package com.Marriage_planner.Marriage_planner.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Marriage_planner.Marriage_planner.model.User;
import com.Marriage_planner.Marriage_planner.model.Vender;

@Repository
public interface venderRepo extends JpaRepository<Vender,Integer>{
    Vender findByEmail(String email);
}
