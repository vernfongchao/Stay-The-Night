import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { beHost } from "../../../store/session"
import { useLocations } from "../../../context/Location";

import './HostForm.css'

const HostForm = ({ setShowModal }) => {
    const { countries, states} = useLocations()
    const user = useSelector(state => state.session.user)
    const [bio, setBio] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [maxBio, setMaxBio] = useState("")
    const [maxCity, setMaxCity] = useState("")
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const host = {
            user_id: user.id,
            bio,
            city,
            state,
            country,
        }
        const data = await dispatch(beHost(host))
        if (data) {
            setErrors(data)
        } else {
            setShowModal(false)
        }
    }

    useEffect(() => {
        if (city.length < 20) {
            setMaxCity("")
        }
        if (city.length >= 20) {
            setMaxCity("Maximum Characters Reached")
        }
        if (bio.length < 500) {
            setMaxBio("")
        }
        if (bio.length >= 500) {
            setMaxBio("Maximum Characters Reached")
        }
    }, [city, bio])

    return (
        <div className="host-form-page-container">
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Become a Host!</h1>
            </div>

            {errors && (<div className="spot-error-form-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}

            <form className="host-form-container">
                <div className="host-form-bio-container">
                    <p className="host-form-max">{maxBio}</p>
                    <div className="host-form-bio-input-container">
                        <label className="host-spot-form-label" for="state">Bio</label>
                        <textarea className="host-form-field-textarea"
                            name='description'
                            value={bio}
                            placeholder="Give yourself a Bio..."
                            row="40"
                            column="50"
                            onChange={(e) => setBio(e.target.value)}
                            maxLength="500"
                        />

                    </div>

                </div>
                <div className="host-form-select-field-container">
                    <div>
                        <p className="spot-form-max">{maxCity}</p>
                    </div>
                    <div className="spot-form-select-field-input-container">
                        <div className="spot-form-select-field-city-container">
                            <label className="spot-form-select-field-city-label" for="city">City</label>
                            <div className="spot-form-select-field-city-input-container">
                                <input className='spot-form-select-input-field'
                                    type="text"
                                    label="City"
                                    value={city}
                                    placeholder="City"
                                    name="city"
                                    onChange={(e) => setCity(e.target.value)}
                                    maxLength="20"
                                />
                            </div>
                        </div>

                        <div className="spot-form-select-field-city-container">
                            <label className="error-spot-form-label" for="state">State</label>
                            <div className="spot-form-select-field-city-input-container">
                                <select className="spot-form-select-field-state" value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="">Select a State</option>
                                    {states?.map(({ name }, i) => (
                                        <option key={i} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="spot-form-select-field-city-container">
                            <label className="error-spot-form-label" for="state">Country</label>
                            <div className="spot-form-select-field-city-input-container">
                                <select className="spot-form-select-field-state" value={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option value="">Select a Country</option>
                                    {countries?.map(({ name }, i) => (
                                        <option key={i} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="host-form-button-container">
                    <button className="spot-form-button" type="submit" onClick={handleSubmit}>
                        Become a Host
                    </button >
                </div>

            </form>
        </div>
    )
}

export default HostForm