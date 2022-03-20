import React, {useState} from "react"
import {Modal} from '../../../context/Modal'
import EditSpotForm from "./EditSpotForm"

const EditFormModal = () => {
    const [showModal,setShowModal] = useState(false)

    return (
        <div className= "edit-form-modal-container">
            <div className="edit-form-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="edit-form-modal-button">Edit</p>
            </div>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <EditSpotForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}

export default EditFormModal