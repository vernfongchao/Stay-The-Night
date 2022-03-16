import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const SpotsPage = () => {
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)

    return (
        <div>
            {spotsArr?.map(spot => (
                <div key ={spot.id}>
                    {console.log(spot)}
                    <Link to={`/spots/${spot.id}`} spot={spot}>
                        <img src={spot.images[0]} alt={`spots #${spot.id}`}>
                        </img>
                    </Link>
                </div>
            ))
            }
        </div>
    )
}

export default SpotsPage