from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SubmitField,FieldList
from wtforms.validators import DataRequired, NumberRange

class ImageForm():
    image = StringField('image',validators=[DataRequired()])