import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditDeleteModal from "../EditDeleteSpotModal";
import DisplayReviews from "../../Reviews/DisplayReviews/DisplayReviews";
import CreateReviewModal from '../../Reviews/CreateReviewModal'
import './SpotsDetails.css'

const SpotsDetailsPage = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const reviews = Object.values(useSelector(state => state.reviews))
    
    const filterReviews = reviews.filter(({spot_id}) => spot_id === +id) 
    console.log(filterReviews)



    const spot = spots[id]


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleImage = (e) => {
        e.target.src = "https://i.gyazo.com/675f7585181d00e0dfc6f2654c8e2969.jpg"

    }

    return (
        <div className="details-page-container">
            <div>
                <h3>{spot?.name}</h3>
                {user?.id === spot?.user_id && <EditDeleteModal />}
            </div>
            <div>
                <p>{}</p>
                <p>{spot?.address}</p>
                <p>{spot?.city}</p>
                <p>{spot?.state}</p>
                <p>{spot?.country}</p>
            </div>
            {spot?.images.map(({ image }) => (
                <img src={image} onError={handleImage}>
                </img>
            ))}
            <div>
                <h3>Hosted By: {spot?.first} {spot?.last}</h3>
            </div>
            <div>
                <p>{spot?.guest} Guests</p>
                <p>{spot?.bathroom} Bathrooms</p>
                <p>{spot?.bedroom} Bedrooms</p>
                <div>
                    <p>{spot?.price}</p>
                </div>
            </div>
            <div>
                <p>{spot?.description}</p>
            </div>
            <div>
                <h3>Reviews</h3>
                {user && spot?.user_id !== user?.id && <CreateReviewModal />}
            </div>
            <DisplayReviews />
        </div>
    )
}

export default SpotsDetailsPage