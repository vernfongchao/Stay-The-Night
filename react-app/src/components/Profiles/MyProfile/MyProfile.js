import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import './MyProfile.css'

const MyProfile = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)


    if ((user?.id !== users[id]?.id) && !users[id]?.host_id) {
        if (user?.id === +id) {

        }
        else {
            history.push('/403-Unauthorized')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='profile-page-container'>
            <div className='profile-page-header-container'>
                {user?.id === +id ? 
                <h1>My Profile</h1>
                : <h1>User Profile</h1> }
            </div>

        </div>
    )
}

export default MyProfile