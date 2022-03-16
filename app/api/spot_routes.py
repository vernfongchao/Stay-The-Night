from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import db,Spot,Image
from app.forms import SpotForm

spot_routes = Blueprint('spots',__name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages

@spot_routes.route('/')
def get_spots():
    spots = Spot.query.all()
    print(spots)
    return jsonify(
        [spot.to_dict() for spot in spots]
    )

@spot_routes.route('/', methods=["POST"])
# @login_required
def post_spot():

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("/n/n THIS IS THE SPOT OBJECT /n/n===============================================================================", form.data)
        spot = Spot()
        
        form.populate_obj(spot)

        db.session.add(spot)

        db.session.commit()

        image = form.data['image']

        new_image = Image(
            spot_id = spot.id,
            image = image
        )
        
        db.session.add(new_image)
        db.session.commit()

        return spot.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400