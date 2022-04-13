from app.models import db, Host

def seed_hosts():
    demo = Host(
        user_id=1, bio="demo", city="oakland", state="California")
    marnie = Host(
        user_id=2, bio="demo", city="oakland", state="California")
    bobbie = Host(
        user_id=3, bio="demo", city="oakland", state="California")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


def undo_hosts():
    db.session.execute('TRUNCATE hosts RESTART IDENTITY CASCADE;')
    db.session.commit()
