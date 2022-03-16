from app.models import db, Image

def seed_images():
    image1 = Image(
        spot_id=1,
        image='https://a0.muscache.com/im/pictures/miso/Hosting-48392852/original/6751716c-5812-40ed-95d7-027d6a033a6a.jpeg?im_w=1200'
    )
    image2 = Image(
        spot_id=2,
        image='https://a0.muscache.com/im/pictures/prohost-api/Hosting-46153431/original/80797805-86d8-41e7-ba6e-05bceb1f91f1.jpeg?im_w=1200'
    )
    image3 = Image(
        spot_id=3,
        image='https://a0.muscache.com/im/pictures/fda15318-534f-4d53-88f2-e6053c971ccc.jpg?im_w=1440'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()

    
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
