const LOAD_USERS= '/users/LOAD_USERS'

const loadUsers = users => (
    {
        type: LOAD_USERS,
        users
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
            newState = {};
            action.users.forEach(booking => newState[booking.id] = booking);
            return newState
        }
        default:
            return state
    }
}

export default userReducer