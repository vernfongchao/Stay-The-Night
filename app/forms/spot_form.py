from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FieldList
from wtforms.validators import DataRequired, NumberRange, Length


class SpotForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired("Name: Give a name for this spot"), Length(
        min=1, max=100, message='Name must be at least than 1 characters and no more than 100 characters')])
    address = StringField('address', validators=[DataRequired("Address: Please enter an address"), Length(
        min=1, max=50, message='Address must be at least than 1 characters and no more than 50 characters')])
    city = StringField('city', validators=[DataRequired("City: Please enter a city"), Length(
        min=1, max=50, message='City must be at least than 1 characters and no more than 50 characters')])
    state = StringField('state', validators=[DataRequired("State: Please enter a state"), Length(
        min=1, max=50, message='State must be at least than 1 characters and no more than 50 characters')])
    country = StringField('country', validators=[DataRequired("Country: Please enter a country"), Length(
        min=1, max=50, message='Country must be at least than 1 characters and no more than 50 characters')])
    description = StringField('description', validators=[DataRequired("Description: Please give a description"), Length(
        min=1, max=1000, message='Description name must be at least than 1 characters and no more than 1000 characters')])
    price = IntegerField('price', validators=[DataRequired("Price: Please enter a number for price"), NumberRange(
        min=1, max=1000000, message='Price must be between 1 and 1000000')])
    guest = IntegerField('guests', validators=[DataRequired("Guest: Please enter a number for guests"), NumberRange(
        min=1, max=1000, message='Guest must be between 1 and 1000')])
    bedroom = IntegerField('bedrooms', validators=[DataRequired("Bedroom: Please enter a number for bedrooms"), NumberRange(
        min=1, max=1000, message=' Bedroom be between 1 and 1000')])
    bathroom = IntegerField('bathrooms', validators=[DataRequired("Bathroom: Please enter a number for bathrooms"), NumberRange(
        min=1, max=1000, message='Bathroom must be between 1 and 1000')])
