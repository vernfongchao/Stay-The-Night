import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-page-container">
            {/* <div className="team-member-name">
                <Link to={`/profiles/4`}>
                    Vern Chao
                </Link>
            </div> */}
            <div className="github-icon-container">
                <a href="https://github.com/vernfongchao" target="_blank" rel="noopener noreferrer">
                    <div className="team-member-github">
                        <i className="fa-brands fa-github"></i>
                    </div>
                </a>
            </div>
            <div>

                <a href="https://www.linkedin.com/in/vern-chao-a2960a123/" target="_blank" rel="noopener noreferrer">
                    <div className="linkedin-icon-container">
                        <i className="fa-brands fa-linkedin"></i>
                    </div>
                </a>
            </div>
        </div>

    )

}

export default Footer