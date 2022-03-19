from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FieldList
from wtforms.validators import DataRequired, NumberRange, Length


class SpotForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired(), Length(
        min=1, max=50, message='Address must be at least than 1 characters and no more than 50 characters')])
    city = StringField('city', validators=[DataRequired(), Length(
        min=1, max=50, message='City must be at least than 1 characters and no more than 50 characters')])
    state = StringField('state', validators=[DataRequired(), Length(
        min=1, max=50, message='State must be at least than 1 characters and no more than 50 characters')])
    country = StringField('country', validators=[DataRequired(), Length(
        min=1, max=50, message='Country must be at least than 1 characters and no more than 50 characters')])
    name = StringField('name', validators=[DataRequired(), Length(
        min=1, max=100, message='Name must be at least than 1 characters and no more than 100 characters')])
    price = IntegerField('price', validators=[DataRequired(), NumberRange(
        min=1, max=1000000, message='Number must be between 1 and 1000000')])
    description = StringField('description', validators=[DataRequired(), Length(
        min=1, max=1000, message='Description name must be at least than 1 characters and no more than 1000 characters')])
    guest = IntegerField('guests', validators=[DataRequired(), NumberRange(
        min=1, max=1000, message='Number must be between 1 and 1000')])
    bedroom = IntegerField('bedrooms', validators=[DataRequired(), NumberRange(
        min=1, max=1000, message='Number must be between 1 and 1000')])
    bathroom = IntegerField('bathrooms', validators=[DataRequired(), NumberRange(
        min=1, max=1000, message='Number must be between 1 and 1000')])
