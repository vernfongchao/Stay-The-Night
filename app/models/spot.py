from app.models.db import db


class Spot(db.Model):
    __tablename__ = 'spots'

    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey("hosts.id"), nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.BigInteger, nullable=False)
    description = db.Column(db.String, nullable=False)
    guest = db.Column(db.BigInteger, nullable=False)
    bathroom = db.Column(db.BigInteger, nullable=False)
    bedroom = db.Column(db.BigInteger, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    host = db.relationship("Host", back_populates="spots", lazy='subquery')
    images = db.relationship(
        'Image', back_populates='spot', cascade="all,delete")
    reviews = db.relationship(
        "Review", back_populates='spot', cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'host_id': self.host_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'guest': self.guest,
            'bathroom': self.bathroom,
            'bedroom': self.bedroom,
            'reviews': [{'id': review.id, 'rating': review.rating} for review in self.reviews],
            'first': self.host.user.first_name,
            'last': self.host.user.last_name,
            'images': [{'id': image.id, "image": image.image} for image in self.images]
        }
