from app.models import db, User, Spot

def seed_favorites():
    user1 = User.query.get(1)
    spot1 = Spot.query.get(2)
    user1.spots.append(spot1)

    db.session.commit()


def undo_favorites():
    db.session.execute('TRUNCATE favorites RESTART IDENTITY CASCADE;')
    db.session.commit()
