import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import EachFavorite from './EachFavorite'

import { motion } from 'framer-motion/dist/framer-motion'
import './MyFavorites.css'

const MyFavorites = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const favorites = Object.values(useSelector(state => state.favorites.user))

    if (user?.id !== +id) {
        history.push('/403-Unauthorized')
    }


    return (
        <motion.div className='my-bookings-page-container'


        >
            <div className="my-bookings-header-container">
                {favorites.length ? <h1>My Favorited Spots</h1> : <h1>No Spots Favorited</h1>}
            </div>
            <div className="my-all-spots-container">
                {favorites.map(({ spot_id }) => (
                    <EachFavorite spot_id={spot_id} key={spot_id} />
                ))}

            </div>
        </motion.div>
    )
}

export default MyFavorites