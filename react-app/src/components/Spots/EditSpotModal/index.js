import React, {useState} from "react"
import {Modal} from '../../../context/Modal'
import EditSpotForm from "./EditSpotForm"

const EditFormModal = () => {
    const [showModal,setShowModal] = useState(false)

    return (
        <div className= "edit-form-modal-container">
            <div onClick={() => setShowModal(true)}>
                <p>Edit</p>
            </div>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <EditSpotForm/>
                </Modal>
            )}
        </div>
    )
}

export default EditFormModal