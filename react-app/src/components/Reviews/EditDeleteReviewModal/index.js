import React, { createContext, useContext, useState } from "react"
import { Modal } from '../../../context/Modal'
import EditDeleteReviewMenu from "./EditDeleteReviewMenu"

export const EditDeleteReviewContext = createContext()
export const useEditDeleteReviewModal = () => useContext(EditDeleteReviewContext)

const EditDeleteReviewModal = ({ review, id }) => {
    const [editDeleteReviewModal, setEditDeleteReviewModal] = useState(false)


    return (
        <EditDeleteReviewContext.Provider
            value={{ editDeleteReviewModal, setEditDeleteReviewModal }}>
            <div className="edit-delete-review-modal-container">
                <div className="edit-delete-review-modal-button" onClick={() => setEditDeleteReviewModal(true)}>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
                {editDeleteReviewModal && (
                    <Modal onClose={() => setEditDeleteReviewModal(false)}>
                        <EditDeleteReviewMenu review={review} id={id} />
                    </Modal>
                )}
            </div>
        </EditDeleteReviewContext.Provider>
    )
}

export default EditDeleteReviewModal