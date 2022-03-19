from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), Length(
        min=1, max=100, message='First name must be at least than 1 characters and no more than 100 characters')])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(
        min=1, max=100, message='Last name must be at least than 1 characters and no more than 100 characters')])
    username = StringField(
        'Username', validators=[DataRequired(), Length(min=1, max=40, message='Username must be at least than 1 characters and no more than 40 characters'), username_exists])
    email = StringField('Email', validators=[DataRequired(), Email("Email must be valid"), Length(
        min=1, max=50, message='Email must be at least than 1 characters and no more than 50 characters'), user_exists])
    password = StringField('Password', validators=[DataRequired(), EqualTo(
        "confirm_password", message="Passwords must match")])
    confirm_password = StringField(
        'Confirm Password', validators=[DataRequired()])
