from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FieldList
from wtforms.validators import DataRequired, NumberRange, Length


class ReviewForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    spot_id = IntegerField("spot_id", validators=[DataRequired()])
    rating = IntegerField('ratings', validators=[DataRequired("Rating: Please give a rating from 1 to 5"), NumberRange(
        min=1, max=5, message='Number must be between 1 and 5')])
    review = StringField('reviews', validators=[DataRequired("Review: Please leave a review"), Length(
        min=2, max=1000, message='Review must be at least than 2 characters and no more than 1000 characters')])
