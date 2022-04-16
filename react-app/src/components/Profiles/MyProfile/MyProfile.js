import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

const MyProfile = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)

    if (!users[id]){
        history.push('/403-Unauthorized')
    }

    if ((user.id !== users[id]?.id) && !users[id]?.host_id){
        history.push('/403-Unauthorized')
    }



    return (
        <div>

        </div>
    )
}

export default MyProfile