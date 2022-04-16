import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editReview } from "../../../store/review"
import { useEditDeleteReviewModal } from "../EditDeleteReviewModal"

import * as FAIcons from 'react-icons/fa'

import './EditReviewForm.css'



const EditReviewForm = ({ curr_review, setShowModal }) => {
    const dispatch = useDispatch()
    const { setEditDeleteReviewModal } = useEditDeleteReviewModal()

    const user = useSelector(state => state.session.user)

    const [rating, setRating] = useState(curr_review.rating)
    const [hover, setHover] = useState(null)
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
                <div className="review-edit-form-submit-button-container">
                    <button className="review-edit-form-submit-button" onClick={handleEdit}>
                        Submit Edit
                    </button>

                </div>
            </form>

        </div>
    )
}

export default EditReviewForm