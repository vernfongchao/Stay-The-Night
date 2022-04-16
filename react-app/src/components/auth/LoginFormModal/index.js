import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import LoginForm from "./LoginForm"

const LoginFormModal = ({ setShowMenu}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="login-form-modal-container">
            <div className="login-form-button-container"
                onClick={() => {
                    setShowModal(true)
                }}>
                <p className="login-form-button-text">Log in</p>
            </div>
            {showModal && (
                <Modal onClose={() =>  {
                    setShowModal(false)
                    setShowMenu(false)
                }
                    }>
                    {<LoginForm setShowMenu={setShowMenu}/>}
                </Modal>
            )}
        </div>
    )
}

export default LoginFormModal