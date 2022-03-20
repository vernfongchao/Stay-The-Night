import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

import './MySpots.css'

const MySpots = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spots = Object.values(useSelector(state => state.spots))
    const spotsFilter = spots.filter(({ user_id }) => user_id === +id)

    if (user?.id !== +id){
        history.push('/403-Unauthorized')
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleImage = (e) => {
        e.target.src = "https://i.gyazo.com/675f7585181d00e0dfc6f2654c8e2969.jpg"
    }

    return (
        <div className="my-spots-page-container">

            <div className="my-spots-header-container">
                <h1>My Spots</h1>
            </div>
            {spotsFilter &&
                <div className="my-all-spots-container">
                    {spotsFilter.map(spot => (
                        <div className="my-each-spot-container">
                            <Link to={`/spots/${spot.id}`} spot={spot} id={`image-spots-${spot.id}`}>
                                <img
                                    className="my-each-spot-image"
                                    src={spot.images[0].image}
                                    alt={`spots #${spot.id}`}
                                    onError={handleImage}
                                >
                                </img>
                            </Link>
                            <div className="my-spots-basic-container">
                                <div className="my-spots-">
                                    <span>{spot.state.length > 10 ? `${spot.state.slice(0, 15)}` : spot.state},</span>
                                    <span>{spot.country.length > 10 ? `${spot.country.slice(0, 15)}` : spot.country}</span>
                                </div>
                                <div>
                                    <span>${spot.price}/ Night</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}

        </div>
    )
}

export default MySpots