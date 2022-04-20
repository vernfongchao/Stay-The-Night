import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Amenities from '../Amenities';

import { motion } from 'framer-motion/dist/framer-motion'

import './SpotsPage.css'

const SpotsPage = () => {
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots).reverse()


    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }

    return (
        <motion.div className='spots-page-container'
            >
            {spotsArr?.map(spot => (
                <div key={spot.id} className='each-spot-container'>
                    <Link to={`/spots/${spot.id}`} spot={spot} id={`image-spots-${spot.id}`}>
                        <img className="each-spot-image" onError={handleImage} src={spot.images[0]?.image} alt={`spots #${spot.id}`}>
                        </img>
                    </Link>
                    <div className='each-spot-details-container'>
                        <h3 className='each-spot-name'>{spot.name}</h3>
                        <div className='each-spot-basic-info'>
                            <div>
                                <p>Guests: {spot.guest} </p>
                            </div>
                            <div>
                                <p>Bedrooms: {spot.bedroom} </p>
                            </div>
                            <div>
                                <p>Bathrooms:{spot.bathroom} </p>
                            </div>
                        </div>
                        <span className='each-spot-amenities-header'>Amenities</span>

                        {spot.amenities.length && <Amenities amenities={spot.amenities} />}
                        <div className='each-spot-price'>
                            <p>${spot.price}/ Night</p>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

export default SpotsPage