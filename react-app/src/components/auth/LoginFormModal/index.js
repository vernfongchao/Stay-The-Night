import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import LoginForm from "./LoginForm"

const LoginFormModal = ({ setShowMenu}) => {
    const [showModal, setShowLoginModal] = useState(false)

    return (
        <div className="login-form-modal-container">
            <div className="login-form-button-container"
                onClick={() => {
                    setShowLoginModal(true)
                }}>
                <p className="login-form-button-text">Log in</p>
            </div>
            {showModal && (
                <Modal onClose={() => {
                    setShowLoginModal(false)
                    setShowMenu(false)
                }
                    }>
                    <LoginForm setShowMenu={setShowMenu} setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
        </div>
    )
}

export default LoginFormModal