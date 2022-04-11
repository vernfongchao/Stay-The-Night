import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import EditDeleteModal from "../EditDeleteSpotModal";
import DisplayReviews from "../../Reviews/DisplayReviews/DisplayReviews";
import CreateReviewModal from '../../Reviews/CreateReviewModal'
import './SpotsDetails.css'

const SpotsDetailsPage = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const reviews = Object.values(useSelector(state => state.reviews))

    if (spots[id] === undefined) {
        history.push('/404-Page-Not-Found')
    }

    const filterReviews = reviews.filter(({ spot_id }) => spot_id === +id)

    let sum = 0;
    filterReviews.forEach(({ rating }) => {
        sum += rating
    })

    const reviewsAvg = sum / filterReviews.length

    let roundedAvg = Math.round(reviewsAvg * 100) / 100


    if (Number.isNaN(roundedAvg)) {
        roundedAvg = "Unrated"
    }


    const spot = spots[id]


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }

    return (
        <div className="details-spot-page-container">

            <div className="details-spot-page-title">
                <h1 className="details-spot-page-name">{spot?.name}</h1>
                {user?.id === spot?.host_id && <EditDeleteModal />}
            </div>

            <div className="details-spot-address-detail-container">
                <p className="details-page-star-text"><i className="fa-solid fa-star"></i>{roundedAvg}</p>
                <p className="details-page-review-text">
                    <li className="details-page-title-bullet">
                        <span>
                            {filterReviews.length} {filterReviews.length === 1 ? 'Review' : 'Reviews'}
                        </span>
                    </li>
                </p>
                <div className="details-spot-address-detail">
                    <p className="first-name">{spot?.address}, {spot?.city}, {spot?.state}, {spot?.country}</p>
                </div>
            </div>

            <div className="details-page-image-grid">
                {spot?.images.map(({ image }, index) => (
                    <img className={`details-page-image-${index}`} src={image} onError={handleImage} key={index} alt="house">
                    </img>
                ))}
            </div>

            <div>
                <h2>Hosted By: <span className="first-name">{spot?.first} {spot?.last} </span> </h2>
            </div>

            <div className="details-page-house-details">
                <p >{spot?.guest === 1 ? `${spot?.guest} Guest` : `${spot?.guest} Guests`} {spot?.bathroom === 1 ? `${spot?.bathroom} Bathroom` : `${spot?.bathroom} Bathrooms`}  {spot?.bedroom === 1 ? `${spot?.bedroom} Bedroom` : `${spot?.bedroom} Bedrooms`} 
                </p>
                <div>
                    <p className="details-page-price-text">${spot?.price}/ Night</p>
                </div>
            </div>

            <div className="details-page-description-container">
                <h2>Description</h2>
                <p className="details-page-description-text">{spot?.description}</p>
            </div>

            <div className="details-page-header-container">
                <div className="details-page-header-title">
                    <h2 className="details-page-start-text"><i className="fa-solid fa-star"></i> {roundedAvg} </h2>
                    <h2 className="details-page-review-title-text">
                        <li className="details-page-review-title-bullet">
                            <span>
                                {filterReviews.length} {filterReviews.length === 1 ? 'Review' : 'Reviews'}
                            </span>
                        </li>
                    </h2>
                </div>
                {user && spot?.host_id !== user?.id && <CreateReviewModal />}
            </div>

            {filterReviews.length > 0 && <DisplayReviews />}
        </div>
    )
}

export default SpotsDetailsPage