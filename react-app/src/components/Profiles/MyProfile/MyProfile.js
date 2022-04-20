import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import './MyProfile.css'
import { motion } from 'framer-motion/dist/framer-motion'

const MyProfile = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)

    if (!users[id]) {
        history.push('/403-Unauthorized')
    }
    if ((user?.id !== +id) && !users[id]?.host_id) {
        history.push('/403-Unauthorized')
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <motion.div
            className='profile-page-container'
        >
            <div className='profile-page-header-container'>
                {user?.id === +id ?
                    <h1>My Profile</h1>
                    : <h1>User Profile</h1>}
            </div>
            <div className='profile-page-name-container'>
                <h2 className="first-name">
                    Name: {users[id]?.first} {users[id]?.last}
                </h2>
            </div>
            <div className='profile-page-email-container'>
                {(users[id]?.id === user?.id) && <h2>
                    My Email : {users[id]?.email}
                </h2>}
            </div>
            {users[id]?.host_id && (
                <div className='profile-page-host-container'>
                    <h2>
                        Bio : {users[id]?.bio}
                    </h2>
                    <h2 className="first-name">
                        From : {users[id]?.city} {users[id]?.state}, {users[id]?.country}
                    </h2>
                    {(users[id]?.id !== user?.id) && <h2>
                        Contact : {users[id].email}
                    </h2>}
                </div>
            )}

        </motion.div>
    )
}

export default MyProfile