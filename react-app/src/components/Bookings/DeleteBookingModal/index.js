import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import DeleteBookingPage from './DeleteBookingPage'

const DeleteBookingModal = ({booking}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="delete-spot-modal-container">
            <div className="delete-form-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="delete-form-modal-button">Delete</p>
            </div>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteBookingPage setShowModal={setShowModal} booking={booking} />
                    </Modal>
                )
            }
        </div >
    )
}

export default DeleteBookingModal