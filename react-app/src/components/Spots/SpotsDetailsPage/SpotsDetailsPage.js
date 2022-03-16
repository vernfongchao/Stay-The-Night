import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SpotsDetailsPage = () => {
    const { id } = useParams ()
    console.log(id)
    const spots = useSelector(state => state.spots)
    const spot = spots[id]
    console.log(spot)
    
    useEffect(() =>{
        window.scrollTo(0, 0)
    },[])


    return(
        <div className="details-page-container">
            <div>
                <h3>{spot.name}</h3>
            </div>
            <div>
                <p>{spot.address}</p>
                <p>{spot.city}</p>
                <p>{spot.state}</p>
                <p>{spot.country}</p>
            </div>
            <img src={spot?.images[0]}>
            </img>
            <div>
                <h3>Hosted By: {spot.first} {spot.last}</h3>
            </div>
            <div>
                <p>{spot.guest} Guests</p>
                <p>{spot.bathroom} Bathrooms</p>
                <p>{spot.bedroom} Bedrooms</p>
            </div>
            <div>
                <p>{spot.description}</p>
            </div>
        </div>
    )
}

export default SpotsDetailsPage