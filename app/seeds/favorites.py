from app.models import db, User, Spot

def seed_favorites():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    spot1 = Spot.query.get(1)
    spot2 = Spot.query.get(2)
    spot3 = Spot.query.get(3)
    spot4 = Spot.query.get(4)
    spot5 = Spot.query.get(5)
    spot6 = Spot.query.get(6)
    spot7 = Spot.query.get(7)
    spot8 = Spot.query.get(8)
    user1.spots.append(spot2)
    user1.spots.append(spot3)
    user1.spots.append(spot7)
    user1.spots.append(spot8)
    user2.spots.append(spot1)
    user2.spots.append(spot3)
    user2.spots.append(spot4)
    user2.spots.append(spot5)
    user2.spots.append(spot6)
    user2.spots.append(spot8)
    user3.spots.append(spot1)
    user3.spots.append(spot2)
    user3.spots.append(spot4)
    user3.spots.append(spot5)
    user3.spots.append(spot6)
    user3.spots.append(spot7)
    user4.spots.append(spot1)
    user4.spots.append(spot2)
    user4.spots.append(spot3)
    user4.spots.append(spot4)
    user4.spots.append(spot5)
    user4.spots.append(spot6)
    user4.spots.append(spot7)
    user4.spots.append(spot8)



    db.session.commit()


def undo_favorites():
    db.session.execute('TRUNCATE favorites RESTART IDENTITY CASCADE;')
    db.session.commit()
