import React, { useEffect, useState } from "react"
import { Modal } from '../../../context/Modal'
import SignUpForm from "./SignUpForm"

const SignUpFormModal = ({ setShowMenu, setShowLoginModal }) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(()=> {
        console.log(showModal)
        if (showModal && setShowLoginModal) {
            console.log(showModal)
            console.log("hello")
            setShowLoginModal(false)
        }

    }, [showModal, setShowLoginModal])

    return (
        <div className="signup-form-modal-container">
            <div className="signup-form-button-container"
                onClick={() => {
                    setShowModal(true)
                    // setShowLoginModal(false)
                }}
            //   onClick={()=> {
            //       if (setShowLoginModal) {
            //           setShowLoginModal(false)
            //       } 
            //   }}  
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