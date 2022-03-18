import React, { useState } from "react"
import { Modal } from '../../../context/Modal'

const ConfirmDeleteReviewModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="create-spot-modal-container">
            <button onClick={() => setShowModal(true)} >
                Delete
            </button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        {/* <ConfirmDeletePage setShowModal={setShowModal}/> */}
                    </Modal>
                )
            }
        </div >
    )
}

export default ConfirmDeleteReviewModal