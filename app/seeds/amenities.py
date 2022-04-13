from app.models import db, Amenity


def seed_amenities():
    amenity1 = Amenity(
        spot_id=1,
        parking=True,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=True,
    )
    amenity2 = Amenity(
        spot_id=2,
        parking=True,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=True,
    )
    amenity3 = Amenity(
        spot_id=3,
        parking=True,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=True,
    )
    amenity4 = Amenity(
        spot_id=4,
        parking=True,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=True,
    )
    amenity5 = Amenity(
        spot_id=5,
        parking=True,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=True,
    )
    amenity6 = Amenity(
        spot_id=6,
        parking=True,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=True,
    )
    db.session.add_all([amenity1,amenity2,amenity3,amenity4,amenity5,amenity6])
    db.session.commit()


def undo_amenities():
    db.session.execute('TRUNCATE amenities RESTART IDENTITY CASCADE;')
    db.session.commit()
