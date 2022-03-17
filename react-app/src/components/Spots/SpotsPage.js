import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const SpotsPage = () => {
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)

    // const [errorImage,setErrorImage] = useState("")
    
    const handleImage = (e) => {
        e.target.src="../../../images/image-not-found-scaled.png"
        // setErrorImage("../../../images/image-not-found-scaled.png")
    }

    return (
        <div>
            {spotsArr?.map(spot => (
                <div key ={spot.id}>
                    <Link to={`/spots/${spot.id}`} spot={spot} id = {`image-spots-${spot.id}`}>
                        <img onError={handleImage} src={spot.images[0].image} alt={`spots #${spot.id}`}>
                        </img>
                    </Link>
                </div>
            ))
            }
        </div>
    )
}

export default SpotsPage