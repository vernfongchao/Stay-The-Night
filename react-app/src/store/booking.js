const LOAD_BOOKINGS = '/bookings/LOAD_BOOKINGS'
const ADD_BOOKING = "/bookings/ADD_BOOKINGS"
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING'

const loadBookings = bookings => (
    {
        type: LOAD_BOOKINGS,
        bookings
    }
)

const loadBooking = booking => (
    {
        type: ADD_BOOKING,
        booking
    }
)

const removeBooking = booking => (
    {
        type: REMOVE_BOOKING,
        booking
    }
)


// export const getBookings = () => async dispatch => {
//     const response = await fetch('/api/bookings/')
//     if (response.ok) {
//         const bookings = await response.json()
//         dispatch(loadBookings(bookings))
//     }
//     return response
// }

export const getUserBookings = (id) => async dispatch => {
    const response = await fetch(`/api/bookings/users/${id}`)
    if (response.ok) {
        const booking = await response.json()
        dispatch(loadBookings(booking))
    }
    return response
}


export const addBooking = (payload) => async dispatch => {
    const response = await fetch(`/api/bookings/spot/${payload.spot_id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(loadBooking(booking))
        return booking
    } else if (response.status < 500) {
        const data = await response.json()
        if (data) {
            return data
        }
    }
}

export const deleteBooking = (id) => async dispatch => {
    const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(removeBooking(booking))
        return booking
    }
}






const bookingReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_BOOKINGS: {
            newState = {};
            action.bookings.forEach(booking => newState[booking.id] = booking);
            return newState
        }
        case ADD_BOOKING: {
            newState = { ...state };
            newState[action.booking.id] = action.booking
            return newState
        }
        case REMOVE_BOOKING: {
            newState = { ...state };
            delete newState[action.booking.id]
            return newState
        }
        default:
            return state
    }
}

export default bookingReducer