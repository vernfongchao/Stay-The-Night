import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { getUserBookings } from "../../../store/booking";

import moment from "moment";

import './MyBookings.css'

const MyBookings = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const bookings = Object.values(useSelector(state => state.bookings)).reverse()


    if (user?.id !== +id) {
        history.push('/403-Unauthorized')
    }

    useEffect(() => {
        dispatch(getUserBookings(user.id))
    }, [dispatch])

    return (
        <div className="my-bookings-page-container">
            <div className="my-bookings-header-container">
                <h1>My Bookings</h1>
            </div>
            {bookings &&
                <div className="my-all-spots-container">
                    {
                        bookings.map((booking) => (
                            <div className="my-each-spot-container" key={booking.id}>
                                <Link to={`/spots/${spots[booking.spot_id].id}`}>
                                    <img
                                        className="my-each-spot-image"
                                        src={spots[booking.spot_id].images[0].image}
                                        alt={`spots #${booking.spot_id}`}
                                    // onError={handleImage}
                                    >
                                    </img>
                                </Link>
                                <div className="my-spots-basic-container">
                                    <div>
                                        <span>Start Date {moment(booking.start_date).format('MMMM D YYYY')}</span>
                                    </div>
                                    <div>
                                        <span>End Date {moment(booking.end_date).format('MMMM D YYYY')}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }


        </div>
    )
}
export default MyBookings