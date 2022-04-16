import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditDeleteBookingModal } from '../EditDeleteBookingModal'
import { editBooking } from '../../../store/booking'

import moment from 'moment'

import './EditBookingForm.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


import { DateRangePicker } from 'react-dates';

const EditBookingForm = ({ setShowModal, booking }) => {
    const { setEditDeleteModal } = useEditDeleteBookingModal()
    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(moment(booking.start_date).utcOffset(7))
    const [endDate, setEndDate] = useState(moment(booking.end_date).utcOffset(7))
    const [guests, setGuests] = useState(booking.guests)
    const [focusedInput, setFocusedInput] = useState(null);
    const [errors, setErrors] = useState([])
    const spot = useSelector(state => state.spots[booking.spot_id])
    const rangeDate = ({ startDate, endDate }) => {
        setStartDate(moment(startDate));
        setEndDate(moment(endDate))
    }

    const rangeFocus = (focusedInput) => {
        setFocusedInput(focusedInput);
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        const edit_booking = {
            id: booking.id,
            spot_id: spot.id,
            user_id: booking.user_id,
            guests: parseInt(guests),
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD'),
        }
        const data = await dispatch(editBooking(edit_booking))
        if (data.errors) {
            setErrors(data.errors)
        } else if (data) {
            setShowModal(false)
            setEditDeleteModal(false)
        }

    }

    return (
        <div className="create-booking-form-page-container">
            <div className='login-form-header-container'>
                <h1 className="login-form-header-text">
                    Edit Booking!
                </h1>
            </div>

            {errors && (<div className="create-booking-form-error-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}

            <form className='create-booking-form-container' onSubmit={handleEdit}>
                <div>
                    <DateRangePicker
                        startDate={startDate}
                        startDateId="fgdhdfghdfghadfgzxcgcvb"
                        endDate={endDate}
                        endDateId="Dfghsdfghbxcvbnxcvbn"
                        onDatesChange={rangeDate}
                        focusedInput={focusedInput}
                        onFocusChange={rangeFocus}
                    />
                </div>
                <div className='create-booking-form-guest-container'>
                    <label htmlFor='Guests'>Guests</label>
                    <div>

                        <select defaultValue={guests} onChange={(e) => setGuests(e.target.value)}>
                            {[...Array(spot.guest).keys()].map((number, i) => (
                                <option key={i}>{number + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='create-booking-form-button-container'>

                    <button className='edit-booking-form-button'>
                        Submit Edit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditBookingForm