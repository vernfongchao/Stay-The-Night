from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FieldList
from wtforms.validators import DataRequired, NumberRange, Length


class ReviewForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    spot_id = IntegerField("spot_id", validators=[DataRequired()])
    rating = IntegerField('ratings', validators=[DataRequired(), NumberRange(
        min=1, max=5, message='Number must be between 1 and 5')])
    review = StringField('reviews', validators=[DataRequired(), Length(
        min=1, max=1000, message='Address must be at least than 1 characters and no more than 1000 characters')])
