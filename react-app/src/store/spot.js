const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const ADD_SPOT = '/spots/ADD_SPOTS'
const REMOVE_SPOT = '/spots/REMOVE_SPORT'

const loadSpots = spots => (
    {
        type: LOAD_SPOTS,
        spots
    }
)

const loadSpot = spot => (
    {
        type: ADD_SPOT,
        spot
    }
)

const removeSpot = spot => (
    {
        type: REMOVE_SPOT,
        spot
    }
)


export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots/')
    if (response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return null
    }
    return response
}

export const addSpot = (payload) => async dispatch => {
    const response = await fetch('/api/spots/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spot = await response.json()
        dispatch(loadSpot(spot))
        return spot
    } else if (response.status < 500) {
        const data = await response.json()
        if (data) {
            return data
        }
    }
}

export const editSpot = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.spot_id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spot = await response.json()
        dispatch(loadSpot(spot))
        return spot
    } else if (response.status < 500) {
        const data = await response.json()
        if (data) {
            return data
        }
    }
}

export const deleteSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`,{
        method: 'DELETE'
    })
    if(response.ok){
        const spot = await response.json()
        dispatch(removeSpot(spot))
        return spot
    }
}




const spotReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS: {
            newState = { ...state };
            action.spots.forEach(spot => newState[spot.id] = spot);
            return newState
        }
        case ADD_SPOT: {
            newState = { ...state };
            newState[action.spot.id] = action.spot
            return newState
        }
        case REMOVE_SPOT: {
            newState = {...state};
            delete newState[action.spot.id]
            return newState
        }
        default:
            return state
    }
}

export default spotReducer