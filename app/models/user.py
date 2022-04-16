from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    host = db.relationship("Host", back_populates='user', uselist=False)
    bookings = db.relationship("Booking", back_populates='user')
    reviews = db.relationship("Review", back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        if self.host and self.host.id:
            return {
                'id': self.id,
                'first': self.first_name,
                'last': self.last_name,
                'username': self.username,
                'email': self.email,
                'host_id': self.host.id,
                'bio': self.host.bio,
                'city': self.host.city,
                'state': self.host.state,
                'country': self.host.country,
            }
        else:
            return {
                'id': self.id,
                'first': self.first_name,
                'last': self.last_name,
                'username': self.username,
                'email': self.email,
            }
