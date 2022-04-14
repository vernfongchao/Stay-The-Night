import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import CreateBookingForm from './CreateBookingForm'

const CreateBookingModal = () => {
    const [showModal, setShowModal] = useState(false)


    
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
                        <CreateBookingForm setShowModal={setShowModal} />
                    </Modal>
                )
            }
        </div>
    )
}

export default CreateBookingModal