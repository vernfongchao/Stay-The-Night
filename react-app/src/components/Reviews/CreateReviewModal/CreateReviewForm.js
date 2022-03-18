import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview } from "../../../store/review";

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
        if (rating >= 5) {
            setRating(5)
        }
        if (rating <= 1) {
            setRating(1)
        }
        if (review.length >= 1000) {
            vali_errors.push("Maximum Characters Reached")
        }
        setErrors(vali_errors)
    }, [rating, review])


    return (
        <div className="review-form-page">
            {errors && (<div className="spot-error-form-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}
            <form>
                <div>
                    <label>Rating</label>
                    <input type="number"
                        value={rating}
                        placeholder="Rating"
                        name="rating"
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div>
                    <label>Review</label>
                    <textarea
                        name='description'
                        value={review}
                        placeholder="Leave a review..."
                        row="40"
                        column="50"
                        maxLength="1000"
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default CreateReviewForm