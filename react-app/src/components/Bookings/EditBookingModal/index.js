import React, { useState } from "react";
import { Modal } from '../../../context/Modal'
// import EditBookingForm from './EditBookingForm'

const EditBookingModal = ({ booking}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="edit-form-modal-container">
            <div className="edit-form-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="edit-form-modal-button">Edit</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* <EditSpotForm setShowModal={setShowModal} booking={booking} /> */}
                </Modal>
            )}
        </div>
    )
}
export default EditBookingModal