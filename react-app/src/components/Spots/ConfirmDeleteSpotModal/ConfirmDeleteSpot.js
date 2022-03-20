import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteSpot } from "../../../store/spot";

import './ConfirmDeleteSpot.css'

const ConfirmDeletePage = ({ setShowModal }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()
        const data = await dispatch(deleteSpot(id))
        if (data) {
            history.push('/spots')
            setShowModal(false)
        }
    }

    return (
        <div className="confirm-delete-page-container">
            <div>
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

export default ConfirmDeletePage