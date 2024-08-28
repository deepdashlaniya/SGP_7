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
import com.Marriage_planner.Marriage_planner.model.Vender;
import com.Marriage_planner.Marriage_planner.repo.venderRepo;

@RestController
public class venderController {

    @Autowired
    private venderRepo vRepo;

    @GetMapping("/venders")
    public List<Vender> getVenders(){
        return vRepo.findAll();
    }

    @GetMapping("/vender/{email}")
    public Vender getVender(@PathVariable String email){
        Vender v = vRepo.findByEmail(email);

        return v;
    }

    @PostMapping("/addVenderData")
    public ResponseEntity<ResponseDTO<Vender>> addVenderData(@RequestBody Vender vender){
        try {
            
            // System.out.println(vender.getBusinessName());
            Vender savedVender = vRepo.save(vender);
    
            ResponseDTO<Vender> responseDto = new ResponseDTO<Vender>(HttpStatus.OK, "Vender data added successfully", savedVender);
            return new ResponseEntity<>(responseDto,HttpStatus.OK);
        } catch (Exception e) {
            ResponseDTO<Vender> responseDto = new ResponseDTO<Vender>(HttpStatus.INTERNAL_SERVER_ERROR, "Vender data not added", null);
            return new ResponseEntity<>(responseDto,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
