import React from "react";
import { useDispatch } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import { deleteReview } from "../../../store/review";

const ConfirmDeleteReview = ({id,setShowModal}) => {
    const dispatch = useDispatch()

    const handleDelete = async(e) => {
        e.preventDefault()
        const data = await dispatch(deleteReview(id))
        if (data){
            setShowModal(false)
        }
    }





    return(
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

export default ConfirmDeleteReview