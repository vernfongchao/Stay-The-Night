from app.models import db, Booking


def seed_bookings():
    booking1 = Booking(
        user_id=1,
        spot_id=2,
        guests=3,
        start_date="April 1 2022",
        end_date="April 15 2022",
    )

    booking2 = Booking(
        user_id=1,
        spot_id=2,
        guests=1,
        start_date="June 15 2022",
        end_date="June 30 2022",
    )
    booking3 = Booking(
        user_id=1,
        spot_id=3,
        guests=1,
        start_date="April 15 2022",
        end_date="April 16 2022",
    )
    booking4 = Booking(
        user_id=1,
        spot_id=3,
        guests=1,
        start_date="June 1 2022",
        end_date="June 15 2022",
    )
    booking5 = Booking(
        user_id=1,
        spot_id=7,
        guests=1,
        start_date="April 15 2022",
        end_date="April 30 2022",
    )
    booking6 = Booking(
        user_id=1,
        spot_id=7,
        guests=1,
        start_date="June 16 2022",
        end_date="June 19 2022",
    )
    booking7 = Booking(
        user_id=1,
        spot_id=8,
        guests=1,
        start_date="April 10 2022",
        end_date="April 25 2022",
    )
    booking8 = Booking(
        user_id=1,
        spot_id=8,
        guests=1,
        start_date="June 15 2022",
        end_date="June 26 2022",
    )
    db.session.add_all([booking1, booking2, booking3,
                       booking4, booking5, booking6, booking7, booking8])
    db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
