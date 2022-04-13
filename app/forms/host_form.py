from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length

class HostForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    bio = StringField('biography', validators=[DataRequired("Bio: Please give a description"), Length(
        min=1, max=500, message='Bio must be at least than 1 characters and no more than 500 characters')])
    city = StringField('city', validators=[DataRequired("City: Please enter a city"), Length(
        min=1, max=50, message='City must be at least than 1 characters and no more than 50 characters')])
    state = StringField('state', validators=[DataRequired("State: Please enter a state"), Length(
        min=1, max=50, message='State must be at least than 1 characters and no more than 50 characters')])
