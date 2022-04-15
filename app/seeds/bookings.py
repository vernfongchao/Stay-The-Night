from app.models import db, Booking


def seed_bookings():
    booking1 = Booking(
        user_id=1,
        spot_id=2,
        guests=3,
        start_date="April 15 2022",
        end_date="April 30 2022",
    )

    db.session.add(booking1)
    db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
