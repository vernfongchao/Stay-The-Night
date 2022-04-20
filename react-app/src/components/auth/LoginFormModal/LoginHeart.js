import React, { useState } from "react"
import { Modal } from '../../../context/Modal'
import LoginForm from "./LoginForm"
import * as AiIcons from 'react-icons/ai'

const LoginHeartModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="login-form-modal-container">
            <div className="login-form-button-container"
                onClick={() => {
                    setShowModal(true)
                }}>
                <AiIcons.AiOutlineHeart className="details-page-heart-button" />
            </div>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                }
                }>
                    {<LoginForm />}
                </Modal>
            )}
        </div>
    )
}

export default LoginHeartModal