import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditDeleteModal from "../EditDeleteSpotModal";

const SpotsDetailsPage = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const spot = spots[id]
    // console.log(spot)

    // const [errorImage,setErrorImage] = useState(spot?.images[0])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleImage = (e) => {
        e.target.src = "../../../../images/image-not-found-scaled.png"
        // setErrorImage("../../../../images/image-not-found-scaled.png")
    }

    return (
        <div className="details-page-container">
            <div>
                <h3>{spot?.name}</h3>
                {user?.id === spot.user_id && <EditDeleteModal />}
            </div>
            <div>
                <p>{spot?.address}</p>
                <p>{spot?.city}</p>
                <p>{spot?.state}</p>
                <p>{spot?.country}</p>
            </div>
            {spot?.images.map(({ image }) => (
                <img src={image} onError={handleImage}>
                </img>
            ))}
            <div>
                <h3>Hosted By: {spot?.first} {spot?.last}</h3>
            </div>
            <div>
                <p>{spot?.guest} Guests</p>
                <p>{spot?.bathroom} Bathrooms</p>
                <p>{spot?.bedroom} Bedrooms</p>
                <div>
                    <p>{spot?.price}</p>
                </div>
            </div>
            <div>
                <p>{spot?.description}</p>
            </div>
        </div>
    )
}

export default SpotsDetailsPage