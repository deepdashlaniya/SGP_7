'use client'

import React from 'react'
import HeaderOne from '@/components/Header/HeaderOne'
import SliderOne from '@/components/Slider/SliderOne'
import LocationOne from '@/components/Location/LocationOne'
import CategoryOne from '@/components/Category/CategoryOne'
import Amenities from '@/components/Amenities/Amenities'
import Testimonial from '@/components/Testimonial/Testimonial'
import dataTestimonial from '@/data/Testimonial.json'
import Footer from '@/components/Footer/Footer'

const Home = () => {
  return (
    <>
      <div className="page-one overflow-x-hidden">
        <HeaderOne />
        <SliderOne />
        <LocationOne />
        <CategoryOne />
        <Amenities />
        <Testimonial data={dataTestimonial} />

        <Footer />
      </div>
    </>
  )
}

export default Home
