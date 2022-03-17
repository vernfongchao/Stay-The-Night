from decimal import Decimal
from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, SubmitField,FieldList
from wtforms.validators import DataRequired, NumberRange
from app.forms.image_form import ImageForm


# def price_number(form,field):
#     price = field.data["price"]
#     if not isinstance(price,float):
#         raise ValidationError("Price is not a number")

# def guest_number(form,field):
#     guest = field.data["guest"]
#     if isinstance(guest,float) == False:
#         raise ValidationError("Price is not a number")

# def bedroom_number(form,field):
#     bedroom = field.data["bedroom"]
#     if isinstance(bedroom,float) == False:
#         raise ValidationError("Price is not a number")

# def bathroom_number(form,field):
#     bathroom = field.data["bathroom"]
#     if isinstance(bathroom,float) == False:
#         raise ValidationError("Price is not a number")



class SpotForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    price = IntegerField('price',validators=[DataRequired("This field must only contain a number")])
    description = StringField('description',validators=[DataRequired()])
    guest = IntegerField('guests',validators=[DataRequired("This field must only contain a number")])
    bedroom = IntegerField('bedrooms',validators=[DataRequired("This field must only contain a number")])
    bathroom = IntegerField('bathrooms',validators=[DataRequired("This field must only contain a number")])

    # images =FieldList(StringField('image'))

    # image = StringField("image", validators=[DataRequired()])
    
    # images = StringField('image')
    # submit = SubmitField('submit')
