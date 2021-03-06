import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEditDeleteModal } from "../EditDeleteSpotModal"
import { editSpot } from "../../../store/spot"
import { getSpot } from "../../../store/spot"
import { useLocations } from "../../../context/Location";

import Multiselect from 'multiselect-react-dropdown';
import * as AiIcons from 'react-icons/ai'
import './EditSpotForm.css'

const EditSpotForm = ({ setShowModal }) => {
    const { countries, states, amenities } = useLocations()
    const { setEditDeleteModal } = useEditDeleteModal()
    const imageInputRef = useRef()

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
    const [country, setCountry] = useState(spot.country);
    const [description, setDescription] = useState(spot.description);
    const [maxDescription, setMaxDescription] = useState("");
    const [price, setPrice] = useState(spot.price);
    const [guest, setGuest] = useState(spot.guest);
    const [bedroom, setBedroom] = useState(spot.bedroom);
    const [bathroom, setBathroom] = useState(spot.bathroom);
    const [errors, setErrors] = useState([])

    const [images, setImages] = useState(spot.images)
    const [imagesPreview, setImagesPreview] = useState(spot.images)

    const [imageLoading, setImageLoading] = useState(false)

    const [imagesToDelete, setImagesToDelete] = useState([]);


    const [amenitiesSelected, setAmenitiesSelected] = useState(spot.amenities)


    const [maxImage, setMaxImage] = useState("");



    const filteredAmenities = spot.amenities.filter(({ boolean }) => (
        boolean
    ))


    useEffect(() => {
        if (imagesPreview.length > 0 && imagesPreview.length <= 4) {
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

        if (description.length >= 1000) {
            setMaxDescription("Maximum Characters Reached")
        }
        if (description.length < 1000) {
            setMaxDescription("")
        }
    }, [imagesPreview, name, address, city, state, country, description])


    const handleSubmit = async (e) => {
        e.preventDefault()

        let set = new Set()
        let newAmenities = [...amenitiesSelected]

        amenitiesSelected.forEach(({ value }) => {
            if (!set.has(value)) {
                set.add(value)
            }
        })

        amenities.forEach(({ value }) => {
            if (!set.has(value)) {
                newAmenities.push({
                    value,
                    boolean: false
                })
            }
        })

        const edit_spot = await dispatch(editSpot({
            id: id,
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
            amenities_id: spot.amenities_id,
            amenities: newAmenities,
            images: imagesPreview,
        }))
        if (edit_spot.errors) {
            setErrors(edit_spot.errors)
            return
        }

        imagesToDelete.forEach (async (image) =>{
            const formData = new FormData();
            formData.append('image',image.image)
            const res = await fetch(`/api/spots/images/${image.id}`,{
                method: 'DELETE',
                body: formData,
            })
            if(res.ok){
                await res.json()
                await dispatch(getSpot(spot.id))
            }
            else {
                const errors = res.json();
                setErrors(() => errors);
            }
        })

        if (images.length > 0) {
            setImageLoading(true)
            images.forEach(async (image, i) => {
                const formData = new FormData()
                formData.append('image', image);
                formData.append('spot_id', spot.id)
                const res = await fetch('/api/spots/images', {
                    method: 'POST',
                    body: formData
                })
                if (res.ok) {
                    await res.json();
                    await dispatch(getSpot(spot.id))
                    setImageLoading(false);
                    setShowModal(false)
                    setEditDeleteModal(false)
                } 
                else {
                    setImageLoading(false);
                    setShowModal(true)
                    setEditDeleteModal(true)
                    const errors = res.json()
                    setErrors(errors.errors)
                }
            })
        }
        if(images.length === 0){
            setImageLoading(false);
            setShowModal(false)
            setEditDeleteModal(false)
        }
    }




    const addImageFiles = (e) => {
        if (imagesPreview.length >= 5) {
            return setMaxImage("Maximum pictures allowed met")
        }
        else {
            return imageInputRef.current.click()
        }
    }

    const onChangeImageFiles = (e) => {
        const file = e.target.files[0]
        if (file && file.type.substr(0, 5) === "image") {
            const imageArray = [...images]
            const imagesPreviewArray = [...imagesPreview]
            const imagePreview = URL.createObjectURL(file)
            imageArray.push(file)
            imagesPreviewArray.push(imagePreview)
            setImages(imageArray)
            setImagesPreview(imagesPreviewArray)
        }
        return
    }

    const removeImage = (e, index) => {
        const array = [...images]
        const arrayPreview = [...imagesPreview]
        array.splice(index, 1)
        const deleteImage = arrayPreview.splice(index, 1)
        if (deleteImage[0].id) {
            const deletedImages = [...imagesToDelete]
            deletedImages.push(...deleteImage)
            setImagesToDelete(deletedImages)
        }
        setImages(array)
        setImagesPreview(arrayPreview)
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

                {imagesPreview?.map((image, index) => (image.length !== 0 &&
                    <div key={index} >
                        <img
                            src={image?.image || image}
                            onError={(e) => e.target.src = "../../../../static/not-found.png"}
                            alt="House"
                            width="125px"
                            height="125px">
                        </img>
                        <div className="spot-form-image-remove-preview-container">
                            <div className="spot-edit-image-remove-preview-position">
                                <AiIcons.AiFillCloseSquare onClick={(e) => removeImage(e, index)} className='spot-form-image-remove-button' />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            {errors.length ? (<div className="spot-error-form-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>) : null}
            <form className="spot-edit-form-container">
                <p className="error-spot-form-max">{maxName}</p>
                <div className="spot-edit-field-container">
                    <label className="edit-spot-form-label" for="name">Name</label>
                    <input className="spot-form-field"
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

                <p className="error-spot-form-max">{maxAddress}</p>
                <div className="spot-edit-field-container">
                    <label className="error-spot-form-label" for="address">Address</label>
                    <input className="spot-form-field"
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

                        <div className="spot-form-select-field-city-container">
                            <label className="error-spot-form-label" for="state">State</label>
                            <div className="spot-form-select-field-city-input-container">
                                <select className="spot-form-select-field-state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}>
                                    <option value="">Select a State</option>
                                    {states?.map(({ name }, idx) => (
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
                                    {countries?.map(({ name }, idx) => (
                                        <option key={idx} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="spot-form-integer-field-container">

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

                </div>

                <div className="spot-form-amenities-select-input-container">
                    <label className="error-spot-form-label" for="state">Amenities</label>
                    <Multiselect
                        displayValue="label"
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={(e) => setAmenitiesSelected(e)}
                        onSearch={function noRefCheck() { }}
                        onSelect={(e) => setAmenitiesSelected(e)}
                        placeholder="Amenities"
                        options={amenities}
                        selectedValues={filteredAmenities}
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
                                border: 'none',
                                minWidth: "703px",
                                minHeight: " 35px",
                                borderBottom: '1px solid black',
                                borderRadius: '0'
                            }
                        }}
                    />
                </div>

                <div>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={imageInputRef}
                        onChange={onChangeImageFiles}
                        accept=".jpeg, .jpg, .gif , .png"

                    />
                </div>

                <div className="edit-spot-image-container" >
                    <p className="error-spot-form-max">{maxImage}</p>
                </div>

                {imageLoading && <h4>Images are loading please wait</h4>}

                <div className="spot-form-button-container">
                    <button className="spot-form-button" type='button' onClick={addImageFiles}>Add Images</button>
                    <button className="spot-form-button" type="submit" onClick={handleSubmit}>
                        Submit Edit
                    </button >
                </div>
            </form>
        </div>
    )
}

export default EditSpotForm