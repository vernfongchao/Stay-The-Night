const LOAD_SPOTS = '/spots/LOAD_SPOTS'

const loadSpots = spots => (
    {
        type: LOAD_SPOTS,
        spots
    }
)

export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots/')
    if (response.ok){
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return null
    }
    return response
}

const spotReducer = (state = {},action) => {
    let newState;
    switch(action.type){
        case LOAD_SPOTS:{
            newState = {...state};
            action.spots.forEach(spot => newState[spot.id] = spot);
            return newState
        }
        default:
            return state
    }
}

export default spotReducer