package com.Marriage_planner.Marriage_planner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Marriage_planner.Marriage_planner.model.ResponseDTO;
import com.Marriage_planner.Marriage_planner.model.Review;
import com.Marriage_planner.Marriage_planner.model.Vendor;
import com.Marriage_planner.Marriage_planner.model.VendorList;
import com.Marriage_planner.Marriage_planner.repo.vendorRepo;
import com.Marriage_planner.Marriage_planner.services.VendorService;

@RestController
public class vendorController {

    @Autowired
    private vendorRepo vRepo;

    @Autowired
    private VendorService vs;

    @GetMapping("/vendors")
    public List<VendorList> getVendors(){
        return vs.getAllVendorList();
    }

    @GetMapping("/vendor/{email}")
    public Vendor getVender(@PathVariable String email){
        Vendor v = vRepo.findByEmail(email);

        return v;
    }

    @PostMapping("/addVendorData")
    public ResponseEntity<ResponseDTO<Vendor>> addVenderData(@RequestBody Vendor vender){
        try {
            
            // System.out.println(vender.getBusinessName());
            Vendor savedVender = vRepo.save(vender);
    
            ResponseDTO<Vendor> responseDto = new ResponseDTO<Vendor>(HttpStatus.OK, "Vender data added successfully", savedVender);
            return new ResponseEntity<>(responseDto,HttpStatus.OK);
        } catch (Exception e) {
            ResponseDTO<Vendor> responseDto = new ResponseDTO<Vendor>(HttpStatus.INTERNAL_SERVER_ERROR, "Vender data not added", null);
            return new ResponseEntity<>(responseDto,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reviews")
    public List<Review> getAllReviews(){
        return vs.getAllReviewa();
    }
}
