import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addBooking } from '../../../store/booking'
import moment from 'moment'


import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'


import { DateRangePicker } from 'react-dates';


const CreateBookingForm = ({ setShowModal }) => {
    const tomorrow = moment().add('days', 1)
    const defaultEnd = moment(tomorrow).add('days', 2)
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots[id])

    const [startDate, setStartDate] = useState(tomorrow)
    const [endDate, setEndDate] = useState(defaultEnd)
    const [guests, setGuests] = useState(1)
    const [focusedInput, setFocusedInput] = useState(null);
    const [errors, setErrors] = useState([])


    const rangeDate = ({ startDate, endDate }) => {

        setStartDate(!startDate?  tomorrow : startDate);
        setEndDate(moment(endDate))
    }

    const rangeFocus = (focusedInput) => {
        setFocusedInput(focusedInput);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const booking = {
            spot_id: spot.id,
            user_id: user.id,
            guests: parseInt(guests),
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD')
        }
        const data = await dispatch(addBooking(booking))
        if (data.errors) {
            setErrors(data.errors)
        } else if (data) {
            history.push(`/profiles/${user.id}/bookings`)
            setShowModal(false)
        }
    }

    // const isDayBlocked = day => {
    //     const availableDates = [moment().format('YYYY-MM-DD')]
    //     return !availableDates.some(date => day.isSame(date), 'day')
    // }

    return (
        <div className="create-booking-form-page-container">
            <div className='login-form-header-container'>
                <h1 className="login-form-header-text">
                    Book This Spot!
                </h1>
            </div>

            {errors && (<div className="create-booking-form-error-container">
                {errors?.map((error, ind) => (
                    <p className='error-message' key={ind}>{error}</p>
                ))}
            </div>)}

            <form className='create-booking-form-container' onSubmit={handleSubmit}>
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

                    <button className='create-booking-form-button'>
                        Book!
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateBookingForm