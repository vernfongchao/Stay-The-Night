from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SubmitField,FieldList
from wtforms.validators import DataRequired, NumberRange


class SpotForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    price = IntegerField('price',validators=[DataRequired("This field must only contain a postive number"),NumberRange(min=1, max=1000000, message='Number must be between 1 and 1000000')])
    description = StringField('description',validators=[DataRequired()])
    guest = IntegerField('guests',validators=[DataRequired("This field must only contain a postive number"),NumberRange(min=1, max=1000000, message='Number must be between 1 and 1000000')])
    bedroom = IntegerField('bedrooms',validators=[DataRequired("This field must only contain a postive number"),NumberRange(min=1, max=1000000, message='Number must be between 1 and 1000000')])
    bathroom = IntegerField('bathrooms',validators=[DataRequired("This field must only contain a postive number"),NumberRange(min=1, max=1000000, message='Number must be between 1 and 1000000')])

