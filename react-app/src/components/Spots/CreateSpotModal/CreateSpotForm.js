import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSpot } from "../../../store/spot"
import { useHistory } from "react-router-dom"


import './CreateSpot.css'


const CreateSpotForm = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState("")
    const [maxName, setMaxName] = useState("")
    const [address, setAddress] = useState("")
    const [maxAddress, setMaxAddress] = useState("")
    const [city, setCity] = useState("")
    const [maxCity, setMaxCity] = useState("")
    const [state, setState] = useState("");
    const [maxState, setMaxState] = useState("")
    const [country, setCountry] = useState("");
    const [maxCountry, setMaxCountry] = useState("")
    const [description, setDescription] = useState("");
    const [maxDescription, setMaxDescription] = useState("");
    const [price, setPrice] = useState("");
    const [guest, setGuest] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [errors, setErrors] = useState([])
    const [imageFields, setImageFields] = useState([
        { image: "" }
    ])

    const [maxImage, setMaxImage] = useState("");

    useEffect(() => {
        if (imageFields.length >= 5) {
            setMaxImage("Maximum pictures allowed met")
        }
        else if (imageFields.length <= 1) {
            setMaxImage("Must upload at least 1 picture")
        }
        else if (imageFields.length >= 2 && imageFields.length <= 4) {
            setMaxImage("")
        }
        if (name.length >= 100) {
            setMaxName("Maximum Characters Reached")
        }
        if (name.length < 100) {
            setMaxName("")
        }
        if (address.length >= 50) {
            setMaxAddress("Maximum Characters Reached")
        }
        if (address.length < 50) {
            setMaxAddress("")
        }
        if (city.length >= 50) {
            setMaxCity("Maximum Characters Reached")
        }
        if (city.length < 50) {
            setMaxCity("")
        }
        if (state.length >= 50) {
            setMaxState("Maximum Characters Reached")
        }
        if (state.length < 50) {
            setMaxState("")
        }
        if (country.length >= 50) {
            setMaxCountry("Maximum Characters Reached")
        }
        if (country.length < 50) {
            setMaxCountry("")
        }
        if (description.length >= 1000) {
            setMaxDescription("Maximum Characters Reached")
        }
        if (description.length < 1000) {
            setMaxDescription("")
        }

    }, [imageFields, name, address, city, state, country, description])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const spot = {
            user_id: user.id,
            name,
            address,
            city,
            state,
            country,
            price,
            description,
            guest,
            bedroom,
            bathroom,
            images: imageFields
        }
        const data = await dispatch(addSpot(spot))
        if (data.errors) {
            setErrors(data.errors)
        } else if (data) {
            history.push(`/spots/${data.id}`)
            setShowModal(false)
        }
    }



    const handleOnChange = (index, e) => {
        const array = [...imageFields]
        array[index][e.target.name] = e.target.value
        setImageFields(array)
    }

    const handleAddUrl = () => {
        if (imageFields.length >= 5) return
        setImageFields([...imageFields, { image: "" }])
    }

    const handleRemoveUrl = (index) => {
        if (imageFields.length <= 1) return
        else {
            const array = [...imageFields]
            array.splice(index, 1)
            setImageFields(array)
        }
    }

    const handleExpress = (e) => {
        if (e.key === 'e') return e.preventDefault()
        if (e.key === 'E') return e.preventDefault()
        if (e.key === '+') return e.preventDefault()
        if (e.key === '-') return e.preventDefault()
        if (e.key === '.') return e.preventDefault()
    }

    return (
        <div className="spot-form-page">
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Host a Spot!</h1>
            </div>

            <div className="spot-form-image-preview">
                {imageFields?.map(({ image }, i) => (image.length !== 0 &&
                    <img key={i}
                        src={image}
                        onError={(e) => e.target.src = "../../../../static/house.jpg"}
                        alt="House"
                        width="100px"
                        height="100px">
                    </img>
                ))}
            </div>

            {errors && (<div className="spot-error-form-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}

            <form className="spot-form-container">
                <p className="spot-form-max">{maxName}</p>
                <div className="spot-form-field-container">

                    <label className="spot-form-label" for="name">Name</label>
                    <input className='spot-form-field'
                        type="text"
                        label="Name"
                        value={name}
                        placeholder="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
                    />
                </div>
                <p className="spot-form-max">{maxAddress}</p>

                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="address">Address</label>
                    <input className='spot-form-field'
                        type="text"
                        label="Address"
                        value={address}
                        placeholder="Address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        maxLength="50"
                    />
                </div>



                <div className="spot-form-field-container">

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
                </div>

                <p className="spot-form-max">{maxState}</p>


                <div className="spot-form-field-container">
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
                </div>
                <p className="spot-form-max">{maxCountry}</p>

                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="state">Country</label>
                    <input className='spot-form-field'
                        type="text"
                        label="Country"
                        value={country}
                        placeholder="Country"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        maxLength="50"
                    />
                </div>

                <p className="spot-form-max">{maxDescription}</p>

                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="state">Description</label>
                    <textarea className="spot-form-field-textarea"
                        name='description'
                        value={description}
                        placeholder="Give a description..."
                        row="40"
                        column="50"
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="1000"
                    />
                </div>

                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="state">Price</label>
                    <input className='spot-form-field'
                        type="number"
                        label="Price"
                        value={price}
                        placeholder="Price"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                        onKeyDown={handleExpress}
                    />
                </div>


                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="state">Guest</label>
                    <input className='spot-form-field'
                        type="number"
                        label="Guest"
                        value={guest}
                        placeholder="Guest"
                        name="guest"
                        onChange={(e) => setGuest(e.target.value)}
                        onKeyDown={handleExpress}
                    />
                </div>

                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="state">Bedrooms</label>
                    <input className='spot-form-field'
                        type="number"
                        label="Bedroom"
                        value={bedroom}
                        placeholder="Bedrooms"
                        name="bedroom"
                        onChange={(e) => setBedroom(e.target.value)}
                        onKeyDown={handleExpress}
                    />
                </div>

                <div className="spot-form-field-container">
                    <label className="error-spot-form-label" for="state">Bathroom</label>
                    <input className='spot-form-field'
                        type="number"
                        label="Bathroom"
                        value={bathroom}
                        placeholder="Bathrooms"
                        name="bathroom"
                        onChange={(e) => setBathroom(e.target.value)}
                        onKeyDown={handleExpress}
                    />
                </div>

                <div className="spot-form-image-container">

                    {maxImage && <p className="spot-form-max">{maxImage}</p>}
                    {imageFields.map((imageField, index) => (
                        <div className="spot-form-inner-image-field" key={index}>
                            <label className="error-spot-form-label">Image URL</label>
                            <div className="spot-form-field-button-container">
                                <input
                                    className='spot-form-image-field'
                                    name="image" type="text"
                                    value={imageField.image}
                                    placeholder="Image URL"
                                    onChange={e => handleOnChange(index, e)}>

                                </input>
                                <span className="spot-form-remove-image" onClick={(e) => handleRemoveUrl(index, e)}>
                                    <i className="fa-solid fa-minus"></i>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="spot-form-button-container">
                    <button className="spot-form-button" type='button' onClick={handleAddUrl}>Add Images</button>
                    <button className="spot-form-button" type="submit" onClick={handleSubmit}>
                        Add a Spot
                    </button >
                </div>
            </form>
        </div>
    )
}

export default CreateSpotForm