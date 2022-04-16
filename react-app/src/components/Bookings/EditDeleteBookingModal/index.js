import React, { createContext, useContext, useState } from "react"
import EditDeleteBookingMenu from "./EditDeleteBookingMenu"

import { Modal } from '../../../context/Modal'
import * as BsIcons from 'react-icons/bs'

import './EditDeleteBookingModal.css'

export const EditDeleteBookingContext = createContext()
export const useEditDeleteBookingModal = () => useContext(EditDeleteBookingContext)

const EditDeleteBookingModal = ({ booking }) => {
    const [editDeleteModal, setEditDeleteModal] = useState(false)

    return (
        <EditDeleteBookingContext.Provider
            value={{ editDeleteModal, setEditDeleteModal }}>
            <div className="edit-delete-booking-modal-container">
                <div className="edit-delete-booking-modal-button-container">
                    <BsIcons.BsFillGearFill className="edit-delete-booking-modal-button" 
                    onClick={()=> setEditDeleteModal(true)}
                    />
                </div>
                {editDeleteModal && (
                    <Modal onClose={() => setEditDeleteModal(false)}>
                        <EditDeleteBookingMenu booking={booking}/> 
                    </Modal>
                )}
            </div>
        </EditDeleteBookingContext.Provider>
    )
}

export default EditDeleteBookingModal