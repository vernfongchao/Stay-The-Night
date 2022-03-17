import React, { createContext, useContext, useState } from "react"
import { Modal } from '../../../context/Modal'
import EditDeleteMenu from "./EditDeleteMenu"

export const EditDeleteContext = createContext()
export const useEditDeleteModal = () => useContext(EditDeleteContext)

const EditDeleteModal = () => {
    const [editDeleteModal, seteditDeleteModal] = useState(false)

    return (
        <EditDeleteContext.Provider
            value={{ editDeleteModal, seteditDeleteModal }}>
            <div className="edit-delete-modal-container">
                <div onClick={() => seteditDeleteModal(true)}>
                    <p>...</p>
                </div>
                {editDeleteModal && (
                    <Modal onClose={() => seteditDeleteModal(false)}>
                        <EditDeleteMenu />
                    </Modal>
                )}
            </div>
        </EditDeleteContext.Provider>
    )
}

export default EditDeleteModal