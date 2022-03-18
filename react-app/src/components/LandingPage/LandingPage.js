import React from "react";
import { useHistory } from "react-router-dom";

import './LandingPage.css'

const LandingPage = () => {
    const history = useHistory()


    const handleError = (e) => {
        e.target.src = "https://i.gyazo.com/675f7585181d00e0dfc6f2654c8e2969.jpg"
    }


    return (
        <div className="landing-page-container">
            <div className="landing-image-container">
                <img className="landing-image"
                    src="https://a0.muscache.com/im/pictures/miso/Hosting-46898793/original/f0d2a57a-c3af-417b-bd77-5594c86889e0.jpeg?im_w=1200"
                    onError={handleError}
                ></img>
                <div className="flexible-container">
                    <h1 className="flexible-container-header">
                        Come Stay The Night
                    </h1>

                    <button className="flexible-button" onClick={(e) => history.push('/spots')}>
                        I'm flexible
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage