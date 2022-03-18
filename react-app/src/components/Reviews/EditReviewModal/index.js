import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import EditReviewForm from "./EditReviewForm"

const EditReviewModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="edit-review-modal-container">
            <div onClick={() => setShowModal(true)}>
                <p>Edit</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReviewForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )

}

export default EditReviewModal