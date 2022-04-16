const LOAD_USERS= '/users/LOAD_USERS'
const ADD_USER= 'users/LOAD_USER'

const loadUsers = users => (
    {
        type: LOAD_USERS,
        users
    }
)

export const loadUser = user => (
    {
        type: ADD_USER,
        user
    }
)

export const getUsers = () => async dispatch => {
    const response = await fetch('/api/users/')
    if (response.ok) {
        const users = await response.json()
        dispatch(loadUsers(users))
    }
    return response
}

const userReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS: {
            newState = {...state};
            action.users.forEach(user => newState[user.id] = user);
            return newState
        }
        case ADD_USER: {
            newState = { ...state };
            newState[action.user.id] = action.user
            return newState
        }
        default:
            return state
    }
}

export default userReducer