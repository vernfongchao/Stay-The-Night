import React  from 'react'
import { useSelector} from 'react-redux'

import EachFavorite from './EachFavorite'


import './MyFavorites.css'

const MyFavorites = () => {

    const favorites = Object.values(useSelector(state => state.favorites.user))


    return (
        <div className='my-bookings-page-container'>
            <div className="my-bookings-header-container">
                {favorites.length ? <h1>My Favorited Spots</h1> : <h1>No Spots Favorited</h1>}
            </div>
            <div className="my-all-spots-container">
                {favorites.map(({ spot_id }) => (
                    <EachFavorite spot_id={spot_id} key={spot_id}/>
                ))}

            </div>
        </div>
    )
}

export default MyFavorites