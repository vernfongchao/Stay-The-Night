import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

import './SpotsPage.css'

const SpotsPage = () => {
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)

    // const [errorImage,setErrorImage] = useState("")

    const handleImage = (e) => {
        e.target.src = "https://i.gyazo.com/675f7585181d00e0dfc6f2654c8e2969.jpg"
        // setErrorImage("../../../images/image-not-found-scaled.png")
    }

    return (
        <div className='spots-page-container'>
            {spotsArr?.map(spot => (
                <div key={spot.id} className='each-spot-container'>
                    <Link to={`/spots/${spot.id}`} spot={spot} id={`image-spots-${spot.id}`}>
                        <img className="each-spot-image" onError={handleImage} src={spot.images[0].image} alt={`spots #${spot.id}`}>
                        </img>
                    </Link>
                    <div className='each-spot-details-container'>
                        <h3 className='each-spot-name'>{spot.name}</h3>
                        <div className='each-spot-basic-info'>
                            <p>Guests: {spot.guest} </p>
                            <p>Bedrooms: {spot.bedroom} </p>
                            <p>Bathrooms:{spot.bathroom} </p>
                        </div>
                        <div className='each-spot-price'>
                            <p>${spot.price}/ Night</p>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default SpotsPage