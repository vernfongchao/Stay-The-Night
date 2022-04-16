import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/review";

import './ConfirmDeleteReview.css'

const ConfirmDeleteReview = ({ id, setShowModal }) => {
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        e.preventDefault()
        const data = await dispatch(deleteReview(id))
        if (data) {
            setShowModal(false)
        }
    }





    return (
        <div className="confirm-delete-page-container">
            <div className='login-form-header-container'>
                <h1 className='login-form-header-text'> Warning!</h1>
            </div>
            <div className="confirm-delete-warning-text-container">
                <p>Warning! This command will be irreversible, are you sure you want to delete? </p>
            </div>
            <div className="confirm-delete-button-container">
                <button className="confirm-delete-button" onClick={handleDelete}>
                    Confirm Delete
                </button>
                <button className="confirm-cancel-button" onClick={() => setShowModal(false)}>
                    Cancel
                </button>

            </div>
        </div>
    )

}

export default ConfirmDeleteReview