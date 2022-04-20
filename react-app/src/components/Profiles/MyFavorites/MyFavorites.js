import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteUserFavorites } from "../../../store/favorite";

import * as AiIcons from 'react-icons/ai'

import './MyFavorites.css'

const MyFavorites = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const spots = useSelector(state => state.spots)
    const favorites = Object.values(useSelector(state => state.favorites.user))
    // const set = new Set()
    // favorites.forEach(({spot_id}) => {
    //     if (!set.has(spot_id)) set.add(spot_id)
    // })

    // const spots = spot.filter(({id})=> set.has(id))
    // console.log(spots)
    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }

    // const deleteFavorites = (e) => {
    //     e.preventDefault()
    //     const deleteFavorite = {
    //         user_id: user?.id,
    //         spot_id: spots[spot_id]
    //     }
    //     dispatch(deleteUserFavorites(deleteFavorite))
    // }

    return (
        <div className='my-bookings-page-container'>
            <div className="my-bookings-header-container">
                {favorites.length ? <h1>My Favorited Spots</h1> : <h1>No Spots Favorited</h1>}
            </div>
            <div className="my-all-spots-container">
                {favorites.map(({ spot_id }) => (
                    <div className="my-each-spot-container" key={spot_id}>
                        <div className='my-favorites-heart-position-container'>
                            <div className='my-favorites-heart-container'>
                                <AiIcons.AiTwotoneHeart className='my-favorites-heart-icon' onClick={(e)=>{
                                    e.preventDefault()
                                    const deleteFavorite = {
                                        user_id: user?.id,
                                        spot_id: spots[spot_id].id
                                    }
                                    dispatch(deleteUserFavorites(deleteFavorite))
                                }}/>
                            </div>
                        </div>
                        <Link to={`/spots/${spots[spot_id].id}`}>
                            <img
                                className="my-each-spot-image"
                                src={spots[spot_id].images[0].image}
                                alt={`spots #${spot_id}`}
                                onError={handleImage}
                            >
                            </img>
                        </Link>
                        <div className="my-spots-basic-container">
                            {spots[spot_id].name}
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default MyFavorites