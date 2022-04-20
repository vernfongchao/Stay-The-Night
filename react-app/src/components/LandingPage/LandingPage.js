import React,{useEffect} from "react";
import { useHistory } from "react-router-dom";
import Carousel from "./Carousel/Carousel";

import Aos from 'aos'
import 'aos/dist/aos.css'

import './LandingPage.css'

const LandingPage = () => {
    const history = useHistory()

    useEffect(() => {
        Aos.init({
            duration: 1000
        })
    })


    return (
        <div className="landing-page-container"
            data-aos='fade-in'
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