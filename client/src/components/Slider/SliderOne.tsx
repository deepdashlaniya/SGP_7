import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import tentData from "@/data/Tent.json";

import ImageSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface GuestType {
    adult: number;
    children: number;
    infant: number;
    pet: number;
}

const SliderOne = () => {
    const router = useRouter()
    const [openDate, setOpenDate] = useState(false)
    const [openGuest, setOpenGuest] = useState(false)
    const [location, setLocation] = useState('')
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const [guest, setGuest] = useState<GuestType>(
        {
            adult: 0,
            children: 0,
            infant: 0,
            pet: 0
        }
    );

    const handleOpenDate = () => {
        setOpenDate(!openDate)
        setOpenGuest(false)
    }

    const handleOpenGuest = () => {
        setOpenGuest(!openGuest)
        setOpenDate(false)
    }

    // Check if the click event occurs outside the popup.
    const handleClickOutsideDatePopup: EventListener = useCallback((event) => {
        // Cast event.target to Element to use the closest method.
        const targetElement = event.target as Element;

        if (openDate && !targetElement.closest('.form-date-picker')) {
            setOpenDate(false)
        }
    }, [openDate]);

    // Check if the click event occurs outside the popup.
    const handleClickOutsideGuestPopup: EventListener = useCallback((event) => {
        // Cast event.target to Element to use the closest method.
        const targetElement = event.target as Element;

        if (openGuest && !targetElement.closest('.sub-menu-guest')) {
            setOpenGuest(false)
        }
    }, [openGuest]);

    useEffect(() => {
        // Add a global click event to track clicks outside the popup.
        document.addEventListener('click', handleClickOutsideDatePopup);
        document.addEventListener('click', handleClickOutsideGuestPopup);

        // Cleanup to avoid memory leaks.
        return () => {
            document.removeEventListener('click', handleClickOutsideDatePopup);
            document.removeEventListener('click', handleClickOutsideGuestPopup);
        };
    }, [handleClickOutsideDatePopup, handleClickOutsideGuestPopup])


    // Increase number
    const increaseGuest = (type: keyof GuestType) => {
        setGuest((prevGuest) => ({
            ...prevGuest,
            [type]: prevGuest[type] + 1
        }));
    };

    // Decrease number
    const decreaseGuest = (type: keyof GuestType) => {
        if (guest[type] > 0) {
            setGuest((prevGuest) => ({
                ...prevGuest,
                [type]: prevGuest[type] - 1
            }));
        }
    };

    const handleSearch = () => {
        router.push(`/camp/topmap-grid?location=${location}&startDate=${state[0].startDate.toLocaleDateString()}&endDate=${state[0].endDate.toLocaleDateString()}&adult=${guest.adult}&children=${guest.children}&infant=${guest.infant}&pet=${guest.pet}`)
    }


    const settings = {
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        touchThreshold: 100,
        swipe: true,
        swipeToSlide: true,
        draggable: true,
        useTransform: false,
        centerMode: true,
        centerPadding: "300px",
        responsive: [
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: "24px",
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: "160px",
            },
          },
          {
            breakpoint: 1340,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 2000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      };

    return (
        <>
            <div className="slider-block style-one relative h-[620px]">
            <div className="list-img-detail overflow-hidden">
          <ImageSlider {...settings} className="h-full">
            {tentData[0].listImage.map((img, index) => (
              <div className="bg-img w-full aspect-[4/3]" key={index}>
                <Image
                  src={img}
                  width={3000}
                  height={3000}
                  alt={img}
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </ImageSlider>
        </div>

            </div>
        </>
    )
}

export default SliderOne