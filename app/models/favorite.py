from app.models.db import db

favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('spot_id', db.Integer, db.ForeignKey('spots.id'))
)
