from app.models import db, Spot


def seed_spots():
    spot1 = Spot(
        user_id=1,
        address="18453 Martin Ave",
        city="Homewood",
        state="Illinois",
        country="USA",
        name="2 BR Modern Queen Suite w/ Hot Tub & Outdoor Oasis",
        price=249,
        description="A Rare gem 💎in the heart of Homewood. This Quaint 2-bedroom remodeled home is charming, sophisticated and discrete. It is minutes away from the Metra station, golf course and downtown Homewood shops. The energy is very calm and quiet ☯️. This is the home away from home where details are everything and the pictures do not capture the essence of this luxurious space. Experience the love, the joy and the peace that continues to leave its mark.",
        guest=4,
        bathroom=2,
        bedroom=2
    )
    spot2 = Spot(
        user_id=2,
        address="1616 Battle Ln",
        city="Monroe",
        state="North Carolina",
        country="USA",
        name="★The Black Chateau★ Springbreak| Heated Pool in Living Room!!! | ♛Royal Beds | Pool Table",
        price=400,
        description="Enjoy this 1800's home located conveniently near Historic downtown Monroe, NC. Monroe features a variety of activities for anyone looking for a weekend away from the city of Charlotte, NC. Enjoy wine tasting at local vineyards, shop antiques on the famous “Treasure Hunt”, or grab dinner downtown. Built in 1842, The Browning home place was once an inn for weary travelers! Come stay in the oldest standing structure in Monroe and enjoy a piece of history.",
        guest=7,
        bathroom=4,
        bedroom=3
    )
    spot3 = Spot(
        user_id=3,
        address="221 Cherokee Dr",
        city="Barnesville",
        state="Georgia",
        country="USA",
        name="The Farm House",
        price=49,
        description="The Farm House is a primitive cottage and resides on 400 acres outside of Barnesville, Georgia. Bunn Ranch is a working cattle and sheep farm. This space is a two story primitive cottage with primitive artwork and a claw foot tub. Sit in your choice of antique rockers that have been collected over the years. The floors and stairs were salvaged from an old home that was here on the farm. Surrounded by rolling hills and close to town, come enjoy some time for YOU! We will consider STR students.",
        guest=5,
        bathroom=1,
        bedroom=4
    )
    spot4 = Spot(
        user_id=1,
        address="8845 Valley View St.",
        city="Elgin",
        state="Illinois",
        country="USA",
        name="Charming Elgin Home with a Great Location",
        price=117,
        description="Come enjoy this beautifully restored and charming historic home from the early 1920s. Our place is good for couples, families or for a getaway with friends. Outdoor space with fully fenced backyard. This 2 bed 1 bath has been fully restored and is absolutely adorable! Walking distance to downtown Elgin (less than one mile) and Metra station (only one hour train ride into the city!), and less than 5 minute drive to I-90. Relax and get cozy in this adorable space.",
        guest=5,
        bathroom=1,
        bedroom=2
    )
    spot5 = Spot(
        user_id=1,
        address="84 Mayfield St.",
        city="Richardson",
        state="TX",
        country="USA",
        name="⭑MODERN&CLEAN⭑ GREAT DEAL FOR TRAVEL WORK OR FUN",
        price=109,
        description="1 Bedroom, 1 Batheroom, with 2 75 inch TV's in bedroom and living room. A King size Bed with 6 pillows, A comfortable couch that can sleep a 3rd or 4th person. Kitchen has condiment, plates/bowls, spoon/forks, coffee machine, toaster, towels, toilet paper, q tips, lotion, a patio with furniture. Fridge has an Ice Maker machine. Laundry comes with detergent(You will have to buy more if you use up our own). Body wash, Shampoo/Conditioner is included(You will have to buy more if you use up our own). This space is designed for vacation and business travelers who are searching for a home away from home with the added amenities comparable to a 4 star hotel. Easy Self Check in, easy access from parking parking to home without a long walk, full gym, conference center and more.",
        guest=4,
        bathroom=1,
        bedroom=1
    )

    spot6 = Spot(
        user_id=1,
        address="942 Edgewood Dr.",
        city="Stow",
        state="OH",
        country="USA",
        name="The Lakeside Cottage",
        price=100,
        description="Spend time at the relaxing newly renovated cottage on Meadowbrook Lake. Location is nearby Summit Metro Parks, Blossom Music Center, and Sarah's Vineyard. Short distance from Brandywine and Bostin Mills Ski Resorts. This cottage features a beautiful view of the lake. If you are a nature lover, you will appreciate the many windows to enhance the view. The home is walking distance to the Meadowbrook Lake fishing dock, basketball courts, and playground.",
        guest=4,
        bathroom=1,
        bedroom=2
    )

    db.session.add_all([spot1, spot2, spot3, spot4, spot5, spot6])

    db.session.commit()


def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()
