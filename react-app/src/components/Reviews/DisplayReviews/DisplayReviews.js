import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditDeleteReviewModal from "../EditDeleteReviewModal";
import * as FAIcons from 'react-icons/fa'

import './DisplayReviews.css'

const DisplayReviews = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewArr = Object.values(reviews).reverse()
    const filterReviews = reviewArr?.filter(({ spot_id }) => spot_id === +id)

    return (
        <div className="reviews-display-container">
            {filterReviews.map((review) => (
                <div className="display-each-review-container" key={review.id}>
                    <div className="review-username-edit-delete-container">
                        <p>Review By: {review.username}</p>
                        {user && user?.id === review.user_id && <EditDeleteReviewModal review={review} id={review.id} />}
                    </div>
                    <p className="display-ratings-container"> Rating: {[...Array(5)].map((star, i) => (
                        <FAIcons.FaStar key={i}
                            className="display-rating-icons"
                            color={(i + 1) <= review.rating ? "red" : "lightgray"}
                        />
                    ))}
                    </p>
                    <p className="display-review-text">Review: {review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default DisplayReviews