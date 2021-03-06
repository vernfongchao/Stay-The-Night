from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FieldList
from wtforms.validators import DataRequired, NumberRange, Length


class SpotForm(FlaskForm):
    host_id = IntegerField("host_id", validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired("Name: Give a name for this spot"), Length(
        min=1, max=100, message='Name must be at least than 1 characters and no more than 100 characters')])
    address = StringField('address', validators=[DataRequired("Address: Please enter an address"), Length(
        min=1, max=50, message='Address must be at least than 1 characters and no more than 50 characters')])
    city = StringField('city', validators=[DataRequired("City: Please enter a city"), Length(
        min=1, max=20, message='City must be at least than 1 characters and no more than 20 characters')])
    state = StringField('state', validators=[DataRequired("State: Please enter a state"), Length(
        min=1, max=50, message='State must be at least than 1 characters and no more than 50 characters')])
    country = StringField('country', validators=[DataRequired("Country: Please enter a country"), Length(
        min=1, max=50, message='Country must be at least than 1 characters and no more than 50 characters')])
    description = StringField('description', validators=[DataRequired("Description: Please give a description"), Length(
        min=1, max=1000, message='Description name must be at least than 1 characters and no more than 1000 characters')])
    price = IntegerField('price', validators=[DataRequired("Price: Please enter an integer for price"), NumberRange(
        min=1, max=1000000, message='Price must be an integer between 1 and 1000000')])
    guest = IntegerField('guests', validators=[DataRequired("Guest: Please enter an integer for guests"), NumberRange(
        min=1, max=1000, message='Guest must be an integer between 1 and 1000')])
    bedroom = IntegerField('bedrooms', validators=[DataRequired("Bedroom: Please enter an integer for bedrooms"), NumberRange(
        min=1, max=1000, message=' Bedroom be between an integer 1 and 1000')])
    bathroom = IntegerField('bathrooms', validators=[DataRequired("Bathroom: Please enter an integer for bathrooms"), NumberRange(
        min=1, max=1000, message='Bathroom must be an integer between 1 and 1000')])
