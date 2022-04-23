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
    amenities = db.relationship(
        'Amenity', back_populates='spot', cascade="all,delete", uselist=False)
    images = db.relationship(
        'Image', back_populates='spot', cascade="all,delete")
    reviews = db.relationship(
        "Review", back_populates='spot', cascade="all,delete")
    bookings = db.relationship(
        "Booking", back_populates="spot",cascade="all,delete"
    )

    # user = db.relationship(
    #     'Spots', secondary=favorites, back_populates='user')

    def to_dict(self):

        return {
            'id': self.id,
            'host_id': self.host_id,
            'user_id':self.host.user.id,
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

            'amenities_id': self.amenities.id,

            'amenities': [
                {"label": "Parking", "value": "parking",
                    "boolean": self.amenities.parking},
                {"label": "Kitchen", "value": "kitchen",
                    "boolean": self.amenities.kitchen},
                {"label": "Pool", "value": "pool", "boolean": self.amenities.pool},
                {"label": "Hot-tub", "value": "hottub",
                    "boolean": self.amenities.hottub},
                {"label": "Wifi", "value": "wifi",
                    "boolean": self.amenities.wifi},
                {"label": "A.C.", "value": "ac",
                    "boolean": self.amenities.ac},
                {"label": "Self Check-in",
                 "value": "self_check_in", "boolean": self.amenities.self_check_in},
                {"label": "Pets", "value": "pets",
                    "boolean": self.amenities.pets},
                {"label": "First-aid", "value": "first_aid",
                    "boolean": self.amenities.first_aid},
                {"label": "Fire Extinguisher",
                    "value": "fire_extinguisher", "boolean": self.amenities.fire_extinguisher},
                {"label": "Smoking", "value": "smoking",
                    "boolean": self.amenities.smoking},
                {"label": "Toilet-Paper", "value": "toilet_paper",
                    "boolean": self.amenities.toilet_paper},
                {"label": "Soap", "value": "soap", "boolean": self.amenities.soap},
            ],
            'first': self.host.user.first_name,
            'last': self.host.user.last_name,
            'images': [{'id': image.id, "image": image.image} for image in self.images]
        }

    def to_favorite_dict(self):
        return[{'user_id': user.id} for user in self.user]