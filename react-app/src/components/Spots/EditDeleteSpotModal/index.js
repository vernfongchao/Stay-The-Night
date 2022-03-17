import React, { createContext, useContext, useState } from "react"
import { Modal } from '../../../context/Modal'
import EditDeleteMenu from "./EditDeleteMenu"

export const EditDeleteContext = createContext()
export const useEditDeleteModal = () => useContext(EditDeleteContext)

const EditDeleteModal = () => {
    const [editDeleteModal, setEditDeleteModal] = useState(false)

    return (
        <EditDeleteContext.Provider
            value={{ editDeleteModal, setEditDeleteModal }}>
            <div className="edit-delete-modal-container">
                <div onClick={() => setEditDeleteModal(true)}>
                    <p>...</p>
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