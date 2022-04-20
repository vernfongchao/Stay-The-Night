const LOAD_USER_FAVORITES = '/favorites/LOAD_USER_FAVORITES'
const LOAD_SPOT_FAVORITES = '/favorites/LOAD_SPOT_FAVORITES'
const ADD_USER_SPOT_FAVORITES = '/favorites/ADD_USER_SPOT_FAVORITES'
const DELETE_USER_SPOT_FAVORITES = '/favorites/DELETE_USER_SPOT_FAVORITES'

const loadUserFavorites = favorites => (
    {
        type: LOAD_USER_FAVORITES,
        favorites
    }
)

const loadSpotFavorites = favorites => (
    {
        type: LOAD_SPOT_FAVORITES,
        favorites
    }
)

const loadUserSpotFavorites = favorites => (
    {
        type: ADD_USER_SPOT_FAVORITES,
        favorites
    }
)

const removeUserSpotFavorites = favorites => (
    {
        type: DELETE_USER_SPOT_FAVORITES,
        favorites
    }
)

export const getUserFavorites = (id) => async dispatch => {
    const response = await fetch(`/api/favorites/user/${id}`)
    if (response.ok) {
        const favorites = await response.json()
        dispatch(loadUserFavorites(favorites))
    }
}

export const getSpotFavorites = (id) => async dispatch => {
    const response = await fetch(`/api/favorites/spot/${id}`)
    if (response.ok) {
        const favorites = await response.json()
        dispatch(loadSpotFavorites(favorites))
    }
}

export const addUserFavorites = (payload) => async dispatch => {
    const response = await fetch('/api/favorites/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const favorites = await response.json()
        dispatch(loadUserSpotFavorites(favorites))
    }
}

export const deleteUserFavorites = (payload) => async dispatch =>{
    const response = await fetch('/api/favorites/', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const favorites = await response.json();
        dispatch(removeUserSpotFavorites(favorites))
    }
}


const initialState = { user: {}, spot: {} }

const favoritesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_FAVORITES: {
            newState = {spot:{...state.spot}};
            let userFavorites = {}
            action.favorites.user.forEach(spot => userFavorites[spot.spot_id] = spot)
            newState.user = userFavorites
            return newState
        }
        case LOAD_SPOT_FAVORITES: {
            newState = { user: { ...state.user } }
            let spotFavorites = {}
            action.favorites.spot.forEach(user => spotFavorites[user.user_id] = user)
            newState.spot = spotFavorites
            return newState
        }
        case ADD_USER_SPOT_FAVORITES:{
            newState = { ...state, user:{...state.user},spot:{...state.post} }
            action.favorites.spot.forEach(user => newState.spot[user.user_id] = user)
            action.favorites.user.forEach(spot => newState.user[spot.spot_id] = spot)
            return newState
        }

        case DELETE_USER_SPOT_FAVORITES: {
            newState = {};
            let userFavorites = {}
            let spotFavorites = {}
            action.favorites.user.forEach(spot => userFavorites[spot.spot_id] = spot)
            action.favorites.spot.forEach(user => spotFavorites[user.user_id] = user)
            newState.user = userFavorites
            newState.spot = spotFavorites
            return newState
        }
        default:
            return state
    }
}

export default favoritesReducer