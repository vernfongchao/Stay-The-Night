import React from "react"
// import { Modal } from '../../../context/Modal'
// import CreateSpotForm from "./CreateSpotForm"
import { Link } from "react-router-dom"

const CreateSpotModal = () => {
    // const [showModal, setShowModal] = useState(false)
    // onClick = {() => setShowModal(true)

    return (
        <div className="create-spot-modal-container"  >
            <button className="create-spot-button" >
                <Link to='/spots/add/new' className="create-spot-button-text">
                    <span >
                        Add a Spot!
                    </span>
                </Link>
            </button>
            {/* {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateSpotForm setShowModal={setShowModal} />
                    </Modal>
                )
            } */}
        </div >
    )
}

export default CreateSpotModal