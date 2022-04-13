import React from 'react'

import './Amenities.css'

const Amenities = ({ amenities }) => {
    return (
        <div className='amenities-container'>
            {amenities.map((object,idx) => (
                <div key={idx}>
                    {object.parking && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-square-parking"></i>
                            </span>
                            <span>
                                Parking
                            </span>
                        </div>
                    )}
                    {object.kitchen && (

                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-kitchen-set"></i>
                            </span>

                            <span>
                                Kitchen
                            </span>
                        </div>

                    )}
                    {object.pool && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>

                                <i className="fa-solid fa-person-swimming"></i>
                            </span>
                            <span >
                                Pool
                            </span>
                        </div>)}

                    {object.hottub && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-hot-tub-person"></i>
                            </span>
                            <span>
                                Hot-tub
                            </span>
                        </div>
                    )}

                    {object.wifi && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-wifi"></i>
                            </span>
                            <span>
                                Wifi
                            </span>
                        </div>
                    )}
                    {object.ac && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-fan"></i>
                            </span>
                            <span>
                                A.C
                            </span>
                        </div>
                    )}
                    {object.self_check_in && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-user-check"></i>
                            </span>
                            <span>
                                Self Check-in
                            </span>
                        </div>
                    )}
                    {object.pets && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-dog"></i>
                            </span>
                            <span>
                                Pets
                            </span>
                        </div>
                    )}
                    {object.first_aid && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-briefcase-medical"></i>
                            </span>
                            <span>
                                First-Aid
                            </span>
                        </div>
                    )}
                    {object.fire_extinguisher && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-fire-extinguisher"></i>
                            </span>
                            <span>
                                First Extinguisher
                            </span>
                        </div>
                    )}

                    {object.smoking && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-smoking"></i>
                            </span>
                            <span>
                                Smoking
                            </span>
                        </div>
                    )}
                    {object.toilet_paper && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-toilet-paper"></i>
                            </span>
                            <span>
                                Toilet Paper
                            </span>
                        </div>
                    )}
                    {object.soap && (
                        <div className='each-spot-each-amenities-container'>
                            <span className='each-spot-ameniities-icon'>
                                <i className="fa-solid fa-pump-soap"></i>
                            </span>
                            <span>
                                Soap
                            </span>
                        </div>
                    )}
                </div>




            ))}
        </div>
    )
}

export default Amenities