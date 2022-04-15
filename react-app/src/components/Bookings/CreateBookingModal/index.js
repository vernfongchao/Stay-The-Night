import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../../context/Modal'
import CreateBookingForm from './CreateBookingForm'
import LoginForm from '../../auth/LoginFormModal/LoginForm'

const CreateBookingModal = () => {
    const [showModal, setShowModal] = useState(false)
    const user = useSelector(state=>state.session.user)


    
    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                <span>
                    Book!
                </span>
            </button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    {user ? <CreateBookingForm setShowModal={setShowModal} /> : <LoginForm />}
                    </Modal>
                )
            }
        </div>
    )
}

export default CreateBookingModal