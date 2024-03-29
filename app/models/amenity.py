from .db import db, environment, SCHEMA, add_prefix_for_prod


class Amenity(db.Model):
    __tablename__ = 'amenities'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spots.id")), nullable=False)
    parking = db.Column(db.Boolean, default=False, nullable=False)
    kitchen = db.Column(db.Boolean, default=False, nullable=False)
    pool = db.Column(db.Boolean, default=False, nullable=False)
    hottub = db.Column(db.Boolean, default=False, nullable=False)
    wifi = db.Column(db.Boolean, default=False, nullable=False)
    ac = db.Column(db.Boolean, default=False, nullable=False)
    self_check_in = db.Column(db.Boolean, default=False, nullable=False)
    pets = db.Column(db.Boolean, default=False, nullable=False)
    first_aid = db.Column(db.Boolean, default=False, nullable=False)
    fire_extinguisher = db.Column(db.Boolean, default=False, nullable=False)
    smoking = db.Column(db.Boolean, default=False, nullable=False)
    toilet_paper = db.Column(db.Boolean, default=False, nullable=False)
    soap = db.Column(db.Boolean, default=False, nullable=False)
    # parking = db.Column(db.Boolean, default=False, nullable=False)
    # parking = db.Column(db.Boolean, default=False, nullable=False)
    # parking = db.Column(db.Boolean, default=False, nullable=False)
    # parking = db.Column(db.Boolean, default=False, nullable=False)
    # parking = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    spot = db.relationship("Spot", back_populates="amenities")
