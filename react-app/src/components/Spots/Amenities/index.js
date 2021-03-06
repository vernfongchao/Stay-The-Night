import React from 'react'

import './Amenities.css'
import { motion } from 'framer-motion/dist/framer-motion'

const Amenities = ({ amenities }) => {

    return (
        <motion.div className='amenities-container'
        >
            {amenities?.map(({ label, value, boolean }, idx) => (
                <div key={idx}>
                    {(value === "parking") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-square-parking"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "kitchen") && boolean && (

                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-kitchen-set"></i>
                            </span>

                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>

                    )}
                    {(value === "pool") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>

                                <i className="fa-solid fa-person-swimming"></i>
                            </span >
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>)}

                    {(value === "hottub") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-hot-tub-person"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}

                    {(value === "wifi") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-wifi"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "ac") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-fan"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "self_check_in") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-user-check"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "pets") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-dog"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "first_aid") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-briefcase-medical"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "fire_extinguisher") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-fire-extinguisher"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}

                    {(value === "smoking") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-smoking"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "toilet_paper") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-toilet-paper"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                    {(value === "soap") && boolean && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-pump-soap"></i>
                            </span>
                            <span className='each-spot-amenities-label'>
                                {label}
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </motion.div>
    )
}

export default Amenities