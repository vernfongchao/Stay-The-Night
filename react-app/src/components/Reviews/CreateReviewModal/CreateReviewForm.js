import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview } from "../../../store/review";

import './CreateReviewForm.css'

const CreateReviewForm = ({ setShowModal }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [rating, setRating] = useState(1)
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
        if (rating <= 1) {
            setRating(1)
        }
        else if (rating % 10 === 1) {
            setRating(1)
        }
        else if (rating % 10 === 2) {
            setRating(2)
        }
        else if (rating % 10 === 3) {
            setRating(3)
        }
        else if (rating % 10 === 4) {
            setRating(4)
        }
        else if (rating >= 5) {
            setRating(5)
        }
        if (review.length >= 1000) {
            vali_errors.push("Maximum Characters Reached")
        }
        setErrors(vali_errors)
    }, [rating, review])

    const handleExpress = (e) => {
        if (e.key === 'e') return e.preventDefault()
        if (e.key === 'E') return e.preventDefault()
        if (e.key === '+') return e.preventDefault()
        if (e.key === '-') return e.preventDefault()
        if (e.key === '.') return e.preventDefault()
    }

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
                    <input className="review-form-field"
                        type="number"
                        value={rating}
                        placeholder="Rating"
                        name="rating"
                        onChange={(e) => setRating(e.target.value)}
                        onKeyDown={handleExpress}
                    />
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
                <button className="review-form-submit-button" onClick={handleSubmit}>
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default CreateReviewForm