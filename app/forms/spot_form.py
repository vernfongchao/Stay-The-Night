from decimal import Decimal
from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SubmitField,FieldList
from wtforms.validators import DataRequired, NumberRange
from app.forms.image_form import ImageForm


class SpotForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    price = IntegerField('price',validators=[DataRequired()])
    description = StringField('description',validators=[DataRequired()])
    guest = IntegerField('guests',validators=[DataRequired()])
    bedroom = IntegerField('bedrooms',validators=[DataRequired()])
    bathroom = IntegerField('bathrooms',validators=[DataRequired()])
    image = StringField("image", validators=[DataRequired()])
    
    # images = StringField('image')
    # submit = SubmitField('submit')
