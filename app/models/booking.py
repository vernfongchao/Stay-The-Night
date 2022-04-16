from app.models.db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.id"), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="bookings", lazy='subquery')
    spot = db.relationship('Spot', back_populates='bookings', lazy='subquery')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id':self.user_id,
            'spot_id':self.spot_id,
            'guests': self.guests,
            'start_date':self.start_date,
            'end_date':self.end_date,
        }