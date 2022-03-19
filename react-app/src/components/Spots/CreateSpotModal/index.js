import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import CreateSpotForm from "./CreateSpotForm"

const CreateSpotModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="create-spot-modal-container"  >
            {/* 
            <div className="create-spot-button" onClick={() => setShowModal(true)} >
                Add a Spot!
            </div> */}
            <button className="create-spot-button" onClick={() => setShowModal(true)} >
                <span className="create-spot-button-text">
                    Add a Spot!

                </span>
            </button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateSpotForm setShowModal={setShowModal} />
                    </Modal>
                )
            }
        </div >
    )
}

export default CreateSpotModal