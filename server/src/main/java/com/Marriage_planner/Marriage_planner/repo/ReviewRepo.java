package com.Marriage_planner.Marriage_planner.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Marriage_planner.Marriage_planner.model.Review;
import com.Marriage_planner.Marriage_planner.model.ReviewId;


@Repository
public interface ReviewRepo extends JpaRepository<Review,ReviewId>{

    @Query("SELECT COUNT(r) FROM Review r WHERE r.vendorId = :vendorId")
    public int countReviewByVendorId(@Param("vendorId") int vendorId);

    @Query("Select avg(rating) from Review r where r.vendorId = :vendorId")
    public Float avgrRatingByVendorId(@Param("vendorId") int vendorId);
}
