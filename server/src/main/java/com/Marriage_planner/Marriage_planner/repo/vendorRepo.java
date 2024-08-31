package com.Marriage_planner.Marriage_planner.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Marriage_planner.Marriage_planner.model.User;
import com.Marriage_planner.Marriage_planner.model.Vendor;
import com.Marriage_planner.Marriage_planner.model.VendorList;

@Repository
public interface vendorRepo extends JpaRepository<Vendor,Integer>{
    Vendor findByEmail(String email);
}
