from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Spot, Image
from app.forms import SpotForm

spot_routes = Blueprint('spots', __name__)


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
@login_required
def post_spot():
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json()
        images = data["images"]

        if len(images[0]["image"]) < 1:
            return {'errors': ["Please upload at least 1 Image"]}, 400

        for image in images:
            if (len(image["image"]) < 1):
                return {'errors': ["Please Remove Unused Image URL Fields"]}, 400

        spot = Spot()

        form.populate_obj(spot)

        db.session.add(spot)

        db.session.commit()

        for image in images:
            new_image = Image(
                spot_id=spot.id,
                image=image["image"]
            )
            db.session.add(new_image)

        db.session.commit()

        return spot.to_dict()

    else:
        errors = validation_errors_to_error_messages(form.errors)
        images = request.get_json()['images']


        for single_image in images:
            print("LENGTH ==============================================",len(single_image["image"]))
            if (len(single_image["image"]) < 1):
                errors.append("Missing Image Url Field input")
                return {'errors': errors}, 400

        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
