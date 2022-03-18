from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SubmitField,FieldList
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    spot_id = IntegerField("spot_id", validators=[DataRequired()])
    rating = IntegerField('ratings',validators=[DataRequired(),NumberRange(min=1, max=1000000, message='Number must be between 0 and 1000000')])
    review = StringField('reviews', validators=[DataRequired()])