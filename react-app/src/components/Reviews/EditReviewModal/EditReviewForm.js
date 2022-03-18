import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editReview } from "../../../store/review"




const EditReviewForm = ({ curr_review, setShowModal }) => {
    const dispatch = useDispatch()
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
        console.log(edit_review)
        const data = await dispatch(editReview(edit_review))
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
        <div className="review-edit-form-page">
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
                <button onClick={handleEdit}>
                    Submit Review
                </button>
            </form>

        </div>
    )
}

export default EditReviewForm