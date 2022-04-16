import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import HostForm from "./HostForm"

const BecomeHostModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="become-host-modal-container">
            <button className="become-host-button" onClick={() => setShowModal(true)}>
                <span className="become-spot-button-text">
                    Become a Host
                </span>
            </button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <HostForm setShowModal={setShowModal} />
                    </Modal>
                )
            }

        </div>
    )
}

export default BecomeHostModal