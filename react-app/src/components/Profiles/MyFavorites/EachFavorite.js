import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteUserFavorites } from "../../../store/favorite";

// import * as AiIcons from 'react-icons/ai'
import * as IoIcons5 from 'react-icons/io5'



const EachFavorite = ({spot_id}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const [hover, setHover] = useState(false)
    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }
    return (
        <div className="my-each-spot-container">
            <div className='my-favorites-heart-position-container'>
                <div className='my-favorites-heart-container'>
                    {hover ? <IoIcons5.IoHeartDislikeSharp
                        className='my-favorites-heart-icon'
                        onMouseLeave={() => setHover(false)}
                        onClick={(e) => {
                            e.preventDefault()
                            const deleteFavorite = {
                                user_id: user?.id,
                                spot_id: spots[spot_id].id
                            }
                            dispatch(deleteUserFavorites(deleteFavorite))
                            setHover(false)
                        }}

                    />
                        :
                        <IoIcons5.IoHeartSharp className='my-favorites-heart-icon' onMouseEnter={() => setHover(true)} />
                    }
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
    )
}

export default EachFavorite