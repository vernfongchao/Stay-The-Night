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
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [guest, setGuest] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [errors, setErrors] = useState([])
    const [imageFields, setImageFields] = useState([
        { image: "" }
    ])
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

    useEffect(() => {
        const vali_errors = []
        if (imageFields.length >= 5) {
            vali_errors.push(["Maximum pictures allowed met"])
        }
        setErrors([vali_errors])
    }, [imageFields])

    useEffect(() => {
        const max = 1000000
        const vali_errors = []
        if (price >= max) {
            setPrice(max)
            vali_errors.push("Maximum Price Reach")
        }
        if (price <= 1) {
            setPrice(1)
            vali_errors.push("Price can not be under 1")
        }
        if (guest >= max) {
            setGuest(max)
            vali_errors.push("Maximum Guests Reach")
        }
        if (guest <= 1) {
            setGuest(1)
            vali_errors.push("Guest can not be under 1")
        }
        if (bedroom >= max) {
            setBedroom(max)
            vali_errors.push("Maximum Bedrooms Reach")
        }
        if (bedroom <= 1) {
            setBedroom(1)
            vali_errors.push("Bedroom can not be under 1")
        }
        if (bathroom >= max) {
            setBathroom(max)
            vali_errors.push("Maximum Bathrooms Reach")
        }
        if (bathroom <= 1) {
            setBathroom(1)
            vali_errors.push("Bathroom can not be under 1")
        }
        setErrors(vali_errors)
    }, [price, guest, bedroom, bathroom])

    const handleOnChange = (index, e) => {
        const array = [...imageFields]
        array[index][e.target.name] = e.target.value
        setImageFields(array)
    }

    const handleAddUrl = () => {
        if (imageFields.length >= 5) return
        setImageFields([...imageFields, { image: "" }])
    }

    const handleRemoveUrl = () => {
        if (imageFields.length <= 1) return
        else {
            const array = [...imageFields]
            array.pop()
            setImageFields(array)
        }
    }


    return (
        <div className="spot-form-page">
            {imageFields?.map(({ image }) => (image.length !== 0 &&
                <img src={image}
                    onError={(e) => e.target.src = "https://i.gyazo.com/675f7585181d00e0dfc6f2654c8e2969.jpg"}
                    alt="House"
                    width="100px"
                    height="100px">
                </img>
            ))}
            {errors && (<div className="spot-error-form-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}
            <form className="spot-form-container">
                <input type="text"
                    label="Name"
                    value={name}
                    placeholder="Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input type="text"
                    label="Address"
                    value={address}
                    placeholder="Address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input type="text"
                    label="City"
                    value={city}
                    placeholder="City"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                />

                <input type="text"
                    label="State"
                    value={state}
                    placeholder="State"
                    name="state"
                    onChange={(e) => setState(e.target.value)}
                />

                <input type="text"
                    label="Country"
                    value={country}
                    placeholder="Country"
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                />

                <input type="number"
                    label="Price"
                    value={price}
                    placeholder="Price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <textarea
                    name='description'
                    value={description}
                    placeholder="Give a description..."
                    row="40"
                    column="50"

                    onChange={(e) => setDescription(e.target.value)}
                />

                <input type="number"
                    label="Guest"
                    value={guest}
                    placeholder="Guest"
                    name="guest"
                    onChange={(e) => setGuest(e.target.value)}
                />

                <input type="number"
                    label="Bedroom"
                    value={bedroom}
                    placeholder="Bedrooms"
                    name="bedroom"
                    onChange={(e) => setBedroom(e.target.value)}
                />
                <input type="number"
                    label="Bathroom"
                    value={bathroom}
                    placeholder="Bathrooms"
                    name="bathroom"
                    onChange={(e) => setBathroom(e.target.value)}
                />
                {imageFields.map((imageField, index) => (
                    <div key={index}>
                        <label>Image URL</label>
                        <input name="image" type="text" value={imageField.image} onChange={e => handleOnChange(index, e)}>

                        </input>
                    </div>
                ))}

                <div className="spot-form-button-container">
                    <button type='button' onClick={handleAddUrl}>Add Images</button>
                    <button type='button' onClick={handleRemoveUrl}>Remove Images</button>
                    <button type="submit" onClick={handleSubmit}>
                        Add a Spot
                    </button >
                </div>
            </form>
        </div>
    )
}

export default CreateSpotForm