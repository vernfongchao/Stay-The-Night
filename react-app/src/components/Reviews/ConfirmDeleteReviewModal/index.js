import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import ConfirmDeleteReview from "./ConfirmDeleteReview"

const ConfirmDeleteReviewModal = ({id}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="create-spot-modal-container">
            <div className="delete-form-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="delete-form-modal-button">Delete</p>
            </div>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ConfirmDeleteReview id={id} setShowModal={setShowModal}/>
                    </Modal>
                )
            }
        </div >
    )
}

export default ConfirmDeleteReviewModal