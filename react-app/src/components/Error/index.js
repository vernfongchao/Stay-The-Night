import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './ErrorPage.css'

const ErrorPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="error-page-form-container">
            <div className="error-page-text-container">
                <h1 className="error-page-header">Oops!</h1>
                <p>We can't seem to find the page you're looking for</p>
                <p>Error code: 404</p>
                <p>Here are some helpful links instead:</p>
                <Link to="/spots">
                    All Spots
                </Link>
            </div>
            <div>
                <img className="error-page-picture"
                    src="https://www.pngitem.com/pimgs/m/131-1316277_cartoon-royalty-free-clip-art-man-transprent-sad.png"
                    alt="Sad" >
                </img>
            </div>

        </div>
    )
}

export default ErrorPage