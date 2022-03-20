import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import EditReviewForm from "./EditReviewForm"

const EditReviewModal = ({review}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="edit-review-modal-container">
            <div className="edit-review-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="edit-review-modal-button">Edit</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReviewForm curr_review={review} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )

}

export default EditReviewModal