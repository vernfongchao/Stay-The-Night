from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.forms import HostForm
from app.models import User, Host, db

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@user_routes.route('/')
def users():
    users = User.query.all()
    return jsonify(
        [user.to_dict() for user in users]
    )


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/host', methods=["POST"])
@login_required
def host():
    # data = request.get_json()
    # data["user_id"]
    # data["isHost"]

    # user = User.query.get(data["user_id"])
    #user.host = data["isHost"]
    # db.session.commit()
    # return user.to_dict()

    form = HostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        host = Host()
        form.populate_obj(host)
        db.session.add(host)
        db.session.commit()

        user = User.query.get(host.user_id)

        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
