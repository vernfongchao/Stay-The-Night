import React, {useState} from "react"
import {Modal} from '../../../context/Modal'
import LoginForm from "./LoginForm"

const LoginFormModal = ({setShowMenu}) => {
    const [showModal,setShowModal] = useState(false)

    return (
        <div className= "login-form-modal-container">
            <div onClick={() => setShowModal(true)}>
                <p>Login</p>
            </div>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <LoginForm setShowMenu={setShowMenu}/>
                </Modal>
            )}
        </div>
    )
}

export default LoginFormModal