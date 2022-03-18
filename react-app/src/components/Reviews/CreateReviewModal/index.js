import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import CreateReviewForm from "./CreateReviewForm"

const CreateReviewModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="create-review-modal-container">
            <button onClick={() => setShowModal(true)}>
                Leave a Review
            </button>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm setShowModal={setShowModal} />
                </Modal>

            }

        </div>
    )
}

export default CreateReviewModal