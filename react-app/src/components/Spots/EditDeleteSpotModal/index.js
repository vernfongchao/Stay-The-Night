import React, { createContext, useContext, useState } from "react"
import { Modal } from '../../../context/Modal'
import EditDeleteMenu from "./EditDeleteMenu"

import './EditDeleteMenu.css'

export const EditDeleteContext = createContext()
export const useEditDeleteModal = () => useContext(EditDeleteContext)

const EditDeleteModal = () => {
    const [editDeleteModal, setEditDeleteModal] = useState(false)

    return (
        <EditDeleteContext.Provider
            value={{ editDeleteModal, setEditDeleteModal }}>
            <div className="edit-delete-modal-container">
                <div className="edit-delete-button-container" onClick={() => setEditDeleteModal(true)}>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>


                
                {editDeleteModal && (
                    <Modal onClose={() => setEditDeleteModal(false)}>
                        <EditDeleteMenu />
                    </Modal>
                )}
            </div>
        </EditDeleteContext.Provider>
    )
}

export default EditDeleteModal