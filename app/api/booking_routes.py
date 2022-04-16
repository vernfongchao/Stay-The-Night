from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Booking
from app.forms import BookingForm

booking_routes = Blueprint("bookings", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@booking_routes.route('/')
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])

@booking_routes.route('/users/<int:id>')
def get_user_bookings(id):
    bookings = Booking.query.filter(Booking.user_id == id)
    return jsonify([booking.to_dict() for booking in bookings])



@booking_routes.route('/spot/<int:id>', methods=["POST"])
@login_required
def create_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_booking = Booking()
        form.populate_obj(new_booking)
        db.session.add(new_booking)
        db.session.commit()

        return new_booking.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@booking_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):
    delete_booking = Booking.query.get(id)
    db.session.delete(delete_booking)
    db.session.commit()
    return delete_booking.to_dict()


# @booking_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_spot(id):
#     delete_spot = Booking.query.get(id)
#     db.session.delete(delete_spot)
#     db.session.commit()
#     return delete_spot.to_dict()
