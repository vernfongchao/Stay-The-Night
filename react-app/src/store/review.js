const LOAD_REVIEWS = '/reviews/LOAD_REVIEWS'
const ADD_REVIEW = '/reviews/ADD_REVIEW'

const loadReviews = reviews => (
    {
        type: LOAD_REVIEWS,
        reviews
    }
)

const loadReview = review => (
    {
        type: ADD_REVIEW,
        review
    }
)

export const getReviews = () => async dispatch => {
    const response = await fetch('/api/reviews/')
    if (response.ok) {
        const reviews = await response.json()
        dispatch(loadReviews(reviews))
        return null
    }
    return response
}

export const addReview = (payload) => async dispatch => {
    const response = await fetch(`/api/reviews/spot/${payload.spot_id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(loadReview(review))
        return review
    } else if (response.status < 500) {
        const data = await response.json()
        if (data) {
            return data
        }
    }
}



const reviewReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS: {
            newState = { ...state };
            action.reviews.forEach(review => newState[review.id] = review);
            return newState
        }
        case ADD_REVIEW: {
            newState = {...state};
            newState[action.review.id] = action.review
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer