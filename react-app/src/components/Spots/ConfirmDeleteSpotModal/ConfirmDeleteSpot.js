import React from "react";
import { useDispatch } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import { deleteSpot } from "../../../store/spot";

const ConfirmDeletePage = ({setShowModal}) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async(e) => {
        e.preventDefault()
        const data = await dispatch(deleteSpot(id))
        console.log(data)
        if (data){
            history.push('/spots')
            setShowModal(false)
        }
    }

    return (
        <div>
            <button onClick={handleDelete}>
                Confirm Delete
            </button>
            <button onClick={()=> setShowModal(false)}>
                Cancel
            </button>
        </div>
    )
}

export default ConfirmDeletePage