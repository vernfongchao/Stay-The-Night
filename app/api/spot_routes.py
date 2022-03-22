from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Spot, Image
from app.forms import SpotForm
import re

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

        for image in images:
            if (len(image["image"]) < 1):
                return {'errors': ["Missing Image Url Field input"]}, 400
            else:
                url = image["image"]
                match = re.search(
                    r'\w+\.(png|jpg|jpeg|gif)$', url)
                # match = re.search(
                #     r'http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$', url)
                if match == None:
                    return {'errors': ["Image url must end in .png, .jpg, .jpeg or .gif"]}, 400

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

            if (len(single_image["image"]) < 1):
                errors.append("Missing Image Url Field input")
                return {'errors': errors}, 400
            else:
                url = single_image["image"]
                match = re.search(
                    r'\w+\.(png|jpg|jpeg|gif)$', url)
                # match = re.search(
                #     r'http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$', url)
                if match == None:
                    errors.append(
                        "Image url must end in .png, .jpg, .jpeg or .gif")
                    return {'errors': errors}, 400

        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@spot_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json()
        images = data["images"]

        for image in images:
            if (image["image"] == None):
                continue
            if (len(image["image"]) < 1):
                return {'errors': ["Missing Image Url Field input"]}, 400
            else:
                url = image["image"]
                match = re.search(
                    r'\w+\.(png|jpg|jpeg|gif)$', url)
                # match = re.search(
                #     r'http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$', url)
                if match == None:
                    return {'errors': ["Image url must end in .png, .jpg, .jpeg or .gif"]}, 400

        spot = Spot.query.get(id)

        form.populate_obj(spot)

        db.session.commit()

        for image in images:
            if (image["id"] == None):
                new_image = Image(
                    spot_id=id,
                    image=image["image"]
                )
                db.session.add(new_image)
            else:
                edit_image = Image.query.get(image["id"])
                if (image["image"]) == None:
                    db.session.delete(edit_image)
                else:
                    edit_image.image = image["image"]

        db.session.commit()

        return spot.to_dict()

    else:
        errors = validation_errors_to_error_messages(form.errors)
        images = request.get_json()['images']

        for single_image in images:
            if (len(single_image["image"]) < 1):
                errors.append("Missing Image Url Field input")
                return {'errors': errors}, 400
            else:
                url = single_image["image"]
                match = re.search(
                    r'\w+\.(png|jpg|jpeg|gif)$', url)
                # match = re.search(
                #     r'http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$', url)
                if match == None:
                    errors.append(
                        "Must be valid Image url ending in .png, .jpg, .jpeg or .gif")
                    return {'errors': errors}, 400

        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
    delete_spot = Spot.query.get(id)
    db.session.delete(delete_spot)
    db.session.commit()
    return delete_spot.to_dict()
