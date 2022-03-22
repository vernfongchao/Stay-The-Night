import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editReview } from "../../../store/review"
import { useEditDeleteReviewModal } from "../EditDeleteReviewModal"

import './EditReviewForm.css'



const EditReviewForm = ({ curr_review, setShowModal }) => {
    const dispatch = useDispatch()
    const { setEditDeleteReviewModal } = useEditDeleteReviewModal()

    const user = useSelector(state => state.session.user)

    const [rating, setRating] = useState(curr_review.rating)
    const [review, setReview] = useState(curr_review.review)
    const [errors, setErrors] = useState([])

    const handleEdit = async (e) => {
        e.preventDefault()
        const edit_review = {
            id: curr_review.id,
            user_id: user.id,
            spot_id: curr_review.spot_id,
            rating,
            review,
        }


        const data = await dispatch(editReview(edit_review))
        if (data.errors) {
            setErrors(data.errors)
        } else if (data) {
            setShowModal(false)
            setEditDeleteReviewModal(false)
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
        <div className="review-edit-form-page">
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Edit Your Review!</h1>
            </div>
            {errors && (<div className="review-form-error-container">
                {errors?.map((error, ind) => (
                    <p className='review-form-error-message' key={ind}>{error}</p>
                ))}
            </div>)}
            <form className="review-edit-form-container">
                <div className="review-edit-form-rating-container">
                    <label>Please Rate from 1 to 5</label>
                    <input className="review-edit-form-field"
                        type="number"
                        value={rating}
                        placeholder="Rating"
                        name="rating"
                        onChange={(e) => setRating(e.target.value)}
                        onKeyDown={handleExpress}
                    />
                </div>
                <div className="review-edit-form-review-container">
                    <label>Review</label>
                    <textarea className="review-edit-form-field-textarea "
                        name='description'
                        value={review}
                        placeholder="Leave a review..."
                        row="40"
                        column="50"
                        maxLength="1000"
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <button className="review-edit-form-submit-button" onClick={handleEdit}>
                    Submit Review
                </button>
            </form>

        </div>
    )
}

export default EditReviewForm