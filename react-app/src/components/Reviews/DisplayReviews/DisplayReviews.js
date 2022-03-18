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
    console.log(filterReviews)

    return (
        <div className="reviews-display-container">
            {filterReviews.map(({ username, rating, review, user_id }) => (
                <div className="display-each-review-container">
                    <div className="review-username-edit-delete-container">
                        <p>Username {username}</p>
                        {user?.id === user_id && <EditDeleteReviewModal />}
                    </div>
                    <p>Rating {rating}</p>
                    <p>Review {review}</p>
                </div>
            ))}

        </div>
    )
}

export default DisplayReviews