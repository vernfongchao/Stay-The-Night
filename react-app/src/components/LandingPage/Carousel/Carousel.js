import React, { useState, useEffect } from "react";
// import CarouselButtons from "./CarouselButtons";

import * as IoIcons from 'react-icons/io5'

// import { IoRadioButtonOnOutline } from 'react-icons/io5'


const Carousel = () => {

    const handleError = (e) => {
        e.target.src = "https://i.gyazo.com/675f7585181d00e0dfc6f2654c8e2969.jpg"
    }

    const [slideIndex, setSlideIndex] = useState(1)
    useEffect(() => {
        console.log(slideIndex)
        let timer = setInterval(() => setSlideIndex(slideIndex + 1), 3000)
        if (slideIndex > 4) {
            setSlideIndex(1)
        }

        return () => {
            clearInterval(timer)
        }
    }, [slideIndex])

    // const nextSlide = () => {
    //     if (slideIndex >= 4) {
    //         setSlideIndex(1)
    //     } else {
    //         setSlideIndex(slideIndex + 1)
    //     }
    // }

    // const prevSlide = () => {
    //     if (slideIndex <= 1) {
    //         setSlideIndex(4)
    //     } else {
    //         setSlideIndex(slideIndex - 1)
    //     }
    // }

    return (
        <div className="landing-page-carousel-slider">
            {/* <div className="carousel-direction-button-container">
                <CarouselButtons moveSlide={prevSlide} direction={"prev"} />
                <CarouselButtons moveSlide={nextSlide} direction={"next"} />
            </div> */}
            <div className={slideIndex === 1 ? 'landing-page-slides slide-animation' : 'landing-page-slides'}>
                <img className="landing-image"
                    alt="House"
                    src="https://a0.muscache.com/im/pictures/miso/Hosting-46898793/original/f0d2a57a-c3af-417b-bd77-5594c86889e0.jpeg?im_w=1200"
                    onError={handleError}
                ></img>
            </div>
            <div className={slideIndex === 2 ? 'landing-page-slides slide-animation' : 'landing-page-slides'}>
                <img className="landing-image"
                    alt="House"
                    src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-13222447/original/01907cdf-4ce7-4b12-b449-53c32f28af45.jpeg?im_w=1200"
                    onError={handleError}
                ></img>
            </div>
            <div className={slideIndex === 3 ? 'landing-page-slides slide-animation' : 'landing-page-slides'}>
                <img className="landing-image"
                    alt="House"
                    src="https://a0.muscache.com/im/pictures/00370466-e3f6-4213-aaff-10b2a51a7e15.jpg?im_w=1200"
                    onError={handleError}
                ></img>
            </div>
            <div className={slideIndex === 4 ? 'landing-page-slides slide-animation' : 'landing-page-slides'}>
                <img className="landing-image"
                    alt="House"
                    src="https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/0ce8eafd-51a0-456a-b35c-cbe3a723be31?im_w=1440"
                    onError={handleError}
                ></img>
            </div>
            <div className="dots-container">
                {[...Array(4)].map((slide, i) => (
                    <div className="dot" onClick={() => setSlideIndex(i + 1)}>
                        {slideIndex === (i + 1) ? <IoIcons.IoRadioButtonOnSharp /> : <IoIcons.IoRadioButtonOffSharp />}
                    </div>
                ))}

            </div>

        </div>

    )

}

export default Carousel