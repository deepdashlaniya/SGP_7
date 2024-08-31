package com.Marriage_planner.Marriage_planner.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Marriage_planner.Marriage_planner.model.Review;
import com.Marriage_planner.Marriage_planner.model.Vendor;
import com.Marriage_planner.Marriage_planner.model.VendorList;
import com.Marriage_planner.Marriage_planner.repo.ReviewRepo;
import com.Marriage_planner.Marriage_planner.repo.vendorRepo;

@Service
public class VendorService {

    @Autowired
    private vendorRepo vRepo;

    @Autowired
    private ReviewRepo rRepo;

    public List<VendorList> getAllVendorList(){
        List<Vendor> vendors = vRepo.findAll();

        return vendors.stream().map(vendor -> {
            VendorList vendorList = new VendorList();

            vendorList.setId(vendor.getId());
            vendorList.setOwnerName(vendor.getOwnerName());
            vendorList.setBusinessName(vendor.getBusinessName());
            vendorList.setBusinessType(vendor.getBusinessType());
            vendorList.setAddress1(vendor.getAddress1());
            vendorList.setAddress2(vendor.getAddress2());
            vendorList.setCity(vendor.getCity());
            vendorList.setState(vendor.getState());
            vendorList.setEmail(vendor.getEmail());
            vendorList.setMobileNo(vendor.getMobileNo());
            vendorList.setImages(vendor.getImages());
            vendorList.setDescription(vendor.getDescription());
            vendorList.setSize(vendor.getSize());
            vendorList.setRent(vendor.getRent());
            vendorList.setFacilities(vendor.getFacilities());
            vendorList.setStatus(vendor.isStatus());
            vendorList.setAverageRating(rRepo.avgrRatingByVendorId(vendorList.getId()) != null ? rRepo.avgrRatingByVendorId(vendorList.getId()) : 0.0f);
            vendorList.setReviewCount(rRepo.countReviewByVendorId(vendorList.getId()));       // Set a default value
            return vendorList;
        }).collect(Collectors.toList());
    }

    public List<Review> getAllReviewa() {
        return rRepo.findAll();
    }
}
