import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditDeleteReviewModal from "../EditDeleteReviewModal";

const DisplayReviews = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewArr = Object.values(reviews)
    const filterReviews = reviewArr?.filter(({ spot_id }) => spot_id === +id)
    return (
        <div className="reviews-display-container">
            {filterReviews.map((review) => (
                <div className="display-each-review-container">
                    <div className="review-username-edit-delete-container">
                        <p>Username {review.username}</p>
                        {user?.id === review.user_id && <EditDeleteReviewModal review={review} id={review.id}/>}
                    </div>
                    <p>Rating {review.rating}</p>
                    <p>Review {review.review}</p>
                </div>
            ))}

        </div>
    )
}

export default DisplayReviews