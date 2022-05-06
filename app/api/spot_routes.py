from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Spot, Image, Amenity
from app.forms import SpotForm
import re
from operator import itemgetter
from app.s3_config import (
    upload_file_to_s3, allowed_file, get_unique_filename,delete_image_from_s3)

spot_routes = Blueprint('spots', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@spot_routes.route('/')
def get_spots():
    spots = Spot.query.all()
    return jsonify(
        [spot.to_dict() for spot in spots]
    )


@spot_routes.route('/<int:id>')
def get_spot(id):
    spot = Spot.query.get(id)
    return spot.to_dict()
    


@spot_routes.route('/images', methods=["POST"])
@login_required
def post_images():
    print('heyyy')
    if "image" not in request.files:
        return {"errors": ["image required"]}, 400

    image = request.files["image"]
    spot_id = request.form["spot_id"]

    if not allowed_file(image.filename):
        return {"errors": ["file type not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(spot_id=spot_id,image=url)
    db.session.add(new_image)
    db.session.commit()

    return {'message': "okay"}


@spot_routes.route('/images/<int:id>',methods = ["DELETE"])
@login_required
def delete_images(id):
    image = Image.query.get(id)
    name = request.form['image'].split('/')[-1]

    if 'amazonaws' in request.form['image']:
        delete_image_from_s3(name)

    db.session.delete(image)
    db.session.commit()
    return {'message': 'success'}


@spot_routes.route('/', methods=["POST"])
@login_required
def post_spot():
    
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    if form.validate_on_submit():
        if len(data['images']) < 1:
            return {'errors': ['Please upload at least 1 Image']}, 400

        spot = Spot()

        form.populate_obj(spot)

        db.session.add(spot)

        db.session.commit()

        amenity = Amenity(
            spot_id=spot.id,
        )
        db.session.add(amenity)
        db.session.commit()
        for amen in data["amenities"]:
            value = amen["value"]
            setattr(amenity, value, amen["boolean"])

        db.session.commit()

        return spot.to_dict()

    else:
        errors = validation_errors_to_error_messages(form.errors)
        if len(data['images']) < 1:
            errors.append('Please upload at least 1 Image')
        return {'errors': errors}, 400


@spot_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    if form.validate_on_submit():
        if len(data['images']) < 1:
            return {'errors': ['Please upload at least 1 Image']}, 400

        spot = Spot.query.get(id)

        form.populate_obj(spot)

        db.session.commit()


        amenity = Amenity.query.get(data["amenities_id"])
        for amen in data["amenities"]:
            value = amen["value"]
            setattr(amenity, value, amen["boolean"])

        db.session.commit()

        return spot.to_dict()

    else:
        errors = validation_errors_to_error_messages(form.errors)
        if len(data['images']) < 1:
            errors.append('Please upload at least 1 Image')
        return {'errors': errors}, 400


@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
    delete_spot = Spot.query.get(id)

    for image in  delete_spot.images:
        if 'amazonaws' in image.image:
            delete_image_from_s3(str(image.image).split('/')[-1])
    db.session.delete(delete_spot)
    db.session.commit()
    return delete_spot.to_dict()

    #    images = data["images"]

    #    for image in images:
    #        if (image["image"] == None):
    #             continue
    #         if (len(image["image"]) < 1):
    #             return {'errors': ["Missing Image Url Field input"]}, 400
    #         if(len(image["image"]) > 1000):
    #             return {'errors': ["Image Url must be shorter than 1000 characters"]}, 400
    #         else:
    #             url = image["image"]
    #             match = re.search(
    #                 r'.+\.(png|jpg|jpeg|gif)$', url)
    #             # match = re.search(
    #             #     r'http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$', url)
    #             if match == None:
    #                 return {'errors': ["Image url must end in .png, .jpg, .jpeg or .gif"]}, 400

    #      db.session.commit()



    #   for image in images:
    #        if (image["id"] == None):
    #             new_image = Image(
    #                 spot_id=id,
    #                 image=image["image"]
    #             )
    #             db.session.add(new_image)
    #         else:
    #             edit_image = Image.query.get(image["id"])
    #             if (image["image"]) == None:
    #                 db.session.delete(edit_image)
    #             else:
    #                 edit_image.image = image["image"]




    #  images = request.get_json()['images']

    #   for single_image in images:
    #        if (len(single_image["image"]) < 1):
    #             errors.append("Missing Image Url Field input")
    #             return {'errors': errors}, 400
    #         elif(len(single_image["image"]) > 1000):
    #             errors.append("Image Url must be shorter than 1000 characters")
    #             return {'errors': errors}, 400
    #         else:
    #             url = single_image["image"]
    #             match = re.search(
    #                 r'.+\.(png|jpg|jpeg|gif)$', url)
    #             # match = re.search(
    #             #     r'http[s]?\:\/\/.*\.(png|jpg|jpeg|gif)$', url)
    #             if match == None:
    #                 errors.append(
    #                     "Must be valid Image url ending in .png, .jpg, .jpeg or .gif")
    #                 return {'errors': errors}, 400
