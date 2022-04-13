import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEditDeleteModal } from "../EditDeleteSpotModal"
import { editSpot } from "../../../store/spot"
import { useLocations } from "../../../context/Location";
import Multiselect from 'multiselect-react-dropdown';

import './EditSpotForm.css'

const EditSpotForm = ({ setShowModal }) => {
    const { countries, states, amenities } = useLocations()
    const { setEditDeleteModal } = useEditDeleteModal()

    const dispatch = useDispatch()

    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots[id])

    const [name, setName] = useState(spot.name)
    const [maxName, setMaxName] = useState("")
    const [address, setAddress] = useState(spot.address)
    const [maxAddress, setMaxAddress] = useState("")
    const [city, setCity] = useState(spot.city)
    const [maxCity, setMaxCity] = useState("")
    const [state, setState] = useState(spot.state);
    // const [maxState, setMaxState] = useState("")
    const [country, setCountry] = useState(spot.country);
    // const [maxCountry, setMaxCountry] = useState("")
    const [description, setDescription] = useState(spot.description);
    const [maxDescription, setMaxDescription] = useState("");
    const [price, setPrice] = useState(spot.price);
    const [guest, setGuest] = useState(spot.guest);
    const [bedroom, setBedroom] = useState(spot.bedroom);
    const [bathroom, setBathroom] = useState(spot.bathroom);
    const [errors, setErrors] = useState([])
    const [maxImage, setMaxImage] = useState("");
    const [amenitiesSelected, setAmenitiesSelected] = useState([])
    console.log(spot.amenities)

    let images = []
    const [imageFields, setImageFields] = useState(images)


    spot.images.forEach(({ image }) => {
        images.push({ image })
    })

    useEffect(() => {
        if (imageFields.length >= 5) {
            setMaxImage("Maximum pictures allowed met")
        }
        // else if (imageFields.length <= 1) {
        //     setMaxImage("Must upload at least 1 picture")
        // }
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
        // if (state.length >= 50) {
        //     setMaxState("Maximum Characters Reached")
        // }
        // if (state.length < 50) {
        //     setMaxState("")
        // }
        // if (country.length >= 50) {
        //     setMaxCountry("Maximum Characters Reached")
        // }
        // if (country.length < 50) {
        //     setMaxCountry("")
        // }
        if (description.length >= 1000) {
            setMaxDescription("Maximum Characters Reached")
        }
        if (description.length < 1000) {
            setMaxDescription("")
        }
    }, [imageFields, name, address, city, state, country, description])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const edit_images = [...imageFields]

        if (edit_images.length > images.length) {
            edit_images.forEach((image, index) => {
                if (spot.images[index]) {
                    image["id"] = spot.images[index].id
                } else {
                    image["id"] = null
                }
            })
            images = edit_images
        } else {
            images.forEach((image, index) => {
                if (imageFields[index] !== undefined) {
                    image["image"] = imageFields[index].image
                    image["id"] = spot.images[index].id
                } else {
                    image.image = null
                    image["id"] = spot.images[index].id
                }
            })
        }

        const edit_spot = {
            spot_id: id,
            host_id: user.host_id,
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
            amenities: amenitiesSelected,
            images,
        }
        const data = await dispatch(editSpot(edit_spot))
        if (data.errors) {
            setErrors(data.errors)
        } else if (data) {
            setShowModal(false)
            setEditDeleteModal(false)
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

    const handleRemoveUrl = (index, e) => {
        if (imageFields.length <= 1) return setMaxImage("Must upload at least 1 Picture")
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
        <div className="spot-edit-form-page">

            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Edit Your Spot!</h1>
            </div>
            <div className="spot-form-image-preview">

                {imageFields?.map(({ image }, idx) => (image.length !== 0 &&
                    <img src={image} key={idx}
                        onError={(e) => e.target.src = "../../../../static/not-found.png"}
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
            <form className="spot-edit-form-container">
                <p className="error-spot-form-max">{maxName}</p>
                <div className="spot-edit-field-container">
                    <label className="edit-spot-form-label" for="name">Name</label>
                    <input className="error-spot-form-field"
                        type="text"
                        value={name}
                        placeholder="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
                    />
                </div>

                <p className="error-spot-form-max">{maxDescription}</p>
                <div className="spot-edit-field-container">
                    <label className="error-spot-form-label" for='description'>Description</label>
                    <textarea className="error-spot-form-textarea"
                        name='description'
                        value={description}
                        placeholder="Give a description..."
                        row="40"
                        column="50"
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="1000"
                    />
                </div>

                <p className="error-spot-form-max">{maxAddress}</p>
                <div className="spot-edit-field-container">
                    <label className="error-spot-form-label" for="address">Address</label>
                    <input className="error-spot-form-field"
                        type="text"
                        label="Address"
                        value={address}
                        placeholder="Address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        maxLength="50"
                    />
                </div>

                <div className="spot-form-select-field-container">
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

                        {/* <p className="spot-form-max">{maxState}</p> */}
                        <div className="spot-form-select-field-city-container">
                            <label className="error-spot-form-label" for="state">State</label>
                            <div className="spot-form-select-field-city-input-container">
                                <select className="spot-form-select-field-state"
                                    defaultValue={spot.state}
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}>
                                    <option value="">Select a State</option>
                                    {states?.map(({ name },idx) => (
                                        <option key={idx} value={name}>{name}</option>
                                    ))}
                                </select>

                            </div>
                        </div>


                        
                        <div className="spot-form-select-field-city-container">
                            <label className="error-spot-form-label" for="state">Country</label>
                            <div className="spot-form-select-field-city-input-container">
                                <select className="spot-form-select-field-state" value={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option value="">Select a Country</option>
                                    {countries?.map(({ name },idx) => (
                                        <option key={idx} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="spot-form-integer-field-container">

                    {/* <div className="spot-form-integer-field-input-container"> */}
                    <label className="error-spot-form-label" for="state">Price</label>
                    <div className="spot-form-select-field-city-input-container">
                        <input className='spot-form-integer-field-input'
                            type="number"
                            label="Price"
                            value={price}
                            placeholder="Price"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                            onKeyDown={handleExpress}
                        />
                    </div>
                    {/* </div> */}

                    {/* <div className=""> */}
                    <label className="error-spot-form-label" for="state">Guests</label>
                    <div className="spot-form-select-field-city-input-container">
                        <input className='spot-form-integer-field-input'
                            type="number"
                            label="Guest"
                            value={guest}
                            placeholder="Guests"
                            name="guest"
                            onChange={(e) => setGuest(e.target.value)}
                            onKeyDown={handleExpress}
                        />
                    </div>
                    {/* </div> */}

                    {/* <div className=""> */}
                    <label className="error-spot-form-label" for="state">Bedrooms</label>
                    <div className="spot-form-select-field-city-input-container">
                        <input className='spot-form-integer-field-input'
                            type="number"
                            label="Bedroom"
                            value={bedroom}
                            placeholder="Bedrooms"
                            name="bedroom"
                            onChange={(e) => setBedroom(e.target.value)}
                            onKeyDown={handleExpress}
                        />
                    </div>
                    {/* </div> */}

                    {/* <div className=""> */}
                    <label className="error-spot-form-label" for="state">Bathrooms</label>
                    <div className="spot-form-select-field-city-input-container">
                        <input className='spot-form-integer-field-input'
                            type="number"
                            label="Bathroom"
                            value={bathroom}
                            placeholder="Bathrooms"
                            name="bathroom"
                            onChange={(e) => setBathroom(e.target.value)}
                            onKeyDown={handleExpress}
                        />
                    </div>
                    {/* </div> */}
                </div>

                <div className="spot-form-amenities-select-input-container">
                    <label className="error-spot-form-label" for="state">Amenities</label>
                    <Multiselect
                        displayValue="label"
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={(e) => setAmenitiesSelected(e)}
                        onSearch={function noRefCheck() { }}
                        onSelect={(e) => setAmenitiesSelected(e)}
                        // onSelect={function noRefCheck() { }}
                        placeholder="Amenities"
                        options={amenities}
                        selectedValues={spot.amenities}
                        style={{
                            inputField: {},
                            optionContainer: {},
                            option: {},
                            groupHeading: {},
                            chips: {
                                background: 'rgb(250, 147, 164)'
                            },
                            multiselectContainer: {
                                color: 'red'
                            },
                            searchBox: {
                                // border: 'none',
                                minWidth: "703px",
                                minHeight: " 35px",
                                border: '1px solid black',
                                borderRadius: '10px'
                            }
                        }}
                    />
                </div>

                <div className="all-error-spot-image-container" >
                    <p className="error-spot-form-max">{maxImage}</p>
                    {imageFields.map((imageField, index) => (

                        <div className="edit-spot-image-container" key={index}>
                            <label className="error-spot-form-label">Image URL</label>
                            <div className="edit-spot-field-button-container">
                                <input className="error-spot-form-image-field"
                                    name="image"
                                    type="text"
                                    value={imageField.image}
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
                        Submit Edit
                    </button >
                </div>
            </form>
        </div>
    )
}

export default EditSpotForm