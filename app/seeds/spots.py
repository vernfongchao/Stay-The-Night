from app.models import db, Spot

def seed_spots():
    spot1 = Spot(
        user_id=1, 
        address="18453 Martin Ave", 
        city="Homewood", 
        state="Illinois",
        country="USA",
        name="2 BR Modern Queen Suite w/ Hot Tub & Outdoor Oasis", 
        price= 249,
        description= "A Rare gem 💎in the heart of Homewood. This Quaint 2-bedroom remodeled home is charming, sophisticated and discrete. It is minutes away from the Metra station, golf course and downtown Homewood shops. The energy is very calm and quiet ☯️. This is the home away from home where details are everything and the pictures do not capture the essence of this luxurious space. Experience the love, the joy and the peace that continues to leave its mark.",
        guest = 4,
        bathroom = 2,
        bedroom= 2
    )
    spot2 = Spot(
        user_id=2, 
        address="1616 Battle Ln", 
        city="Monroe", 
        state="North Carolina",
        country="USA",
        name="★The Black Chateau★ Springbreak| Heated Pool in Living Room!!! | ♛Royal Beds | Pool Table", 
        price= 400,
        description= "Enjoy this 1800's home located conveniently near Historic downtown Monroe, NC. Monroe features a variety of activities for anyone looking for a weekend away from the city of Charlotte, NC. Enjoy wine tasting at local vineyards, shop antiques on the famous “Treasure Hunt”, or grab dinner downtown. Built in 1842, The Browning home place was once an inn for weary travelers! Come stay in the oldest standing structure in Monroe and enjoy a piece of history.",
        guest = 7,
        bathroom = 4,
        bedroom= 3
    )
    spot3 = Spot(
        user_id=3, 
        address="221 Cherokee Dr", 
        city="Barnesville", 
        state="Georgia",
        country="USA",
        name="The Guest House", 
        price= 49,
        description= "The Guest House is a primitive cottage and resides on 400 acres outside of Barnesville, Georgia. Bunn Ranch is a working cattle and sheep farm. This space is a two story primitive cottage with primitive artwork and a claw foot tub. Sit in your choice of antique rockers that have been collected over the years. The floors and stairs were salvaged from an old home that was here on the farm. Surrounded by rolling hills and close to town, come enjoy some time for YOU! We will consider STR students.",
        guest = 5,
        bathroom = 1,
        bedroom= 4
    )

    db.session.add(spot1)
    db.session.add(spot2)
    db.session.add(spot3)

    db.session.commit()


def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()
