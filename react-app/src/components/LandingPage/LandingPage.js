import React from "react";
import { useHistory } from "react-router-dom";
import Carousel from "./Carousel/Carousel";

import './LandingPage.css'

const LandingPage = () => {
    const history = useHistory()

    return (
        <div className="landing-page-container"
            >
            <Carousel />
            <div className="flexible-container">
                <h1 className="flexible-container-header">
                    Come Stay The Night
                </h1>
                <button className="flexible-button" onClick={(e) => history.push('/spots')}>
                    I'm flexible
                </button>
            </div>
        </div>
    )
}

export default LandingPage