from .db import db, environment, SCHEMA, add_prefix_for_prod

favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('spot_id', db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')))
)
if environment == "production":
    favorites.schema = SCHEMA