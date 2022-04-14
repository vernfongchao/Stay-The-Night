
from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from datetime import date
from app.models import Booking

# def past_date(form,field):
#     start_date = field.data
#     today = date.today()
#     print(start_date)
#     print(today)


def valid_booking(form, field):
    spot_id = field.data
    booking = form.data

    start_date = booking["start_date"].strftime('%Y-%m-%d')
    start_date_year = start_date[0:4]
    start_date_month = start_date[5:7]
    start_date_day = start_date[8:10]

    if(booking["end_date"] == None):
        return

    end_date = booking["end_date"].strftime('%Y-%m-%d')
    end_date_year = end_date[0:4]
    end_date_month = end_date[5:7]
    end_date_day = end_date[8:10]

    bookings = Booking.query.filter_by(spot_id=spot_id).all()

    if bookings:
        for booking in bookings:
            booking_start_date = booking.start_date.strftime('%Y-%m-%d')
            booking_start_date_year = booking_start_date[0:4]
            booking_start_date_month = booking_start_date[5:7]
            booking_start_date_day = booking_start_date[8:10]

            booking_end_date = booking.end_date.strftime('%Y-%m-%d')
            booking_end_date_year = booking_end_date[0:4]
            booking_end_date_month = booking_end_date[5:7]
            booking_end_date_day = booking_end_date[8:10]

            if ((start_date_year == booking_start_date_year)
                    and (start_date_month == booking_start_date_month)
                    and (int(start_date_day) >= int(booking_start_date_day))):
                if(int(start_date_year) < int(booking_end_date_year)):
                    raise ValidationError(
                        "This Spot is already Booked for these Dates")
                if((start_date_year == booking_end_date_year) and
                        (int(start_date_month) < int(booking_end_date_month))):
                    raise ValidationError(
                        "This Spot is already Booked for these Dates")
                if((start_date_year == booking_end_date_year) and (start_date_month == booking_end_date_month) and (int(start_date_day) <= int(booking_end_date_day))):
                    raise ValidationError(
                        "This Spot is already Booked for these Dates")

            if ((end_date_year == booking_start_date_year)
                    and (end_date_month == booking_start_date_month)
                    and (int(end_date_day) >= int(booking_start_date_day))):
                if(int(end_date_year) < int(booking_end_date_year)):
                    raise ValidationError(
                        "This Spot is already Booked for these Dates")
                if((end_date_year == booking_end_date_year) and
                        (int(end_date_month) < int(booking_end_date_month))):
                    raise ValidationError(
                        "This Spot is already Booked for these Dates")
                if((end_date_year == booking_end_date_year) and (end_date_month == booking_end_date_month) and (int(end_date_day) <= int(booking_end_date_day))):
                    raise ValidationError(
                        "This Spot is already Booked for these Dates")

class BookingForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    spot_id = IntegerField('User Id', validators=[
        DataRequired(), valid_booking])
    end_date = DateField('End Date', validators=[
                         DataRequired("Please Select an End Date")])
    start_date = DateField('Start Date', validators=[DataRequired()])
    guests = IntegerField('Guests', validators=[DataRequired()])
