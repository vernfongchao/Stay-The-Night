import React from 'react'
import EditBookingModal from '../EditBookingModal'
import DeleteBookingModal from '../DeleteBookingModal'

const EditDeleteBookingMenu = ({ booking}) => {
    return (
        <div className='edit-delete-modal-menu'>
            <EditBookingModal booking={booking}/>
            <DeleteBookingModal booking = {booking}/>
        </div>
    )
}

export default EditDeleteBookingMenu