import React, {useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Link, useParams, useHistory } from "react-router-dom";

import { motion } from 'framer-motion/dist/framer-motion'
import './MySpots.css'

const MySpots = () => {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spots = Object.values(useSelector(state => state.spots)).reverse()
    const spotsFilter = spots.filter(({ host_id }) => host_id === +id)
    const [hidden, setHidden] = useState(false)

    if (user?.id !== +id){
        history.push('/403-Unauthorized')
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        let timer = setTimeout(() => setHidden(true), 50)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }

    return ( user?.host_id? 
        (<motion.div className={hidden ? 
            "my-spots-page-container my-spots-page-container-active" : 
            "my-spots-page-container"}

            >
            <div className="my-spots-header-container">
                {spotsFilter.length ? <h1>My Spots</h1> : <h1>No Spots Hosted</h1>}
            </div>
            {spotsFilter &&
                <div className="my-all-spots-container">
                    {spotsFilter.map(spot => (
                        <div className="my-each-spot-container" key={spot.id}>
                            <Link to={`/spots/${spot.id}`} spot={spot} id={`image-spots-${spot.id}`}>
                                <img
                                    className="my-each-spot-image"
                                    src={spot?.images[0]?.image}
                                    alt={`spots #${spot.id}`}
                                    onError={handleImage}
                                >
                                </img>
                            </Link>
                            <div className="my-spots-basic-container">
                                <div className="my-spots-">
                                    <span>{spot.state}, {spot.country}</span>
                                </div>
                                <div>
                                    <span>${spot.price}/ Night</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
        </motion.div>
        )
        : 
        <div className="my-spots-page-container">
            <h1>You are not yet a Host, Please become a host to access your listings!</h1>
        </div>
    )
}

export default MySpots