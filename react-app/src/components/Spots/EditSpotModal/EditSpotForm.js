import React,{useContext} from "react"
import { useParams } from "react-router-dom"
import { useEditDeleteModal } from "../EditDeleteSpotModal"


const EditSpotForm = () => {
    const { id } = useParams()
    console.log(id)
    const {seteditDeleteModal} = useEditDeleteModal()

    
    return (
        <>
        </>
    )
}

export default EditSpotForm