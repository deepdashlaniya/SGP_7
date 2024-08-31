package com.Marriage_planner.Marriage_planner.model;

import java.io.Serializable;
import java.util.Objects;

public class ReviewId implements Serializable {
    private int userId;
    private int vendorId;

    // Default constructor
    public ReviewId() {
    }

    // Constructor with fields
    public ReviewId(int userId, int vendorId) {
        this.userId = userId;
        this.vendorId = vendorId;
    }

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    // Override hashCode and equals
    @Override
    public int hashCode() {
        return Objects.hash(userId, vendorId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ReviewId that = (ReviewId) obj;
        return userId == that.userId && vendorId == that.vendorId;
    }
}
