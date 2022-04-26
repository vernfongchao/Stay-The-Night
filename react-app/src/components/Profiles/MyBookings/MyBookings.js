import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import EditDeleteBookingModal from "../../Bookings/EditDeleteBookingModal";

import moment from "moment";

import { motion } from 'framer-motion/dist/framer-motion'
import './MyBookings.css'

const MyBookings = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)
    const bookings = Object.values(useSelector(state => state.bookings)).reverse()


    const pastBookings = bookings?.filter(({ start_date }) => moment(start_date).add('days', 1) < moment().utcOffset(-7)).sort((a, b) => moment(b.end_date).valueOf() - moment(a.end_date).valueOf())
    const futureBookings = bookings?.filter(({ start_date }) => moment(start_date).add('days', 1) > moment().utcOffset(-7)).sort((a, b) => moment(a.start_date).valueOf() > moment(b.start_date).valueOf())

    if (user?.id !== +id) {
        history.push('/403-Unauthorized')
    }

    const handleImage = (e) => {
        e.target.src = "../../../../static/house1.jpg"
    }

    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        let timer = setTimeout(() => setHidden(true), 50)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [dispatch])

    return (
        <motion.div
            className={hidden ? "my-bookings-page-container my-bookings-page-container-active" : "my-bookings-page-container"}
            // intial={{ opacity: 0 }}
            // animate={{ opacity:1 ,transition: {
            //     duration: 1
            // } }}
            // exit={{ opacity: 0 }}

        >
            <div className="my-bookings-header-container">
                {bookings.length ? <h1>My Bookings</h1> : <h1>No Bookings Made</h1>}
            </div>
            <div>
                {futureBookings.length ? <h1>Oncoming Bookings</h1> : null}
            </div>
            {futureBookings &&
                <div className="my-all-spots-container">
                    {
                        futureBookings.map((booking) => (
                            <div className="my-each-spot-container" key={booking.id}>
                                <EditDeleteBookingModal booking={booking} />
                                <Link to={`/spots/${spots[booking.spot_id].id}`}>
                                    <img
                                        className="my-each-spot-image"
                                        src={spots[booking.spot_id].images[0].image}
                                        alt={`spots #${booking.spot_id}`}
                                        onError={handleImage}
                                    >
                                    </img>
                                </Link>
                                <div className="my-spots-basic-container">
                                    <div>
                                        <span>Start Date {moment(booking.start_date).add('days', 1).format('MMMM D YYYY')}</span>
                                    </div>
                                    <div>
                                        <span>End Date {moment(booking.end_date).add('days', 1).format('MMMM D YYYY')}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            <div className="my-bookings-past-header">
                {pastBookings.length ? <h1>Past & On-Going Bookings</h1> : null}
            </div>
            {pastBookings &&
                <div className="my-all-spots-container">
                    {
                        pastBookings.map((booking) => (
                            <div className="my-each-spot-container" key={booking.id}>
                                <Link to={`/spots/${spots[booking.spot_id].id}`}>
                                    <img
                                        className="my-each-spot-image"
                                        src={spots[booking.spot_id].images[0].image}
                                        alt={`spots #${booking.spot_id}`}
                                        onError={handleImage}
                                    >
                                    </img>
                                </Link>
                                <div className="my-spots-basic-container">
                                    <div>
                                        <span>Start Date {moment(booking.start_date).add('days', 1).format('MMMM D YYYY')}</span>
                                    </div>
                                    <div>
                                        <span>End Date {moment(booking.end_date).add('days', 1).format('MMMM D YYYY')}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </motion.div>
    )
}
export default MyBookings