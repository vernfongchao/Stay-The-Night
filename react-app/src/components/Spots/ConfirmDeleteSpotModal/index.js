import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import ConfirmDeletePage from "./ConfirmDeleteSpot"

const ConfirmDeleteSpotModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="delete-spot-modal-container">
            <div className="delete-form-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="delete-form-modal-button">Delete</p>
            </div>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ConfirmDeletePage setShowModal={setShowModal} />
                    </Modal>
                )
            }
        </div >
    )
}

export default ConfirmDeleteSpotModal