import React, {useState} from "react"
import {Modal} from '../../../context/Modal'
import SignUpForm from "./SignUpForm"

const SignUpFormModal = ({setShowMenu}) => {
    const [showModal,setShowModal] = useState(false)

    return (
        <div className= "signup-form-modal-container">
            <div onClick={() => setShowModal(true)}>
                <p>Sign Up</p>
            </div>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <SignUpForm setShowMenu={setShowMenu}/>
                </Modal>
            )}
        </div>
    )
}

export default SignUpFormModal