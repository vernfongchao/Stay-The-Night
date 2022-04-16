from app.models import db, Host


def seed_hosts():
    demo = Host(
        user_id=1, bio="Hello, everyone! We are Demo Lition and Marnie Lition, your vacation rental hosts and founders of SWAY, a personal, vacation rental host marketing and management company for short term, vacation rental properties, currently located in Port Aransas, TX and have recently expanded into Corpus Christi on the North Padre Island side. We are a family owned business that sprung from our love of real estate, and passion for hospitality, business AND the beach!", city="Oakland", state="California", country="United States")
    marnie = Host(
        user_id=2, bio="Hello, everyone! We are Marnie Lition and Demo Lition, your vacation rental hosts and founders of SWAY, a personal, vacation rental host marketing and management company for short term, vacation rental properties, currently located in Port Aransas, TX and have recently expanded into Corpus Christi on the North Padre Island side. We are a family owned business that sprung from our love of real estate, and passion for hospitality, business AND the beach!", city="Oakland", state="California", country="United States")
    bobbie = Host(
        user_id=3, bio="We love traveling, exploring new places and meeting new people. We always try to look for the road less traveled, so we are thankful that Airbnb has given us a platform to share a unique way to visit special places like Telluride, Austin and the Texas coast in Port Aransas. We take great pride and satisfaction knowing that people love staying at our homes and get to experience a better way to travel.", city="Oakland", state="California", country="United States")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


def undo_hosts():
    db.session.execute('TRUNCATE hosts RESTART IDENTITY CASCADE;')
    db.session.commit()
