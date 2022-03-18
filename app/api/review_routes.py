from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages


@review_routes.route('/')
def get_reviews():
    reviews = Review.query.all()
    return jsonify(
        [review.to_dict() for review in reviews]
    )


@review_routes.route('/spot/<int:id>', methods=["POST"])
@login_required
def post_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review()

        form.populate_obj(new_review)

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
