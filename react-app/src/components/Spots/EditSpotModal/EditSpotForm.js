import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEditDeleteModal } from "../EditDeleteSpotModal"
import { editSpot } from "../../../store/spot"

import './EditSpotForm.css'

const EditSpotForm = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const { editDeleteModal,setEditDeleteModal } = useEditDeleteModal()

    // console.log(editDeleteModal,setEditDeleteModal)
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const spot = spots[id]

    const [name, setName] = useState(spot.name)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [price, setPrice] = useState(spot.price);
    const [description, setDescription] = useState(spot.description);
    const [guest, setGuest] = useState(spot.guest);
    const [bedroom, setBedroom] = useState(spot.bedroom);
    const [bathroom, setBathroom] = useState(spot.bathroom);
    const [errors, setErrors] = useState([])

    let images = []
    const [imageFields, setImageFields] = useState(images)

    spot.images.forEach(({ image }) => {
        images.push({ image })
    })

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


    const handleSubmit = async (e) => {
        e.preventDefault()
        const edit_images = [...imageFields]

        if (edit_images.length > images.length) {
            edit_images.forEach((image, index) => {
                if (spot.images[index]){
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

    const handleRemoveUrl = () => {
        if (imageFields.length <= 1) return
        else {
            const array = [...imageFields]
            array.pop()
            setImageFields(array)
        }
    }

    return (
        <div className="spot-edit-form-page">
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
            <form className="spot-edit-form-container">
                <div>
                    <label for="name">Name</label>
                    <input type="text"
                        value={name}
                        placeholder="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>

                    <label for="address">Address</label>
                    <input type="text"
                        label="Address"
                        value={address}
                        placeholder="Address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <label for="city">City</label>
                    <input type="text"
                        label="City"
                        value={city}
                        placeholder="City"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div>
                    <label for="state">State</label>
                    <input type="text"
                        label="State"
                        value={state}
                        placeholder="State"
                        name="state"
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <div>
                    <label for='price'>Price</label>
                    <input type="number"
                        label="Price"
                        value={price}
                        placeholder="Price"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label for='description'>Description</label>
                    <textarea
                        name='description'
                        value={description}
                        placeholder="Give a description..."
                        row="40"
                        column="50"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label for='guest'>Guests</label>
                    <input type="number"
                        label="Guest"
                        value={guest}
                        placeholder="Guest"
                        name="guest"
                        onChange={(e) => setGuest(e.target.value)}
                    />
                </div>

                <div>
                    <label for='bedroom'>Bedrooms</label>
                    <input type="number"
                        label="Bedroom"
                        value={bedroom}
                        placeholder="Bedrooms"
                        name="bedroom"
                        onChange={(e) => setBedroom(e.target.value)}
                    />
                </div>

                <div>
                    <label for='bathoom'>Bathrooms</label>
                    <input type="number"
                        label="Bathroom"
                        value={bathroom}
                        placeholder="Bathrooms"
                        name="bathroom"
                        onChange={(e) => setBathroom(e.target.value)}
                    />
                </div>

                <div>
                    <label for="country">Country</label>
                    <input type="text"
                        label="Country"
                        value={country}
                        placeholder="Country"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
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
                        Submit Edit
                    </button >
                </div>
            </form>
        </div>
    )
}

export default EditSpotForm