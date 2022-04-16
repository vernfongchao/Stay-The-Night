import React, {useState } from "react"
import { Modal } from '../../../context/Modal'
import SignUpForm from "./SignUpForm"

const SignUpFormModal = ({ setShowMenu}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="signup-form-modal-container">
            <div className="signup-form-button-container"
                onClick={() => {
                    setShowModal(true)
                }}
            >

                <p className="signup-form-button-text">Sign Up</p>
            </div>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    if (setShowMenu) {
                        setShowMenu(false)
                    }
                }}>
                    <SignUpForm setShowMenu={setShowMenu} />
                </Modal>
            )}
        </div>
    )
}

export default SignUpFormModal