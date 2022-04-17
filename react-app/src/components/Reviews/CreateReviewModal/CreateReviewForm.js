import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview } from "../../../store/review";

import * as FAIcons from 'react-icons/fa'

import './CreateReviewForm.css'

const CreateReviewForm = ({ setShowModal }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)
    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const new_review = {
            user_id: user.id,
            spot_id: id,
            rating,
            review
        }
        const data = await dispatch(addReview(new_review))
        if (data.errors) {
            setErrors(data.errors)
        } else if (data) {
            setShowModal(false)
        }
    }

    useEffect(() => {
        const vali_errors = []
        if (review.length >= 1000) {
            vali_errors.push("Maximum Characters Reached")
        }
        setErrors(vali_errors)
    }, [rating, review])

    return (
        <div className="review-form-page">


            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Leave a Review!</h1>
            </div>
            {errors && (<div className="review-form-error-container">
                {errors?.map((error, ind) => (
                    <p className='review-form-error-message' key={ind}>{error}</p>
                ))}
            </div>)}
            <form className="review-form-container">

                <div className="review-form-rating-container">
                    <label>Please Rate from 1 to 5</label>
                    <div className="review-form-rating-field-container">
                        {[...Array(5)].map((star, i) => (
                            <label>
                                <input className="review-form-rating-radio-buttons"
                                    type="radio"
                                    value={rating}
                                    onClick={() => setRating(i + 1)}
                                />
                                <FAIcons.FaStar
                                    color={(i + 1) <= (hover || rating) ? "red" : "lightgray"}
                                    className="review-form-rating-icons"
                                    onMouseEnter={() => setHover(i + 1)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        ))}
                    </div>

                </div>
                <div className="review-form-review-container">
                    <label>Review</label>
                    <textarea className="review-form-field-textarea"
                        name='description'
                        value={review}
                        placeholder="Leave a review..."
                        row="40"
                        column="50"
                        maxLength="1000"
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className="review-form-submit-button-container">
                    <button className="review-form-submit-button" onClick={handleSubmit}>
                        Submit Review
                    </button>

                </div>
            </form>
        </div>
    )
}

export default CreateReviewForm