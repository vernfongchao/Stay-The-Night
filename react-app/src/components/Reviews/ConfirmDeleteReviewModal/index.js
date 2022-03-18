import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import ConfirmDeleteReview from "./ConfirmDeleteReview"

const ConfirmDeleteReviewModal = ({id}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="create-spot-modal-container">
            <button onClick={() => setShowModal(true)} >
                Delete
            </button>
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