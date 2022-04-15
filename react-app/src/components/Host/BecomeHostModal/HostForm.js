import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { beHost } from "../../../store/session"

import './HostForm.css'

const HostForm = ({ setShowModal }) => {
    const user = useSelector(state => state.session.user)
    const [bio, setBio] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [maxBio, setMaxBio] = useState("")
    const [maxCity, setMaxCity] = useState("")
    const [maxState, setMaxState] = useState("")
    const [errors, setErrors] = useState([])
    // const [host,setHost]= useState(false)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const host = {
            // isHost: host 
            user_id: user.id,
            bio,
            city,
            state,
        }
        const data = await dispatch(beHost(host))
        if (data) {
            setErrors(data)
        } else {
            setShowModal(false)
        }
    }

    useEffect(() => {
        if (city.length < 50) {
            setMaxCity("")
        }
        if (state.length >= 50) {
            setMaxState("Maximum Characters Reached")
        }
        if (state.length < 50) {
            setMaxState("")
        }
        if (state.length >= 50) {
            setMaxState("Maximum Characters Reached")
        }
        if (bio.length < 500) {
            setMaxBio("")
        }
        if (bio.length >= 500) {
            setMaxBio("Maximum Characters Reached")
        }
    }, [city, state, bio])

    return (
        <div>
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Become a Host!</h1>
            </div>

            {errors && (<div className="spot-error-form-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}

            <form>
                <p className="spot-form-max">{maxBio}</p>

                <label className="error-spot-form-label" for="state">Bio</label>
                <textarea className="spot-form-field-textarea"
                    name='description'
                    value={bio}
                    placeholder="Give a description..."
                    row="40"
                    column="50"
                    onChange={(e) => setBio(e.target.value)}
                    maxLength="500"
                />
                <p className="spot-form-max">{maxCity}</p>
                <label className="error-spot-form-label" for="city">City</label>
                <input className='spot-form-field'
                    type="text"
                    label="City"
                    value={city}
                    placeholder="City"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    maxLength="50"
                />

                <p className="spot-form-max">{maxState}</p>
                <label className="error-spot-form-label" for="state">State</label>
                <input className='spot-form-field'
                    type="text"
                    label="State"
                    value={state}
                    placeholder="State"
                    name="state"
                    onChange={(e) => setState(e.target.value)}
                    maxLength="50"
                />

                <button className="spot-form-button" type="submit" onClick={handleSubmit}>
                    Become a Host
                </button >

            </form>
        </div>
    )
}

export default HostForm