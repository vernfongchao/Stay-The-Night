import React, { useEffect, useState } from "react"
import { useLocations } from "../../../context/Location";
import { useDispatch, useSelector } from "react-redux"
import { addSpot } from "../../../store/spot"
import { useHistory } from "react-router-dom"
import Multiselect from 'multiselect-react-dropdown';

import './CreateSpot.css'


const CreateSpotForm = ({ setShowModal }) => {
    const { countries, states, amenities } = useLocations()

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
    // const [maxState, setMaxState] = useState("")
    const [country, setCountry] = useState("");
    // const [maxCountry, setMaxCountry] = useState("")
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

    const [amenitiesSelected, setAmenitiesSelected] = useState([])

    // const [parking, setParking] = useState(false);
    // const [kitchen, setKitchen] = useState(false);
    // const [pool, setPool] = useState(false);
    // const [hottub, setHottub] = useState(false);
    // const [wifi, setWifi] = useState(false);
    // const [ac, setAc] = useState(false);
    // const [self, setSelf] = useState(false);
    // const [pet, setPet] = useState(false);



    const [maxImage, setMaxImage] = useState("");

    useEffect(() => {

    }, [])

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
        if (city.length >= 20) {
            setMaxCity("Maximum Characters Reached")
        }
        if (city.length < 20) {
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

    }, [imageFields, name, address, city, country, description])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const spot = {
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
            images: imageFields,
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
        <div className="spot-form-page">
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Host a Spot!</h1>
            </div>

            <div className="spot-form-image-preview">
                {imageFields?.map(({ image }, i) => (image.length !== 0 &&
                    <img key={i}
                        src={image}
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

            <form className="spot-form-container" onSubmit={handleSubmit}>
                <p className="spot-form-max">{maxName}</p>
                <div className="spot-form-field-container">

                    <label className="spot-form-label" for="name">Name</label>
                    <input className='spot-form-field'
                        type="text"
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
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
                                <select className="spot-form-select-field-state" value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="">Select a State</option>
                                    {states?.map(({ name },i) => (
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
                                    {countries?.map(({ name },i) => (
                                        <option key={i} value={name}>{name}</option>
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


                {/* <div className="spot-form-amenities-container">
                    <Checkbox
                        label="Parking"
                        value={parking}
                        onChange={() => (setParking(!parking))}
                    ></Checkbox>

                    <Checkbox
                        label="Kitchen"
                        value={kitchen}
                        onChange={() => (setKitchen(!kitchen))}
                    ></Checkbox>

                    <Checkbox
                        label="Pool"
                        value={pool}
                        onChange={() => (setPool(!pool))}
                    ></Checkbox>

                    <Checkbox
                        label="Hot-Tub"
                        value={hottub}
                        onChange={() => (setHottub(!hottub))}
                    ></Checkbox>

                    <Checkbox
                        label="Wifi"
                        value={wifi}
                        onChange={() => (setWifi(!wifi))}
                    ></Checkbox>

                    <Checkbox
                        label="AC"
                        value={ac}
                        onChange={() => (setAc(!ac))}
                    ></Checkbox>

                    <Checkbox
                        label="Self Check-in"
                        value={self}
                        onChange={() => (setSelf(!self))}
                    ></Checkbox>

                    <Checkbox
                        label="Pets"
                        value={pet}
                        onChange={() => (setPet(!pet))}
                    ></Checkbox>
                </div> */}

                <div className="spot-form-image-container">

                    {maxImage && <p className="spot-form-max">{maxImage}</p>}
                    {imageFields.map((imageField, index) => (
                        <div className="spot-form-inner-image-field" key={index}>
                            <label className="error-spot-form-label">Image URL</label>
                            <div className="spot-form-field-button-container">
                                <input
                                    className='spot-form-image-field'
                                    name="image" type="text"
                                    placeholder="Image URL"
                                    value={imageField.image}
                                    onChange={e => handleOnChange(index, e)}
                                >

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
                    <button className="spot-form-button" type="submit">
                        Add a Spot
                    </button >
                </div>
            </form >
        </div >
    )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            {label}
            <input type="checkbox" checked={value} onChange={onChange} />
        </label>
    );
};

export default CreateSpotForm