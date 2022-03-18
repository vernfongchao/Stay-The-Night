from app.models import db, Review

def seed_reviews():
    review1 = Review(
        user_id=2,
        spot_id=1,
        rating=4,
        review="Absolutely amazing house! The check in process was incredibly simple and easy. Once we got into the home, everything was absolutely perfect! The decor was top notch, amenities were convenient and clean, and the listing is in close proximity to attractions in the area. I haven't stayed in a better airbnb in the area and would definitely stay again. The host was attentive the entire time and incredibly courteous. I would highly recommend this airbnb!"
    )
    review2 = Review(
        user_id=3,
        spot_id=1,
        rating=5,
        review="Do not miss out on experiencing heaven on earth at this farm stay. This was a surprise for Mom's birthday after spending a very windy day on Peaches to Beaches, Brunswick to Barnesville. The guest house was so warm and inviting and feels like a big hug taking you back in time to simpler times. Mom & I opted for the 2 twin beds which were very comfortable. Outside is full of wonderful surprises and picture perfect moments around every corner. The farm animals are adorable and give a glimpse of a life we've always wondered about. They have the absolute best welcoming committee....2 of the most lovable dogs we've ever met. Endless games of fetch and hugs are guaranteed. Planning a return visit already."
    )
    review3 = Review(
        user_id=4,
        spot_id=1,
        rating=5,
        review="This was a great place to bring in a 40th birthday! It was so quiet and peaceful. I have been to a few airbnbs but this one looks exactly like the pictures which I was so excited about! The hot tub was a BIG PLUS! And the house were great any questions that I had no matter what time of day they responded back immediately! If you ever go through KP for your Airbnb experience you should go check out a place called Culture they have wonderful live music and food!"
    )
    review4 = Review(
        user_id=1,
        spot_id=2,
        rating=4,
        review="The house was exactly what was portrayed in the photo. A few things needed to be fixed, nothing too much, we still had a blast. It definitely was a great home. Only issues that we had was that prior to arrival we were told “you guys will have the jacuzzi to enjoy the first night” when we weren’t even aware there was a jacuzzi and upon arrival we are told it actually isnt working and no one told us anything of that matter. And master bedroom sliding door was not locking, we advised them and no one came to fix it. We had to figure out a way to secure it ourselves. Also on our last full day at the residence , we noticed a leak under the sink . We were told to have someone stay at the house since maintenance will be arriving shortly. Maintenance never came that day and part of our group waited at home that entire day. Honestly, better communication would have made the stay a lot better."
    )
    review5 = Review(
        user_id=3,
        spot_id=2,
        rating=5,
        review="Anthony was awesome with communicating! Check-in and out was a breeze. The place was perfect for our team holiday event with ample space and bedrooms. Was clean. The hot tub didn't work for us so check that when you first get there, we waited till the evening and realized it to late for maintenance to come check it. Pool sticks need replaced and no chalk. For what we needed it for, it was great."
    )
    review6 = Review(
        user_id=4,
        spot_id=2,
        rating=5,
        review="I arrived with my husband and 4 children to getaway before school started this week in GA. The place was not cleaned or disinfected. I immediately contacted the hosts to report my findings. The mangers have no respect for the guests because they will ignore you or say you can’t be right even if proof pics are sent. The place is a hidden gem but the level of cleanliness is a joke during a pandemic. Killed 5 waterbugs/roaches, dirty dishes in cabinet, food on floors, food surrounding the pool, Confetti IN THE POOL (after they say that’s a strict rule of NO CONFETTI), sticky dining table, no chalk for pool sticks, cake box left on top of refrigerator, vending machine stole my sons money, ants all over kitchen counter and wall attracted to food and icing, dead mosquito on shower wall master bedroom, food left in cloths draw in another room, dirty washcloth still in hamper in another room. When pics were sent the only thing they want to do is send cleaners back to home so we can all be together. UMM NO."
    )
    review7 = Review(
        user_id=1,
        spot_id=3,
        rating=4,
        review="Do not miss out on experiencing heaven on earth at this farm stay. This was a surprise for Mom's birthday after spending a very windy day on Peaches to Beaches, Brunswick to Barnesville. The guest house was so warm and inviting and feels like a big hug taking you back in time to simpler times. Mom & I opted for the 2 twin beds which were very comfortable. Outside is full of wonderful surprises and picture perfect moments around every corner. The farm animals are adorable and give a glimpse of a life we've always wondered about. They have the absolute best welcoming committee....2 of the most lovable dogs we've ever met. Endless games of fetch and hugs are guaranteed. Planning a return visit already."
    )
    review8 = Review(
        user_id=2,
        spot_id=3,
        rating=5,
        review="We needed to travel into the area to watch our son wrestle, and found the cabin to stay in. We only got about 15 hours here, but I wanted to stay forever!!! Beautifully decorated with authentic ‘old’ decor. Super nice beds with ‘old’ quilts and chenille bedspreads. The cabin has all the modern amenities but feels like a step back in time. I loved the farm animals so much too!! This may be my favorite little Airbnb to date!!"
    )
    review9 = Review(
        user_id=4,
        spot_id=3,
        rating=5,
        review="We stayed overnight on a road trip at Paulette's place. The place is cosy and comfortable. While not luxurious, we were not wanting for any amenities either and loved the peace and quiet of farm life. We really enjoyed spending time with Paulette's dogs and only regret that we didn't stay longer. It is a very quiet, laid back place that was surprisingly not that distant from Atlanta."
    )
    db.session.add_all([review1,review2,review3,review4,review5,review6,review7,review8,review9])


    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()