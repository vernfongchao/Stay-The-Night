import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import CreateSpotForm from "./CreateSpotForm"
import { Link } from "react-router-dom"

const CreateSpotModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="create-spot-modal-container"  >
            <button className="create-spot-button" onClick={() => setShowModal(true)} >
                <Link to='/spots/add/new'>
                    <span className="create-spot-button-text">
                        Add a Spot!
                    </span>
                </Link>
            </button>
            {/* {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateSpotForm setShowModal={setShowModal} />
                    </Modal>
                )
            } */}
        </div >
    )
}

export default CreateSpotModal