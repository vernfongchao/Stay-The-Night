import React from 'react'
import * as FAIcons from 'react-icons/fa'
// FaRegArrowAltCircleLeft
// FaRegArrowAltCircleRight

const CarouselButtons = ({ moveSlide, direction }) => {
    return (
        (direction === "next") ?
            (<FAIcons.FaRegArrowAltCircleRight className={direction === "next" ? 'carousel-button next' : "carousel-button prev"}
                onClick={moveSlide}
            />)
            : (<FAIcons.FaRegArrowAltCircleLeft className={direction === "next" ? 'carousel-button next' : "carousel-button prev"}
                onClick={moveSlide}
            />)

    )
}


export default CarouselButtons