import React from 'react'
import { useDispatch } from 'react-redux'
import { useEditDeleteBookingModal } from '../EditDeleteBookingModal'

import { deleteBooking } from '../../../store/booking'

const DeleteBookingPage = ({setShowModal,booking}) => {
    const dispatch = useDispatch()
    const { setEditDeleteModal } = useEditDeleteBookingModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        const data = await dispatch(deleteBooking(booking?.id))
        if (data) {
            setShowModal(false)
            setEditDeleteModal(false)
        }
    }

    return (
        <div className="confirm-delete-page-container">
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Warning!</h1>
            </div>
            <div className="confirm-delete-warning-text-container">
                <p>Warning! This command will be irreversible, are you sure you want to delete? </p>
            </div>
            <div className="confirm-delete-button-container">
                <button className="confirm-delete-button" onClick={handleDelete}>
                    Confirm Delete
                </button>
                <button className="confirm-cancel-button" onClick={() => setShowModal(false)}>
                    Cancel
                </button>

            </div>
        </div>
    )

}

export default DeleteBookingPage