from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Spot, db

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/user/<int:id>')
@login_required
def user_favorites(id):
    user_favorites = User.query.get(id)
    return {'user': user_favorites.to_favorite_dict(),
            'spot': []}


@favorite_routes.route('/spot/<int:id>')
def spot_favorites(id):
    spot_favorites = Spot.query.get(id)
    return {'spot': spot_favorites.to_favorite_dict(),
            'user': []}


@favorite_routes.route('/', methods=['POST'])
@login_required
def user_spots():
    data = request.get_json()
    user_id = data['user_id']
    spot_id = data['spot_id']
    print('======================================================', user_id, spot_id)

    user = User.query.get(user_id)
    spot = Spot.query.get(spot_id)

    user.spots.append(spot)
    db.session.commit()

    return {'spot': spot.to_favorite_dict(),
            'user': user.to_favorite_dict()}


@favorite_routes.route('/', methods=['Delete'])
@login_required
def delete_favorites():
    data = request.get_json()
    user_id = data['user_id']
    spot_id = data['spot_id']
    print('======================================================', user_id, spot_id)

    user = User.query.get(user_id)
    spot = Spot.query.get(spot_id)

    user.spots.remove(spot)
    db.session.commit()
    return {'spot': spot.to_favorite_dict(),
            'user': user.to_favorite_dict()}
