from app.models import db, Amenity


def seed_amenities():
    amenity1 = Amenity(
        spot_id=1,
        parking=False,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=False,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=False,
    )
    amenity2 = Amenity(
        spot_id=2,
        parking=True,
        kitchen=False,
        pool=True,
        hottub=True,
        wifi=True,
        ac=False,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=False,
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
        ac=False,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=False,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=False,
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
        parking=False,
        kitchen=True,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=False,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=True,
        soap=True,
        fire_extinguisher=False,
    )
    amenity6 = Amenity(
        spot_id=6,
        parking=True,
        kitchen=False,
        pool=True,
        hottub=True,
        wifi=True,
        ac=True,
        self_check_in=True,
        pets=True,
        first_aid=True,
        smoking=True,
        toilet_paper=False,
        soap=False,
        fire_extinguisher=True,
    )

    amenity7 = Amenity(
        spot_id=7,
        parking=True,
        kitchen=True,
        pool=False,
        hottub=False,
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

    amenity8 = Amenity(
        spot_id=8,
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

    db.session.add_all([amenity1,amenity2,amenity3,amenity4,amenity5,amenity6,amenity7,amenity8])
    db.session.commit()


def undo_amenities():
    db.session.execute('TRUNCATE amenities RESTART IDENTITY CASCADE;')
    db.session.commit()
