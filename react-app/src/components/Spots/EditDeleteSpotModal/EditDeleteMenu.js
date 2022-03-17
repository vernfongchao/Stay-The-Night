import React,{ useState} from 'react'
import EditFormModal from '../EditSpotModal'
import ConfirmDeleteSpotModal from '../ConfirmDeleteSpotModal'
const EditDeleteMenu = () => {
    return(
        <div className='edit-delete-modal-menu'>
            <EditFormModal/>
            <ConfirmDeleteSpotModal />
        </div>
    )
}

export default EditDeleteMenu