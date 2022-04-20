import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditDeleteModal from "../EditDeleteSpotModal";
import DisplayReviews from "../../Reviews/DisplayReviews/DisplayReviews";
import CreateReviewModal from '../../Reviews/CreateReviewModal'
import CreateBookingModal from "../../Bookings/CreateBookingModal";
import Amenities from "../Amenities";
import { getSpotFavorites } from "../../../store/favorite";

import { addUserFavorites } from "../../../store/favorite";
import { deleteUserFavorites } from "../../../store/favorite";
import LoginHeartModal from "../../auth/LoginFormModal/LoginHeart";

import { motion } from 'framer-motion/dist/framer-motion'
import * as  AiIcons from 'react-icons/ai'
import './SpotsDetails.css'

const SpotsDetailsPage = () => {
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots[id])
    const reviews = Object.values(useSelector(state => state.reviews))
    const userFavorites = Object.values(useSelector(state => state.favorites.user))
    const spotFavorites = Object.values(useSelector(state => state.favorites.spot))
    const favoriteExists = userFavorites.filter(({ spot_id }) => spot_id === +id)

    const [hover,setHover] = useState(false)


    if (spot === undefined) {
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

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getSpotFavorites(spot?.id))
    }, [dispatch, spot])


    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }

    const addFavorites = (e) => {
        e.preventDefault()
        const newFavorite = {
            user_id: user?.id,
            spot_id: spot.id
        }
        dispatch(addUserFavorites(newFavorite))
        setHover(false)
    }

    const deleteFavorites = (e) => {
        e.preventDefault()
        const deleteFavorite = {
            user_id: user?.id,
            spot_id: spot.id
        }
        dispatch(deleteUserFavorites(deleteFavorite))
    }

    return (
        <motion.div className="details-spot-page-container"
         >
            <div className="details-spot-page-title">
                <h1 className="details-spot-page-name">{spot?.name}</h1>
                {user?.host_id === spot?.host_id && <EditDeleteModal />}
                {(user?.host_id !== spot?.host_id) && <CreateBookingModal />}
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
                {spot?.images.map(({ image }, idx) => (
                    <img className={`details-page-image-${idx}`} src={image} onError={handleImage} key={idx} alt="house">
                    </img>
                ))}
            </div>

            <div className="details-page-host-heart-container">
                <h2>Hosted By: <Link to={`/profiles/${spot?.user_id}`} className="first-last-name"><span className="first-name">{spot?.first} {spot?.last} </span> </Link></h2>
                <div className="details-page-favorite-spot-number-container">
                    <h2 className="details-page-favorite-spot-number">{spotFavorites.length}</h2>
                    {!user && <LoginHeartModal />}
                    {user && user?.host_id !== spot.host_id && (favoriteExists.length ?
                        <AiIcons.AiTwotoneHeart className="details-page-heart-button" onClick={deleteFavorites} />
                        : (hover ? <AiIcons.AiTwotoneHeart className="details-page-heart-button" onClick={addFavorites} onMouseLeave={() => setHover(false)} />
                            : <AiIcons.AiOutlineHeart className="details-page-heart-button" onMouseEnter={() => setHover(true)} />
                        )
                        // <AiIcons.AiOutlineHeart className="details-page-heart-button" onClick={addFavorites} />
                    )}
                </div>
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

            <div>
                <h2>Amenities</h2>
                <Amenities amenities={spot?.amenities} />
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
                {user && spot?.host_id !== user?.host_id && <CreateReviewModal />}
            </div>

            <DisplayReviews />
        </motion.div>
    )
}

export default SpotsDetailsPage