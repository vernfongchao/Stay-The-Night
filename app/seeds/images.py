from app.models import db, Image


def seed_images():
    image1 = Image(
        spot_id=1,
        image='https://a0.muscache.com/im/pictures/miso/Hosting-48392852/original/6751716c-5812-40ed-95d7-027d6a033a6a.jpeg?im_w=1200'
    )
    image2 = Image(
        spot_id=1,
        image='https://a0.muscache.com/im/pictures/miso/Hosting-48392852/original/c9bf8206-f853-47e0-b27d-be2422c6e313.jpeg?im_w=1200'
    )
    image3 = Image(
        spot_id=1,
        image='https://a0.muscache.com/im/pictures/miso/Hosting-48392852/original/78cf38b0-f76a-497e-a0b8-0fdd431d592d.jpeg?im_w=1200'
    )
    image4 = Image(
        spot_id=1,
        image='https://a0.muscache.com/im/pictures/miso/Hosting-48392852/original/98347eef-7b60-440d-8d7c-bb14767419c3.jpeg?im_w=1440'
    )
    image5 = Image(
        spot_id=1,
        image="https://a0.muscache.com/im/pictures/miso/Hosting-48392852/original/86e70ba3-98e4-4551-9fd8-9e667719ea1e.jpeg?im_w=1440"

    )
    image6 = Image(
        spot_id=2,
        image='https://a0.muscache.com/im/pictures/prohost-api/Hosting-46153431/original/80797805-86d8-41e7-ba6e-05bceb1f91f1.jpeg?im_w=1200'
    )
    image7 = Image(
        spot_id=2,
        image='https://a0.muscache.com/im/pictures/prohost-api/Hosting-46153431/original/1693f517-abc6-40f0-bfb2-1fb4c2437077.jpeg?im_w=1440'
    )
    image8 = Image(
        spot_id=2,
        image='https://a0.muscache.com/im/pictures/prohost-api/Hosting-46153431/original/16ca1e80-7083-442e-8328-37709016c1ce.jpeg?im_w=1440'
    )
    image9 = Image(
        spot_id=2,
        image='https://a0.muscache.com/im/pictures/prohost-api/Hosting-46153431/original/1f898a2b-e8fd-4c21-bb96-502b19c4c5e7.jpeg?im_w=1440'
    )
    image10 = Image(
        spot_id=2,
        image='https://a0.muscache.com/im/pictures/prohost-api/Hosting-46153431/original/165ec554-7f10-4d9d-9390-4c5b54d34680.jpeg?im_w=1200'
    )

    image11 = Image(
        spot_id=3,
        image='https://a0.muscache.com/im/pictures/fda15318-534f-4d53-88f2-e6053c971ccc.jpg?im_w=1440'
    )
    image12 = Image(
        spot_id=3,
        image='https://a0.muscache.com/im/pictures/bc5774ec-57b5-43cf-864d-4d13eb3785a7.jpg?im_w=1200'
    )

    image13 = Image(
        spot_id=3,
        image='https://a0.muscache.com/im/pictures/c6bb8255-7be7-44f2-83f5-6a6f4220bcc7.jpg?im_w=1440'
    )

    image14 = Image(
        spot_id=3,
        image='https://a0.muscache.com/im/pictures/30939c5b-bbe3-4ed9-aea0-ae0c3ad0ca9d.jpg?im_w=1440'
    )

    image15 = Image(
        spot_id=3,
        image='https://a0.muscache.com/im/pictures/49dfbadf-1a05-459a-8c93-bce20ec4f56f.jpg?im_w=1440'
    )




    db.session.add_all([image1,image2,image3,image4,image5])
    db.session.add_all([image6,image7,image8,image9,image10])
    db.session.add_all([image11,image12,image13,image14,image15])

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
