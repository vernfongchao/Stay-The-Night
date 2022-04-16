from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length


class HostForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    bio = StringField('biography', validators=[DataRequired("Bio: Please give a Bio"), Length(
        min=1, max=500, message='Bio must be at least than 1 characters and no more than 500 characters')])
    city = StringField('city', validators=[DataRequired("City: Please enter your city"), Length(
        min=1, max=20, message='City must be at least than 1 characters and no more than 20 characters')])
    state = StringField('state', validators=[DataRequired("State: Please enter your state"), Length(
        min=1, max=50, message='State must be at least than 1 characters and no more than 50 characters')])
    country = StringField('country', validators=[DataRequired("Country: Please enter a country"), Length(
        min=1, max=50, message='Country must be at least than 1 characters and no more than 50 characters')])
