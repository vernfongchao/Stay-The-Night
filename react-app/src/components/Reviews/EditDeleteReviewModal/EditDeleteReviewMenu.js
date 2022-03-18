import React from 'react'
import EditReviewModal from '../EditReviewModal'
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal'



const EditDeleteReviewMenu = ({review,id}) => {
    return(
        <div className='edit-delete-modal-menu'>
            <EditReviewModal review={review}/>
            <ConfirmDeleteReviewModal id={id}/>
        </div>
    )
}

export default EditDeleteReviewMenu