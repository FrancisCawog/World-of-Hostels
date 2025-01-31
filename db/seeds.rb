require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Listing.destroy_all
    Room.destroy_all
    Reservation.destroy_all
    User.destroy_all
    Review.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('listings')
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('reservation')
    ApplicationRecord.connection.reset_pk_sequence!('rooms')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    u1 = User.create!(
        first_name: "Demo",
        last_name: "User",
        email: "demo_user@gmail.com",
        password: "Password123!",
        nationality: "United States",
        date_of_birth: "2000-10-10",
        age: 23
    )

    u1.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user1.jpeg"), filename: "/user1.jpeg")

    u2 = User.create!(
        first_name: "Paul",
        last_name: "Ramirez",
        email: "paulramirex@gmail.com",
        password: "Password123!",
        nationality: "Philippines",
        date_of_birth: "1997-05-11",
        age: 26
    )

    u2.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user10.jpeg"), filename: "/user10.jpeg")

    u3 = User.create!(
        first_name: "Francis",
        last_name: "Cawog",
        email: "franciscawog@gmail.com",
        password: "NewPassword123!",
        nationality: "United States",
        date_of_birth: "1997-05-11",
        age: 26
    )

    u3.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/FRA09244.jpg"), filename: "/FRA09244.jpg")
    
    u4 = User.create!(
        first_name: "John",
        last_name: "Smith",
        email: "johnsmith@gmail.com",
        password: "SecurePwd456!",
        nationality: "Canada",
        date_of_birth: "1990-08-25",
        age: 31
    )

    u4.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user7.jpeg"), filename: "/user7.jpeg")
    
    u5 = User.create!(
        first_name: "Alice",
        last_name: "Johnson",
        email: "alice.johnson@gmail.com",
        password: "Pass123!",
        nationality: "France",
        date_of_birth: "1985-12-18",
        age: 36
    )

    u5.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user3.jpeg"), filename: "/user3.jpeg")
    
    u6 = User.create!(
        first_name: "Eleanor",
        last_name: "Brown",
        email: "eleanor.brown@gmail.com",
        password: "BrownPwd789!",
        nationality: "United Kingdom",
        date_of_birth: "1992-03-22",
        age: 29
    )

    u6.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user4.jpeg"), filename: "/user4.jpeg")
    
    u7 = User.create!(
        first_name: "Michael",
        last_name: "Clark",
        email: "michael.clark@gmail.com",
        password: "ClarkPass456!",
        nationality: "Germany",
        date_of_birth: "1988-07-15",
        age: 33
    )

    u7.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user9.jpeg"), filename: "/user9.jpeg")
    
    u8 = User.create!(
        first_name: "Sophia",
        last_name: "Miller",
        email: "sophiamiller@gmail.com",
        password: "SophiaPwd123!",
        nationality: "India",
        date_of_birth: "1995-02-28",
        age: 27
    )

    u8.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user5.jpeg"), filename: "/user5.jpeg")
    
    u9 = User.create!(
        first_name: "Alyssa",
        last_name: "Anderson",
        email: "david.anderson@gmail.com",
        password: "Anderson123!",
        nationality: "Switzerland",
        date_of_birth: "1983-09-10",
        age: 38
    )

    u9.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user6.jpeg"), filename: "/user6.jpeg")
    
    u10 = User.create!(
        first_name: "Emily",
        last_name: "Taylor",
        email: "emily.taylor@gmail.com",
        password: "TaylorPwd789!",
        nationality: "Italy",
        date_of_birth: "1998-11-05",
        age: 23
    )

    u10.photo.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg"), filename: "/user8.jpeg")

    l1 = Listing.create!(
        property_name: "Mad Monkey Hostel",
        property_type: "hostel", 
        address: "55 Phra Sumen Road",
        city: "Bangkok",
        country: "Thailand",
        check_in: "14:00 - 23:00",
        check_out: "12:00",
        description: "Discover the best of Bangkok with Mad Monkey! The bustling capital of Thailand, Bangkok is a place where ancient temples, modern skyscrapers, vibrant street markets, and a rich cultural heritage blend into a captivating urban tapestry. We'll take your hostel experience to the next level with our signature Pub Crawls to the famous Khaosan Road and unforgettable Madventures city tours that will allow you to discover Bangkok like you never imagined! 
 
Enjoy a free welcome drink as soon as you arrive and indulge in a delectable offering of high-quality international cuisine and local flavors at Mad Monkey Bangkok. From smoothie bowls and delicious paninis to juicy burgers and authentic pad thai, we’ll be sure to satiate your every craving! BONUS: our bar is also the best place to start your night — listen to your favorite tunes, join in on some drinking games (see our nightly events below!) and meet other travelers from around the world!
        
        PERKS, AMENITIES & FACILITIES
        - FREE welcome drink
        - Swimming Pool
        - Private Rooms
        - Shared Dorms
        - Bar & Restaurant
        - 24h reception
        - Daily Tours
        - Nightly Events
        - Air Conditioning
        - Luggage Storage
        - WiFi
        - Travel & Tours Desk
        - Smoking Area
        - Female dorms
        
        DAILY TOURS & EVENTS
        Our Madventures are the best way to experience Bangkok!
        MON: Free City Session + Pub Quiz
        TUE: Canal Tour + Beer Olympics
        WED: Free City Session + Pub Crawl
        THU: Tuk Tuk Tour + Beer Pong Tournament
        FRI: Canal Tour + Music Quiz
        SAT: Pool Party + Games Night
        SUN: Chatuchak Market + Karaoke + Pub Crawl
        
        LOCATION
Our hostel is located right in the heart of the action for backpackers in Bangkok, just minutes away from the legendary Khao San Road. The hostel itself sits on a peaceful bend of Phra Sumen Road overlooking the canal and a few metres from a historic fort and a park on the Phra Sumen River. Our vibrant neighbourhood is full of restaurants, cafes, shops, convenience stores, and more!
        
        WHY CHOOSE MAD MONKEY?
Our goal at Mad Monkey is to create meaningful and sustainable travel experiences for our guests — we want to show you an epic time but also immerse you in the local culture and connect you to the communities you're exploring. Our socially responsible hostel has projects around Asia that directly supports the locals — building water wells, creating education funds, providing fair employment for our team, and so on. Your stay with us contributes to these efforts.", 
        facilities: {
            "Free" => ["Linen Included", "Free Wifi"],
            "General" => ["Security Lockers", "Swimming Pool", "Air Conditioning", "Hot Showers"],
            "Services" => ["Towels for hire", "Luggage Storage", "24 Hour Reception", "Tours/Travel Desk", "24 Hour Security", "Housekeeping"],
            "Food & Drink" => ["Restaurant", "Bar", "Meals Available"]
        },
        house_rules: "
1. Check-in Time: from 14:00 to 23:00. 
2. Check-out Time: before 12:00 (noon). 
3. Payment: Full balance must be paid in cash (THB) only upon checking in. Credit card processing fee is applicable when making a payment during check-in using a guest's credit card. 
4. Cancellation Policy: Cancellation: 7 Days advance notice is before arrival date is required.  
5. Age Restriction: Minors are not allowed.  
6. Reception working hours: 24 hours. 
7. No smoking inside the building. 
8. Pets are not allowed.",
        latitude: 13.763240,
        longitude: 100.496986,
        has_wifi?: true,
        has_breakfast?: false,
    )

    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/174.webp"), filename: "/174.webp")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/mp5y0nivmoqoqiubyxul.jpeg"), filename: "/mp5y0nivmoqoqiubyxul.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/r7xo3qa9tjp0uagmvi8b.jpeg"), filename: "/r7xo3qa9tjp0uagmvi8b.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/reznmebvzcrx7tdmrxpb.jpeg"), filename: "/reznmebvzcrx7tdmrxpb.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/zyrofspelqfwaym6yrb2.jpeg"), filename: "/zyrofspelqfwaym6yrb2.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/rrkqevybhnv8ljqy1j61.jpeg"), filename: "/rrkqevybhnv8ljqy1j61.jpeg")


    l2 = Listing.create!(
        property_name: "NapPark Hostel at Khao San",
        property_type: "hostel", 
        address: " 5 Tani Rd. (Banglampoo), Taladyod Phranakorn",
        city: "Bangkok",
        country: "Thailand",
        check_in: "12:00 - 24:00",
        check_out: "11:00", 
description: "This newly-opened hostel is perfectly located in the very centre of Bangkok. It is close to many tourist attractions, including the Grand Palace, Khao San Road, the Temple of Dawn, Wat Pho, and the famous nightlife and shopping of Bangkok.

Our hostel was specially designed for backpackers looking to experience a real Thai home styled with a colourful, friendly attitude, fun and a sociable atmosphere. NapPark Hostel is the #1 place to begin your Bangkok adventure, and is only two street away from Khao San Road. If you want to stay at a place that has the best natural social vibe, amazingcomfort and an ideal location, there is no better spot than NapPark.
Since 2011, NapPark has always been winning awardsin the Hoscars, and most recently in
2012 - 1st, Continent Winners Asia
- 1st, Country WinnerThailand
- 1st, Most popular Hostel Bangkok
- 3 rd, Worldwide Medium Hostel
2014 - 1st, Country Winner Thailand
2015 - 1st, Country Winner Thailand
- 1st, Most Popular Hostel Bangkok
2016 - 1st, Most Popular Hostel Bangkok
2017 - 1st, Most Popular Hostel Bangkok
2018 - 1st, Most Popular Hostel Bangkok


Surrounded by a garden, our hostel sleeps under a magnificent 150-year-old tamarind tree, giving us our name, NapPark. There are special Thai cushions and handicrafts in all communal areas. We want you to feel comfortable in this unique travellers home.

We offer the highest standard of amenities and commodities. You can relax in our comfortable beds with clean and stylish shower rooms. Wi-Fi is also accessible throughout the building.

Our standard and economy NapSpace is actually the same type of dorm but the position of economy beds are more easy to be disturbed by guest entering the room. So we discount those beds for very budget travellers.

Our friendly English-speaking staff are ready to welcome all guests and provide 24-hour service.

Our features include free individual lockers; free linens, towels, duvets, and luggage storage; free internet access and access to computers; free library of books, including travel guides; free maps and travelling advice; movies on NetFlix and free office supplies and facilities.

Do not miss your opportunity to stay at NapPark Hostel, the perfect base from which to explore Bangkok and beyond!

Please note that our dorms are not suitable for children under 12 years of age. Teenagers aged 13-16 years old should be accompanied by a parent.
",
        facilities: {
            "Free" => ["Linen Included", "Free Wifi", "Free City Maps", "Towels Included"],
            "General" => ["Security Lockers", "Key Card Access", "Common Room", "Air Conditioning", "Adapters", "Hot Showers", "Fridge/Freezer", "Utensils", "Dryer", "Cable TV", "Outdoor Terrace", "Reading Light", "Hair Dryers", "Ceiling Fan", "Iron/Ironing Board", "Safe Deposit Box", "Microwave", "Washing Machine"],
            "Services" => ["Laundry Facilities", "Airport Transfer", "Luggage Storage", "24 Hour Reception", "Tours/Travel Desk", "24 Hour Security", "Housekeeping", "Wake-up calls"],
            "Food & Drink" => ["Mini-Supermarket", "Tea & Coffee Making Facilities"],
            "Entertainment" => ["Board Games", "Games Room"]
        },
        house_rules: "
1. Check-in Time: from 14:00 to 23:00.
2. Check-out Time: before 12:00 (noon).
3. Payment: Full balance must be paid in cash (THB) upon check-in. Credit card processing fee is applicable.
4. Cancellation Policy: 7 days advance notice required.
5. Age Restriction: Minors are not allowed.
6. Reception working hours: 24 hours.
7. No smoking inside the building.
8. Pets are not allowed.",
        latitude: 13.765450,
        longitude: 100.486410,
        has_wifi?: true,
        has_breakfast?: false,
    )

    l2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/3.webp"), filename: "/3.webp")
    l2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/16.jpg"), filename: "/16.jpg")
    l2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/p5ihwqckpzyor2ak80se.webp"), filename: "/p5ihwqckpzyor2ak80se.webp")
    l2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/zks8zeccfbbpkdh5hcsm.webp"), filename: "/zks8zeccfbbpkdh5hcsm.webp")

    l3 = Listing.create!(
        property_name: "Jam Hostel Bangkok",
        property_type: "hostel",
        address: "No.9 Phrasumen Rd., Chanasongkram Phranakorn",
        city: "Bangkok",
        country: "Thailand",
        check_in: "15:00 - 22:00",
        check_out: "11:00",
        description: "Join our next communal dinner on Tuesday, February 6. The social time starts at 5:30 PM. DONT come late or youll miss the fun part! You can join us even if you dont stay at our hostel. Solo travelers can meet many other people at our event. Our chiefsll prepare delicious Thai food with vegetarian options. 180 THB cash only sign up at our front desk. We need to know your horoscope too. Feel free to come!

****
- Our front desk opens from 8 AM till 2 AM.
- We run group activities throughout every week. Solo travelers are welcome.
- On every Monday, we will go to take meditation class in the meditation center at Wat Arun. We'll meet up at 4 PM at our common area.
- On every Friday, unless there is an unexpected situation, we go to watch live Thai boxing matches in the stadium. The seats are free. Please sign up at our front desk. The meet up time is 4 PM.
- On the 15th of each month, we will join the monks and Thai people from the local community to clean up the temple of Wat Arun together. We'll meet up at 6 PM at our common area. The temple is very beautiful at night without any tourist inside.

Jam Hostel Bangkok is situated in the historical Phra Nakhon area, a few minutes walking away from Khao San road, nearby a Chao Phraya River pier and the airport shuttle bus station. Grand Palace, Wat Pho, and numerous temples and museums are all within walking distance.

At Jam, youll find:
- all the rooms have en-suite bathrooms with air conditioners and hot showers
- all the beds in dorms have curtains
- a common area with a well equipped kitchen and a terrace overlooking a canal
- free self-serviced breakfast
- a luggage room that you can store your bags before check in or after check out
- a self-serviced laundry room
- secure key card access to the hostel
- a rooftop bar that opens in the evening
- free WiFi with good signal throughout the hostel

Youll also find out that our hostel is more than just an accommodation, but also a community of backpackers that prioritizes adventures, one-of-a-kind travel experiences, independence, and meeting new people with kindness and compassion. Let us be your friends and guides for your journey in Bangkok and we’d like to take you to embrace the chaos and cultures of our beloved city Bangkok!",
        facilities: {
            "Free" => ["Free Breakfast", "Linen Included", "Towels Included", "Free WiFi", "Free City Tour"],
            "General" => ["Security Lockers", "Key Card Access", "Common Room", "Elevator", "BBQ", "Air Conditioning", "Adaptors", "Book Exchange", "Hot Showers", "Self-Catering Facilities", "Cooker", "Fridge/Freezer", "Utensils", "Dryer", "Cable TV", "Outdoor Terrace", "Reading Light", "Hair Dryers", "Iron / Ironing Board", "Safe Deposit Box", "Microwave", "Washing Machine"],
            "Services" => ["Laundry Facilities", "Airport Transfers", "Luggage Storage", "Tours/Travel Desk", "24 Hour Security", "Housekeeping", "Late check-out", "Reception (limited hours)", "Wake-up calls"],
            "Food & Drink" => ["Restaurant", "Bar", "Meals Available", "Tea & Coffee Making Facilities"],
            "Entertainment" => ["Board Games"]
        },
        house_rules: "
1. Amendment, Cancellation & No Show Pollicies
-No charge for notification of cancellation requests 72 hours preceding your scheduled arrival date (check-in date).
-One-night charge per room for amendment or cancellation submitted less than 72 hours prior to your scheduled arrival date (check-in date).
-One-night room rate will be charged per room for No Show and will result in the cancellation of your entire reservation.
-In the event of No Show without cancellation, Jam Hostel reserves the right to charge your credit card for the first night of each reserved room without further reference to you.
2. Check in/out
-Only (a) person(s) whose name(s) is/are in the reservations can check-in the room.
-Check-in time is after 14:00 (or upon availability) / Check-out time is 12:00 (noon)
-Valid passports (foreigners) or identification cards (Thai nationality only) are required at check-in.
-500 Bath Key Deposit will be taken when check-in and refund back when check-out.
3. Payment
-All payments will be settled upon guests check-in at our reception.
-Cash payment is preferred. Credit card payment will be added extra 3% from bank surcharge.
-Room/Key Deposit of THB 500 (cash only) will be collected upon guests check-in and will be returned after the check-out is completed.
4. Hostel Rules
-Behaviors of using drugs, alcohol abuse, stealing, or violence will be tolerated in Jam Hostel. Any of these will result in being asked to leave immediately and the cancellation of the entire stay without any refund.
-All the rooms and dormitory rooms are non-smoking and smoking is permitted in the assigned area only. Smoking in room will result a penalty charge of 2,000 THB (according to Thai Laws).
-Only the hostel's guests are allowed to enter the accommodation area and use the facilities in the common area.
-Pets are not allowed in Jam Hostel.
-The guest shall be charged accordingly in case of causing any damage to the hostel's property.
5. Age Restriction
-People under 18 years old are only allowed to stay in private rooms and are not allowed to stay in any shared dormitory room unless the room is booked by the entire family as a private dormitory room. Failure to this rule will result the immediate cancellation with the penalty charge of one night room fee per room or bed.

If you have any questions, please feel free to send us an email to us.",
        latitude: 14.188650,
        longitude: 100.637020,
        has_wifi?: true,
        has_breakfast?: true
        )

    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/48.webp"), filename: "/48.webp")
    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/bufyldnez4pywxurdhqa.jpeg"), filename: "/bufyldnez4pywxurdhqa.jpeg")
    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/hcqufz8q27r9rhrptqbq.webp"), filename: "/hcqufz8q27r9rhrptqbq.webp")
    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/ivdo8er7mbdtkkvwadgv.webp"), filename: "/ivdo8er7mbdtkkvwadgv.webp")
    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/usvnnfeltyxvwhxjspxt.webp"), filename: "/usvnnfeltyxvwhxjspxt.webp")
    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/ymgo9tf1o90nvxml8blr.jpeg"), filename: "/ymgo9tf1o90nvxml8blr.jpeg")
    l3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/yyaghk1fcyct46pkswqm.webp"), filename: "/yyaghk1fcyct46pkswqm.webp")

    l4 = Listing.create!(
        property_name: "Here Hostel",
        property_type: "hostel",
        address: " 196-3-8 Soi Damneon Klang Tai Ratchadamneon Rd., Bovornnivet, Phranakorn",
        city: "Bangkok",
        country: "Thailand",
        check_in: "14:00 - 22:00",
        check_out: "12:00",
        description: "Here Hostel is located in the old town of Bangkok or just a 5-10 minute walk from Khao San Road madness but far away enough to relax and chill at the same time. Our location is very close to the Grand Palace, Wat Pho and other main attractions especially the Metal Castle is just next to us.
Here Hostel is located in the old town of Bangkok or just a 5-10 minutes walk from the world-famous Khao San Road otherwise known as the 'Backpacker Paradise'. We are here for those who are party lovers who would like to enjoy the Bangkok nightlife walking street but far away enough to relax and chill at the same time. Our location is very close to the Grand Palace, Wat Pho, and especially the best PAD THAI restaurant is just only few steps away from us.

Introducing our new pride and joy- 'THERE BAR & GARDEN', a chilled-out garden bar with a laid-back atmosphere.

We are proud to have received a TripAdvisor Certificate of Excellence for 2016, 2017, and 2018.

The nearly 100-year-old building has been renovated under the concept of 'to keep the fascinating identity of traditional Thai livelihood'. The story of the traditional Thai style of living has been reflected through the decorating with our design as the new meets the old style. Stay HERE and you will get a taste of local life.

We offer a spacious lobby where you will get a surprise of our signature Slide, one of our playful designs, taking you directly down from the bedroom to a lobby getting a more fantastic way to explore the city. Our open-air communal area is where you can easily meet new friends or even other fellow travelers to start the trip together, yet chilling enough to be laid back when the trip has finished.

Each private or shared dormitory-style room provides air conditioning. All dormitory room has a curtain to provide maximum privacy in a shared space that makes you feel like you are living in a private room while having the chance to meet new friends.

Shared bathroom facilities include a shower and toiletries
Lock-up storage in carry-on baggage size and bedside space are available for dormitory-style rooms. Lockers are available.

Please feel free to email us for the map and directions to the hostel.

1). 24-hour reception on duty.

2). Check-in after 02:00 p.m. and check-out before noon.
***If you are arriving late to check in, please ring the bell at the entrance door, and our staff will attend to you shortly.

3). At check-in, we accept cash in THB and cards (a 3% card surcharge fee will apply for all transactions).

4). 3 days advance notice for free cancellation.
***If you cancel within the 3 days before arrival, you will be charged one night.
***For a non-refundable rate, guests will be charged the entire balance of their reservation at any time by the property after the booking confirmation. It cannot be refunded once we have charged regarding its booking terms and policy.
***Failure to check in on the scheduled check-in date will result in being charged the first night's cost but the entire balance for a non-refundable booking.
***Please send your request to customerservice@hostelworld.com for the deposit you have paid to Hostelworld.

5). Keycard deposit in THB cash is required upon check-in. You will get it back when you return the room keycard to our reception at check-out.

6). Breakfast is not included in the room rate. If you would like to have breakfast, we offer plenty of selections at There Bar and Cafe.

7). Left luggage service is available free of charge for 30 days. It is 100 THB per month after 30 days of leaving your luggage at the property.
***Please note that the property does not take responsibility for any loss or damage to your belongings or valuable items.

8). Towel is available for rent at the reception.

9). Daily room cleaning service starts from 12:00 pm to 02:00 pm.
The bedsheet can be changed every three nights of stay.

10). Please bring your padlock or buy it at the property.

11). We accept bookings for guests 12 years of age or over. No extra bed is provided.

12). Due to the house rules and regulations, outsiders are prohibited from entering the guest area. Bringing in an additional guest or a joiner who is not a registered guest will result in being fined.

13). Smoking is not permitted within the premises. Guests can smoke only in the designated areas.

14). Pets are not allowed in all the hostel areas.

15). Please download the map or call for directions to Here Hostel.

16.) Our swimming pool will be closed for maintenance from 30 Oct 2023 to 02 Nov 2023.",
        facilities: {
            "Free" => ["Linen Included", "Free City Maps", "Free WiFi"],
            "General" => ["Security Lockers", "Swimming Pool", "Key Card Access", "Common Room", "Bicycle Parking", "Air Conditioning", "Adaptors", "Book Exchange", "Hot Showers", "Self-Catering Facilities", "Fridge/Freezer", "Dryer", "Cable TV", "Outdoor Terrace", "Reading Light", "Parking", "Hair Dryers", "Ceiling fan", "Microwave"],
            "Services" => ["Towels for hire", "Luggage Storage", "24 Hour Reception", "Tours/Travel Desk", "24 Hour Security", "Housekeeping"],
            "Food & Drink" => ["Bar", "Cafe"],
            "Entertainment" => ["Board Games"]
        },
        house_rules: "
1). 24-hour reception on duty.

2). Check-in after 02:00 p.m. and check-out before noon.
***If you are arriving late to check in, please ring the bell at the entrance door, and our staff will attend to you shortly.

3). At check-in, we accept cash in THB and cards (a 3% card surcharge fee will apply for all transactions).

4). 3 days advance notice for free cancellation.
***If you cancel within the 3 days before arrival, you will be charged one night.
***For a non-refundable rate, guests will be charged the entire balance of their reservation at any time by the property after the booking confirmation. It cannot be refunded once we have charged regarding its booking terms and policy.
***Failure to check in on the scheduled check-in date will result in being charged the first night's cost but the entire balance for a non-refundable booking.
***Please send your request to customerservice@hostelworld.com for the deposit you have paid to Hostelworld.

5). Keycard deposit in THB cash is required upon check-in. You will get it back when you return the room keycard to our reception at check-out.

6). Breakfast is not included in the room rate. If you would like to have breakfast, we offer plenty of selections at There Bar and Cafe.

7). Left luggage service is available free of charge for 30 days. It is 100 THB per month after 30 days of leaving your luggage at the property.
***Please note that the property does not take responsibility for any loss or damage to your belongings or valuable items.

8). Towel is available for rent at the reception.

9). Daily room cleaning service starts from 12:00 pm to 02:00 pm.
The bedsheet can be changed every three nights of stay.

10). Please bring your padlock or buy it at the property.

11). We accept bookings for guests 12 years of age or over. No extra bed is provided.

12). Due to the house rules and regulations, outsiders are prohibited from entering the guest area. Bringing in an additional guest or a joiner who is not a registered guest will result in being fined.

13). Smoking is not permitted within the premises. Guests can smoke only in the designated areas.

14). Pets are not allowed in all the hostel areas.",
        latitude: 13.756270,
        longitude: 100.500420,
        has_wifi?: true,
        has_breakfast?: false
        )

    l4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/oesssr8cwq3mvb6fsbdb.jpeg"), filename: "/oesssr8cwq3mvb6fsbdb.jpeg")
    l4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/1.webp"), filename: "/1.webp")
    l4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/uxs6e8qkghf02j8plfvs.jpeg"), filename: "/uxs6e8qkghf02j8plfvs.jpeg")
    l4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/luyrwyseihauhgtdkpca.jpeg"), filename: "/luyrwyseihauhgtdkpca.jpeg")
    l4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/yqfmx1ujwjw3v3kzrznf.webp"), filename: "/yqfmx1ujwjw3v3kzrznf.webp")
  
    l5 = Listing.create!(
        property_name: "Back Home Backpackers",
        property_type: "hostel",
        address: "72/1 Samsen Rd.(soi 2), Banglampoo, Pranakorn",
        city: "Bangkok",
        country: "Thailand",
        check_in: "15:00 - 23:00",
        check_out: "12:00",
        description: "Backhome Backpackers Hostel is within a 5-minute walk of the action of Khao San Road in a quiet street that provides peace and quiet after an exciting night out.

Our hostel has 36 mixed dormitory beds, a 4-bed female-only dormitory as well as 23 private rooms featuring single, twin, double and triple accommodation. The mixed dormitory beds each have power points and reading lights as well as huge comfy mattresses and privacy curtains where there are the lower bunks. Each private room has its own bathroom and shower. Lockers are provided for the dormitory beds whilst the private rooms are individually locked.

All private rooms have air conditioning whilst dormitories are airconditioned from 7:00pm to 11:00am and are kept clean and safe for our many international guests. All guests are provided with a fresh towel and a smile on arrival.

The private rooms and dormitories share a newly renovated ground floor bar and chill-out area where we provide free chilled drinking water as well as games, books, guitars, art supplies and the like for your entertainment.

Stay with us and join our daily activities and games which will make your stay memorable.

1. Family Dinners
The concept is to sit together and enjoy a nice cozy dinner with the Back Home Backpackers family with various choices of Thai Food.
2. Cooking Classes
We will teach you how to cook the famous dishes of Thailand (Pad Thai and Spring Rolls) from ingredients shopping to the serving on a plate.
3. Movie Night
4. Tuk Tuk Tour - Enjoy an exciting night out with our Tuk Tuk Tour Programme. You will never forget the night of charming city
5. Beer Pong
One of the most popular games at parties. We know you will love it!
6. Quiz Night
Enjoy our Quiz Night with fun quiz questions and answers

We also have a tourist licence so we can provide, bus tickets, train tickets, tours, scuba diving licence courses and other interesting things to do in Thailand. There are numerous family restaurants nearby as well as a laundry, convenience store, ATM’s and street food outlets.

Things to note about our hostel:

• Payment is by cash only upon arrival
• We have 24-hour staff to provide assistance, care and advice
• Late check-ins are welcome
• Our bar and chill-out area closes between 11:00pm and midnight
• Normal check-in is from 2:00pm
• If you arrive before 2:00pm and your bed or room is available, we can check you in immediately
• If we are fully booked, you will be checked into your bed or room as soon as it is free and prepared
• If you expect to check in after 10:00pm please email or call us to confirm your check-in time
• Our rooms are not suitable for children
• The dormitory bunk beds are for one person per mattress and if this is not followed, we will charge you for the extra person
• Guests will have 24-hour access to their beds or rooms
• Smoking is not allowed in the rooms and balcony
• We offer additional continental breakfast for 129 Baht at the property",
        facilities: {
            "Free" => ["Linen Included", "Free City Maps", "Towels Included", "Free WiFi"],
            "General" => ["Security Lockers", "Common Room", "Air Conditioning", "Book Exchange", "Hot Showers", "Outdoor Terrace", "Safe Deposit Box"],
            "Services" => ["Internet access", "Laundry Facilities", "Luggage Storage", "24 Hour Reception", "Tours/Travel Desk", "ATM", "24 Hour Security", "Housekeeping", "Late check-out"],
            "Food & Drink" => ["Bar", "Meals Available", "Tea & Coffee Making Facilities"],
            "Entertainment" => ["Board Games", "Wi-Fi"]
        },
        house_rules: "
• Payment is by cash only upon arrival
• We have 24-hour staff to provide assistance, care and advice
• Late check-ins are welcome
• Our bar and chill-out area closes between 11:00pm and midnight
• Normal check-in is from 2:00pm
• If you arrive before 2:00pm and your bed or room is available, we can check you in immediately
• If we are fully booked, you will be checked into your bed or room as soon as it is free and prepared
• If you expect to check in after 10:00pm please email or call us to confirm your check-in time
• Our rooms are not suitable for children
• The dormitory bunk beds are for one person per mattress and if this is not followed, we will charge you for the extra person
• Guests will have 24-hour access to their beds or rooms
• Smoking is not allowed in the rooms and balcony
• We offer additional continental breakfast for 129 Baht at the property",
        latitude: 13.634180,
        longitude: 100.413979,
        has_wifi?: true,
        has_breakfast?: false
        )

    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/evsunnju9i3qjrcr1goo.webp"), filename: "/evsunnju9i3qjrcr1goo.webp")
    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/pawz6rkzg7a1qhj3mcsr.webp"), filename: "/pawz6rkzg7a1qhj3mcsr.webp")
    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/cqmc4hyhai2qntiaid4s.webp"), filename: "/cqmc4hyhai2qntiaid4s.webp")
    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/baqfgujyauj4zkvic60h.webp"), filename: "/baqfgujyauj4zkvic60h.webp")
    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/znrmalva5fntphg6lan7.webp"), filename: "/znrmalva5fntphg6lan7.webp")
    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/50.webp"), filename: "/50.webp")
    l5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/vznbplgkkqqwcotwdrpd.webp"), filename: "/vznbplgkkqqwcotwdrpd.webp")

    l6 = Listing.create!(
        property_name: "Palmers Lodge - Swiss Cottage",
        property_type: "hostel",
        address: "40 College Crescent, Swiss Cottage",
        city: "London",
        country: "England",
        check_in: "14:00 - 23:00",
        check_out: "10:00",
        description: "Whether you're a backpacker, flash-packer or a budget traveller, Palmers Lodge has everything you need for one of the most unique experiences in London! Combining the grand charm of our historic building constucted in 1882, our friendly team and accessible location, Palmers Lodge has it all. 

Swiss Cottage boasts not only a fantastic London city location and building but our services are unbeatable! We have a 24 hour reception so you can be assured we are always there when you need us, you can meet other like-minded travellers downstairs at Swiss Bar - taking advantage of our selections of drinks and snacks.

An added bonus is that beds are pre-made and come with linen all for free, so the late arriving lodger can jump straight into bed, or the bar! We also offer free Wi-Fi throughout the hostel so you can stay in touch with the rest of the world and explore what's on in London! 

It is easy to forget when you stay at Swiss Cottage that there is a vibrant city just outside waiting for you! We are close to the underground (tube to the locals) so you can be in any of London's hotspots within minutes! If it's shopping you're looking for, the tube will take you directly from Swiss Cottage Station to the centre of Oxford Street (15 mins) or you can shop till you drop at Europe's largest shopping centre Westfield. You could also have a drink or two in Leicester Square (15 mins) take a spin on the London Eye (20 mins) or spot Kate and William at Buckingham Palace (10 mins) all this and more with the tube from Swiss Cottage Station or Finchley Road only 200 metres away! 

Award winning Hostel, winning or being a finalist for “Best Customer Service” and 'Best UK Youth Accommodation' (2012, 2013, 2015) by the British Education Travel Association, among our several other awards. 

Just some of our facilities and services:
▪ 24 hour reception and staff
▪ Check in time 2 pm
▪ Check out time 10 am
▪ Key-card door access
▪ Free safes and luggage lockers in every room
▪ En-suite rooms available
▪ Coach and car parking available (£10.00)
▪ Full CCTV coverage for added security
▪ Free linen and beds which are pre-made
▪ Bar and late night lounge areas
▪ Reading, conservatory and quiet rooms
▪ Lift
▪ Large selection of rooms including double, twin and dormitory rooms
▪ Ground floor reception and rooms
▪ Luggage storage for hire
▪ Photocopy facilities
▪ Free Wi-Fi
▪ Washing and drying facilities available
▪ Souvenirs and toiletries sales at reception

Note that this property has a maximum stay of 14 nights. No guests can stay longer than 14 total nights within any 6-month period.

All under 18's must be accompanied by an adult and have a written approval from parents with a copy of their passport or I.D. If staying in a single sex dorm room the adult and child must be the same gender. Please note under 16's are not allowed to stay in dorm rooms. You must book a private room.

Bookings for 15 or more people qualify as group reservations and are subject to different Terms and Conditions. Please contact the property/hostel directly for more information.

Please note that reservations for the night of the 31st December will be subject to a no-cancellation policy.

This property has a 24 HR cancellation policy. Bookings will need to be cancelled via email by 2 pm of the previous day the guest is supposed to arrive. 
Failure to cancel within this time will result in a cancellation charge equal to the first night of your stay. 

Reservations for any Guests that fail to arrive for check in between 2pm on their Date of Arrival, up until 5am the next day will be subject to complete cancellation of their reservation and also subject to a one-night cancellation charge unless the property have otherwise been informed of a late/delayed arrival and have also approved an amended check-in time and date. 

Guests are reminded that once they have paid on the day of check-in, no refunds will be issued.

Bookings for 15 or more people qualify as group reservations and are subject to different Terms and Conditions. Please contact the property/hostel directly for more information.

Palmers Lodge reserve the right to preauthorise Guests cards for prior to arrival. During times of extremely high demand, all reservations are required to have been made with a valid, chargeable card. Any reservations without a valid, chargeable card may be cancelled by Palmers Lodge at any given time.",
        facilities: {
        "Free" => ["Linen Included", "Free WiFi"],
        "General" => ["Security Lockers", "Key Card Access", "Common Room", "Elevator", "Bicycle Parking", "BBQ", "Adaptors", "Book Exchange", "Hot Showers", "Self-Catering Facilities", "Cooker", "Fridge/Freezer", "Utensils", "Dryer", "Outdoor Terrace", "Reading Light", "Parking", "Hair Dryers", "Iron / Ironing Board", "Safe Deposit Box", "Washing Machine"],
        "Services" => ["Laundry Facilities", "Towels for hire", "Luggage Storage", "24 Hour Reception", "Postal Service", "24 Hour Security", "Housekeeping"],
        "Food & Drink" => ["Restaurant", "Bar", "Meals Available", "Vending Machines", "Cafe", "Tea & Coffee Making Facilities"],
        "Entertainment" => ["PlayStation", "DVD's", "Board Games", "Games Room", "Pool Table"]
        },
        house_rules: "
Valid Photo ID will be required at check-in.  
Earliest check-in: 14:00, Latest check-out: 10:00 Late check out may incur a £10 charge at hostels discretion.   
If you are planning to arrive after midnight, please contact us and let us know.  
For Non-Refundable Bookings: We will attempt to charge your card within 24 hours of a reservation being made. Should payment be unsuccessful we then will issue you with an email prompting you to update your card details and you will have 24 hours to make this update. If you do not update your details on time or should any updated details unsuccessfully charge then we will be forced to cancel your reservation.  
CREDIT AND DEBIT CARD PAYMENTS: Maestro cards are not accepted. Please note the total price of the reservation may be pre-authorised any time after booking. Should pre-authorisation fail we will then issue you with an email prompting you to update your card details and you will have 24 hours to make this update. If you do not update your details on time then we will be forced to cancel your reservation.
CANCELLATION: A 24-hour notice (from check-in time) is required in order not to be charged for the night. Any no-shows will be charged in full for the first night. At the day of check in, upon payment there will be no refunds given. Please note that reservations for the night of the 31st December will be subject to a NO-CANCELLATION policy.   
Reservations for any Guests that fail to arrive for check in between 2pm on their Date of Arrival, up until 5am the next day will be subject to complete cancellation of their reservation and also subject to a one-night cancellation charge unless the property have otherwise been informed of a late/delayed arrival and have also approved an amended check-in time and date.   
Guests are reminded that once they have paid on the day of check-in, no refunds will be issued.  Minors and Families Bookings cannot be accepted from any person under the age of 18 unless they are accompanied by an adult (over 18) who is staying in the same dorm/room. If staying in a single-sex dorm room the adult and child must be the same gender. Couples under 18 years old are not able to share a private room. Children Under the age of 13 must be in a private room, they cannot be placed in a shared dormitory and must be accompanied by an adult. Written authorization signed by their parents and copies of parents' ID's are needed, for all under 18 years old. In compliance with Licensing Law, all under 18s will be asked to leave Bar after 8 pm. Families travelling with children will need to book private rooms. Children under 2 stay for free in existing bedding (Private rooms). Children aged 2 or over must book their own bed. Please note that we cannot provide extra beds.   
Bookings for 15 or more people qualify as group reservations and are subject to different Terms and Conditions. Please contact the property/hostel directly for more information.  No pets and no service animals are allowed at this property.  Please note that this property has a MAXIMUM STAY of 14 nights.",
        latitude: 51.544770,
        longitude: -0.175040,
        has_wifi?: true,
        has_breakfast?: false
        )

    l6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/laia0ldvmfb6za42ffmf.webp"), filename: "/laia0ldvmfb6za42ffmf.webp")
    l6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/zlosnmit4yuyeilklbxm.webp"), filename: "/zlosnmit4yuyeilklbxm.webp")
    l6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/111.jpg"), filename: "/111.jpg")
    l6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/114.jpg"), filename: "/114.jpg")
    l6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/kpzj57woqgu9bivicmwv.jpeg"), filename: "/kpzj57woqgu9bivicmwv.jpeg")

    l7 = Listing.create!(
        property_name: "Wombat's City Hostel London",
        property_type: "hostel",
        address: "7 Dock Street",
        city: "London",
        country: "England",
        check_in: "14:00 - 23:00",
        check_out: "10:00",
        description: 
"A safe haven in the middle of the metropolis: We took a traditional brick building with roots dating back to the 1800s and set a new standard for hostel life in the UK.
What was once sailors' accommodation is now a hostel that caters for all the needs of the modern traveller. With great attention to detail, we have created a hostel in London that celebrates the heritage of our historic building.
The old oak that once formed part of sturdy ships and churches is now immortalised in our furnishings throughout the house. The beers you drink here will be served on a bar made from 500 year old wood!

Our Wombat's City Hostel is located in the London Borough of Tower Hamlets, right next to the famous Tower Bridge and Tower of London, charming markets, authentic pubs and many other places of historical interest.
A short walk will take you to trendy Shoreditch with its vibrant street art, the lively nightlife of Hoxton Square and Old Street and finally Brick Lane, which has become one of the most popular spots.
All other London attractions are easily accessible by public transport: Aldgate East and Tower Bridge underground and DLR stations are just a stone's throw away.

After a long and exciting day in London, our hostel awaits you with a cosy courtyard, a spacious lobby with our own Wombat's Cafe (exclusive Wombat's Roast included) and womBAR. Here you can relax and enjoy our always unexpected offers.
All rooms are equipped with en-suite bathroom and private lockers.

Includes:
- Bed linen.
- WiFi.
- Our own Wombat's city maps.
- Wombat's Café.
- The womBAR for endless parties.
- A guest kitchen open to all who want to satisfy their own culinary needs.
- 24/7 reception.
- Secure luggage storage.
- Rental items (umbrellas, hairdryers, adaptors: everything a traveller could need).
- Coin-operated laundry facilities (washing and drying), so you can revitalise your clothes!

Our famous Tasty Brekkie buffet guarantees you enough energy for your exciting day in London. You can buy breakfast for an economical price at reception.

(Minimum age 18 years).

NON-REFUNDABLE RESERVATIONS:
* Full payment is required at the time of booking and is non-refundable.
* If you leave early, cancel or do not honour this booking, you will not be refunded.
* Any extension of this stay requires a new booking for the additional dates, subject to availability and current rates.

In the event of invalid credit card details, you will be contacted by our team. You will have 48 hours to provide valid credit card details, otherwise we reserve the right to cancel the booking.",
        facilities: {
            "Free" => ["Linen Included", "Free City Maps", "Free WiFi"],
            "General" => ["Wheelchair Friendly", "Security Lockers", "Key Card Access", "Common Room", "Elevator", "Bicycle Parking", "BBQ", "Meeting Rooms", "Adaptors", "Book Exchange", "Hot Showers", "Self-Catering Facilities", "Dishwasher", "Cooker", "Fridge/Freezer", "Utensils", "Dryer", "Outdoor Terrace", "Reading Light", "Hair Dryers For Hire", "Iron / Ironing Board", "Safe Deposit Box", "Microwave", "Washing Machine"],
            "Services" => ["Laundry Facilities", "Towels for hire", "Luggage Storage", "Fax Service", "24 Hour Reception", "Housekeeping", "Internet café", "Late check-out"],
            "Food & Drink" => ["Bar", "Meals Available", "Vending Machines", "Cafe", "Tea & Coffee Making Facilities"],
            "Entertainment" => ["Board Games", "Pool Table", "Foosball"]
        },
        house_rules: "
CANCELLATION CONDITIONS

FULLY FLEXIBLE RESERVATIONS:
*Bookings can be changed (depending on availability) and cancelled up to 48 HOURS prior to arrival.
*In case of a No-Show or delayed cancellation request, the amount of the FIRST night will be charged.

*If you need to change the dates of your reservation, please let us know via e-mail: booklondon@wombats.eu
*We need to know the name and the reference number of your reservation in order to help you.

In case of a cancellation, we recommend to cancel directly through your Hostelworld profile, however, you are also welcome to contact us directly.

NON-REFUNDABLE RESERVATIONS:
* Full payment is required at the time of booking and is non-refundable.
* If you depart earlier, cancel or fail to honour this reservation, you will not be refunded.
* Any extensions of this stay require a new reservation for the additional dates - subject to availability and current rates

In case of invalid credit card details, our team will contact you. You'll have 48 hours to provide valid credit card details, otherwise we reserve the right to cancel the reservation.

GENERAL INFORMATION:

Check-in starts at 2 p.m.
Check-out is until 10 a.m.

In case of an earlier arrival or later departure, you are welcome to use our luggage room meanwhile.

You need a valid photo ID in order to check-in! No ID = No check-in!

24/7 front desk

Payment upon arrival by cash, or cards (Visa, MasterCard, Maestro)
Please note the property may pre-authorise your card before arrival.

All dormitories include:

Power sockets
Linen & bedding
Personal locker (operated via key card)

Please note:
- the minimum age restriction is 18!
- the maximum lenght of stay is 7 nights.
- Hooligans out there: please find an alternative accommodation to our hostel

Thanks for reading this.
We wish you a nice trip and look forward to welcoming you!

Your womCrew",
        latitude: 51.510430,
        longitude: -0.068170,
        has_wifi?: true,
        has_breakfast?: true
        )

    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/pjevcbvykdzliw2grhlb.webp"), filename: "/pjevcbvykdzliw2grhlb.webp")
    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/xfv0nl7n5ifatggyc9nf.webp"), filename: "/xfv0nl7n5ifatggyc9nf.webp")
    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/k5trz7w3shkt1ayd9n1x.webp"), filename: "/k5trz7w3shkt1ayd9n1x.webp")
    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/d6apkcbwm5g28u1ssf7r.webp"), filename: "/d6apkcbwm5g28u1ssf7r.webp")
    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/tprycopzreej8gkiwz8h.webp"), filename: "/tprycopzreej8gkiwz8h.webp")
    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/i9cheksq3lgn1nsipuxi.webp"), filename: "/i9cheksq3lgn1nsipuxi.webp")
    l7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/uaajkhyf9cccziyvxxpi.webp"), filename: "/uaajkhyf9cccziyvxxpi.webp")

    ro1 = Room.create!(
        listing_id: 1,
        room_type: "shared",
        room_title: "Standard 22 Bed Mixed Dorm",
        description: "The boutique dormitory that combine efficiency space with functional comfort. - In a bed (so called NapSpace) , all amenities are provided; such as adjustable reading lamp, power supplies sockets for personal gadgets, mirror, wifi internet access.",
        num_beds: 22,
        price: 20.00
    )

    ro1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/antktqqfopsup1c3qjwo.webp"), filename: "antktqqfopsup1c3qjwo.webp")
    ro1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/das16ohuso6iwut0l2y3.webp"), filename: "das16ohuso6iwut0l2y3.webp")
    
    ro2 = Room.create!(
        listing_id: 2,
        room_type: "shared",
        room_title: "8 Bed Dorm",
        description: "Bed located in a shared room with 2 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 8,
        price: 100.00
    )

    ro2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/dik9cntowtatcxaj1fty.webp"), filename: "dik9cntowtatcxaj1fty.webp")
    ro2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/kfswldwc3dvngxeynisu.webp"), filename: "kfswldwc3dvngxeynisu.webp")
    ro2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/ksniwisshuetejimb40v.webp"), filename: "ksniwisshuetejimb40v.webp")
    ro2.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Nappark/lrgwvqqzoikfgmdl0mdt.webp"), filename: "lrgwvqqzoikfgmdl0mdt.webp")

    ro3 = Room.create!(
        listing_id: 3,
        room_type: "shared",
        room_title: "Standard 4 Bed Mixed Dorm Ensuite",
        description: "Comfy bunk beds with ensuite bathroom and toiletries. Big lockers, key card, A/C, window, Free & Good Wi-Fi, clean linens & towel, head light, and private socket. Hair dryer for borrowing.",
        num_beds: 4,
        price: 25.00
    )

    ro3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/gzhrvheobgy0gpcu3b5i.webp"), filename: "gzhrvheobgy0gpcu3b5i.webp")
    ro3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/ouzz2q2esg7nnequclj4.webp"), filename: "ouzz2q2esg7nnequclj4.webp")
    ro3.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Jam+Hostel/y9jh83fjzptrq5y4lfqf.webp"), filename: "y9jh83fjzptrq5y4lfqf.webp")

    ro4 = Room.create!(
        listing_id: 4,
        room_type: "shared",
        room_title: "Standard 4 Bed Dorm",
        description: "Bed located in a shared room with 4 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 4,
        price: 50.00
    )

    ro4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/qdtlsjw5iidb5v9kh7qp.webp"), filename: "/qdtlsjw5iidb5v9kh7qp.webp")
    ro4.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Here+hostel/ms9fx2lqiu7ndmvr5fdc.webp"), filename: "/ms9fx2lqiu7ndmvr5fdc.webp")

    ro5 = Room.create!(
        listing_id: 5,
        room_type: "private",
        room_title: "Standard Twin Room Private Ensuite",
        description: "Additional breakfast for 129 Baht -Air conditioned, twin bed room with free wifi access. -Maximum 2 -Private bathroom -Shampoo and Soap provide for free -Hot shower -Towel -Toilet paper -Cloths hanger -Mirror",
        num_beds: 2,
        price: 100.00
    )

    ro5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/siar0mvyrksuf6estr6h.webp"), filename: "/siar0mvyrksuf6estr6h.webp")
    ro5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/unpgnpvtzngg5kjenwr7.webp"), filename: "/unpgnpvtzngg5kjenwr7.webp")
    ro5.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Back+Home/hmnkgzvy1ert2bznvsbg.webp"), filename: "/hmnkgzvy1ert2bznvsbg.webp")

    ro6 = Room.create!(
        listing_id: 1,
        room_type: "shared",
        room_title: "Standard 12 Bed Dorm",
        description: "Bed located in a shared room with 12 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 12,
        price: 12.00
    )

    ro6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/huyyqfyds6med5qcdmfv.webp"), filename: "huyyqfyds6med5qcdmfv.webp")
    ro6.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/ozqobfqxzxprtclqfsdy.webp"), filename: "ozqobfqxzxprtclqfsdy.webp")
    
    ro7 = Room.create!(
        listing_id: 1,
        room_type: "private",
        room_title: "Private Room overlooking the city",
        description: "Best hostel room in the city.",
        num_beds: 2,
        price: 50.00
        )

    ro7.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey/xcmxkgpdy8queij28q0a.webp"), filename: "xcmxkgpdy8queij28q0a.webp")

    ro8 = Room.create!(
        listing_id: 6,
        room_type: "private",
        room_title: "Standard Double Bed Private Shared Bathroom",
        description: "Private Double Room with Shared Bathroom",
        num_beds: 2,
        price: 142.50
        )

    ro8.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/fw5wtixnbhzvw78jbudm.webp"), filename: "fw5wtixnbhzvw78jbudm.webp")
    ro8.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/jgsw7cbjwtep9xhjj5vg.webp"), filename: "jgsw7cbjwtep9xhjj5vg.webp")

    ro9 = Room.create!(
            listing_id: 6,
            room_type: "shared",
            room_title: "Standard 6 Bed Mixed Dorm",
            description: "Sleeps 6",
            num_beds: 6,
            price: 52.59
            )

    ro9.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/kbw7cadc3z5bob61s6eq.webp"), filename: "kbw7cadc3z5bob61s6eq.webp")
    ro9.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/nnbcui1wc0gvsri3mvr2.webp"), filename: "nnbcui1wc0gvsri3mvr2.webp")
    
    ro10 = Room.create!(
        listing_id: 6,
        room_type: "shared",
        room_title: "Standard 18 Bed Mixed Dorm",
        description: "Sleeps 18",
        num_beds: 18,
        price: 45.50
        )
        
    ro10.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/lgfxpn5x2ongrxbl9ds9.webp"), filename: "lgfxpn5x2ongrxbl9ds9.webp")
    ro10.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Palmers/xqaxuwtolvgsqgzgne7u.webp"), filename: "xqaxuwtolvgsqgzgne7u.webp")

    ro11 = Room.create!(
        listing_id: 7,
        room_type: "private",
        room_title: "Double Bed Private Ensuite",
        description: "Private Double Room with * a comfy double bed * private shower and toilet facilities ensuite (towels included) * wardrobe * free WIFI",
        num_beds: 2,
        price: 190.00
        )
        
    ro11.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/p0ocbpaebqv8wp1gfgkl.webp"), filename: "/p0ocbpaebqv8wp1gfgkl.webp")
    ro11.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/aj5lm1emwsaftxgdxyp7.webp"), filename: "/aj5lm1emwsaftxgdxyp7.webp")
    ro11.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/yea7sbtnglzrzbko7okb.webp"), filename: "/yea7sbtnglzrzbko7okb.webp")

    ro12 = Room.create!(
        listing_id: 7,
        room_type: "shared",
        room_title: "8 Bed Mixed Dorm Ensuite",
        description: "Shared 8-bed dorm MIXED with * 4 ccomfy bunk beds–equipped with mobile phone holder/USB socket, small safe with sockets/adapters, small fan * private shower and toilet facilities ensuite * security lockers * free WIFI * Minimum age 18",
        num_beds: 8,
        price: 35.25
        )
        
    ro12.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/yd5gifrkjscicrxs67rl.webp"), filename: "/yd5gifrkjscicrxs67rl.webp")
    ro12.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/fsbil5rkb5ofu447dik6.webp"), filename: "/fsbil5rkb5ofu447dik6.webp")
    ro12.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Wombat/wgywqgipnk7jgasvmyyt.webp"), filename: "/wgywqgipnk7jgasvmyyt.webp")
                
    RE1 = Reservation.create!(
        listing_id: 1,
        user_id: 1,
        room_id: 1,
        num_guests: 2,
        start_date: "2023-11-21",
        end_date: "2023-11-24",
        refundable: true,
        created_at: "2024-02-17T22:08:51.251Z"
    )

    RE2 = Reservation.create!(
        listing_id: 1,
        user_id: 2,
        room_id: 1,
        num_guests: 1,
        start_date: "2023-11-21",
        end_date: "2023-11-23",
        refundable: false,
        created_at: "2024-02-17T22:08:52.251Z"
    )

    RE3 = Reservation.create!(
        listing_id: 1,
        user_id: 1,
        room_id: 6,
        num_guests: 2,
        start_date: "2023-11-22",
        end_date: "2023-11-26",
        refundable: false,
        created_at: "2024-02-17T22:08:53.251Z"
    )

    RE4 = Reservation.create!(
        listing_id: 2,
        user_id: 2,
        room_id: 2,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:54.251Z"
    )

    RE5 =  Reservation.create!(
        listing_id: 3,
        user_id: 7,
        room_id: 3,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:55.251Z"
    )

    RE6 = Reservation.create!(
        listing_id: 2,
        user_id: 9,
        room_id: 2,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:56.251Z"
    )

    RE7 = Reservation.create!(
        listing_id: 4,
        user_id: 5,
        room_id: 4,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:57.251Z"
    )

    RE8 = Reservation.create!(
        listing_id: 1,
        user_id: 1,
        room_id: 7,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:58.251Z"
    )

    RE9 = Reservation.create!(
        listing_id: 5,
        user_id: 5,
        room_id: 3,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:59.251Z"
    )

    RE10 = Reservation.create!(
        listing_id: 3,
        user_id: 8,
        room_id: 3,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:41.251Z"
    )

    RE11 = Reservation.create!(
        listing_id: 1,
        user_id: 2,
        room_id: 6,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:31.251Z"
    )

    RE12 = Reservation.create!(
        listing_id: 4,
        user_id: 6,
        room_id: 4,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:21.251Z"
    )

    RE13 = Reservation.create!(
        listing_id: 2,
        user_id: 4,
        room_id: 2,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:11.251Z"
    )

    RE14 = Reservation.create!(
        listing_id: 5,
        user_id: 10,
        room_id: 5,
        num_guests: 1,
        start_date: "2023-11-28",
        end_date: "2023-12-20",
        refundable: false,
        created_at: "2024-02-17T22:08:01.251Z"
    )

    RE15 = Reservation.create!(
        listing_id: 3,
        user_id: 1,
        room_id: 1,
        num_guests: 3,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-02-17T22:08:23.251Z"
    )

    RE16 = Reservation.create!(
        listing_id: 6,
        user_id: 3,
        room_id: 8,
        num_guests: 2,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-02-17T22:01:23.251Z"
    )

    RE17 = Reservation.create!(
        listing_id: 6,
        user_id: 9,
        room_id: 9,
        num_guests: 5,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-01-17T22:08:23.251Z"
    )

    RE18 = Reservation.create!(
        listing_id: 6,
        user_id: 8,
        room_id: 10,
        num_guests: 6,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-02-14T22:08:23.251Z"
    )

    RE19 = Reservation.create!(
        listing_id: 6,
        user_id: 7,
        room_id: 8,
        num_guests: 1,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-02-11T22:08:23.251Z"
    )

    RE20 = Reservation.create!(
        listing_id: 6,
        user_id: 6,
        room_id: 9,
        num_guests: 4,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-02-27T22:08:23.251Z"
    )

    RE21 = Reservation.create!(
        listing_id: 6,
        user_id: 5,
        room_id: 10,
        num_guests: 8,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2024-02-17T22:08:52.251Z"
    )

    RE22 = Reservation.create!(
        listing_id: 7,
        user_id: 4,
        room_id: 11,
        num_guests: 2,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2023-02-11T22:08:23.251Z"
    )

    RE23 = Reservation.create!(
        listing_id: 7,
        user_id: 5,
        room_id: 12,
        num_guests: 1,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2022-02-27T22:08:23.251Z"
    )

    RE24 = Reservation.create!(
        listing_id: 7,
        user_id: 6,
        room_id: 12,
        num_guests: 8,
        start_date: "2024-01-28",
        end_date: "2024-02-12",
        refundable: true,
        created_at: "2023-12-17T22:08:52.251Z"
    )

    RE25 = Reservation.create!(
        listing_id: 7,
        user_id: 1,
        room_id: 12,
        num_guests: 4,
        start_date: "2024-01-24",
        end_date: "2024-02-02",
        refundable: true,
        created_at: "2024-12-11T22:12:42.251Z"
    )

    rev1 = Review.create!(
        user_id: 1,
        listing_id: 1,
        reservation_id: 1,
        security: 10,
        cleanliness: 8,
        location: 10,
        facilities: 6,
        staff: 8,
        value_for_money: 6, 
        atmosphere: 10,
        total_score: 8.3,
        about_you: "male",
        age_group: "25-30",
        trip_type: "weekend away",
        feedback: "Good hostel. Great atmosphere"
    )

    rev2 = Review.create!(
        user_id: 2,
        listing_id: 1,
        reservation_id: 2,
        security: 8,
        cleanliness: 10,
        location: 10,
        facilities: 6,
        staff: 10,
        value_for_money: 10, 
        atmosphere: 10,
        total_score: 9.1,
        about_you: "male",
        age_group: "25-30",
        trip_type: "weekend away",
        feedback: "Time here was good. Enjoyed the accommodation"
    )

    rev3 = Review.create!(
        user_id: 1,
        listing_id: 1,
        reservation_id: 3,
        security: 10,
        cleanliness: 10,
        location: 10,
        facilities: 10,
        staff: 10,
        value_for_money: 10, 
        atmosphere: 10,
        total_score: 10,
        about_you: "male",
        age_group: "25-30",
        trip_type: "weekend away",
        feedback: "Enjoyed my stay here. Francis was great"
    )

    rev4 = Review.create!(
        user_id: 2,
        listing_id: 2,
        reservation_id: 4,
        security: 8,
        cleanliness: 8,
        location: 8,
        facilities: 8,
        staff: 8,
        value_for_money: 8, 
        atmosphere: 8,
        total_score: 8,
        about_you: "male",
        age_group: "25-30",
        trip_type: "weekend away",
        feedback: "Time here was alright. No complaints but could've been better"
    )


Review.create!(
    user_id: 7,
    listing_id: 3,
    reservation_id: 5,
    security: 8,
    cleanliness: 7,
    location: 9,
    facilities: 6,
    staff: 8,
    value_for_money: 7, 
    atmosphere: 8,
    total_score: 7.6,
    about_you: "female",
    age_group: "20-25",
    trip_type: "sightseeing",
    feedback: "Nice hostel. Could be cleaner"
  )
  

  Review.create!(
    user_id: 9,
    listing_id: 2,
    reservation_id: 6,
    security: 7,
    cleanliness: 9,
    location: 8,
    facilities: 6,
    staff: 9,
    value_for_money: 9, 
    atmosphere: 8,
    total_score: 8.4,
    about_you: "male",
    age_group: "25-30",
    trip_type: "business trip",
    feedback: "Great stay. Clean and comfortable"
  )
  

  Review.create!(
    user_id: 5,
    listing_id: 4,
    reservation_id: 7,
    security: 9,
    cleanliness: 8,
    location: 9,
    facilities: 9,
    staff: 10,
    value_for_money: 9, 
    atmosphere: 10,
    total_score: 9.5,
    about_you: "male",
    age_group: "30-35",
    trip_type: "vacation",
    feedback: "Amazing service. Loved the atmosphere"
  )
  

  Review.create!(
    user_id: 1,
    listing_id: 1,
    reservation_id: 8,
    security: 10,
    cleanliness: 8,
    location: 10,
    facilities: 6,
    staff: 8,
    value_for_money: 6, 
    atmosphere: 10,
    total_score: 8.3,
    about_you: "male",
    age_group: "25-30",
    trip_type: "weekend away",
    feedback: "Good hostel. Great atmosphere"
  )
  

  Review.create!(
    user_id: 3,
    listing_id: 5,
    reservation_id: 9,
    security: 7,
    cleanliness: 9,
    location: 8,
    facilities: 7,
    staff: 9,
    value_for_money: 8, 
    atmosphere: 8,
    total_score: 8.0,
    about_you: "female",
    age_group: "20-25",
    trip_type: "sightseeing",
    feedback: "Nice place. Enjoyed the stay"
  )
  

  Review.create!(
    user_id: 8,
    listing_id: 3,
    reservation_id: 10,
    security: 8,
    cleanliness: 7,
    location: 9,
    facilities: 6,
    staff: 8,
    value_for_money: 7, 
    atmosphere: 8,
    total_score: 7.6,
    about_you: "female",
    age_group: "25-30",
    trip_type: "weekend away",
    feedback: "Decent hostel. Could use improvement"
  )
  

  Review.create!(
    user_id: 2,
    listing_id: 1,
    reservation_id: 11,
    security: 9,
    cleanliness: 8,
    location: 10,
    facilities: 7,
    staff: 9,
    value_for_money: 8, 
    atmosphere: 9,
    total_score: 8.7,
    about_you: "male",
    age_group: "25-30",
    trip_type: "business trip",
    feedback: "Nice stay. Good location"
  )
  

  Review.create!(
    user_id: 6,
    listing_id: 4,
    reservation_id: 12,
    security: 9,
    cleanliness: 8,
    location: 9,
    facilities: 9,
    staff: 10,
    value_for_money: 9, 
    atmosphere: 10,
    total_score: 9.5,
    about_you: "female",
    age_group: "30-35",
    trip_type: "vacation",
    feedback: "Exceptional service. Highly recommended"
  )
  

  Review.create!(
    user_id: 4,
    listing_id: 2,
    reservation_id: 13,
    security: 7,
    cleanliness: 9,
    location: 8,
    facilities: 6,
    staff: 9,
    value_for_money: 9, 
    atmosphere: 8,
    total_score: 8.4,
    about_you: "male",
    age_group: "25-30",
    trip_type: "sightseeing",
    feedback: "Great place. Clean and comfortable"
  )
  

  Review.create!(
    user_id: 10,
    listing_id: 5,
    reservation_id: 14,
    security: 7,
    cleanliness: 9,
    location: 8,
    facilities: 7,
    staff: 9,
    value_for_money: 8, 
    atmosphere: 8,
    total_score: 8.0,
    about_you: "female",
    age_group: "20-25",
    trip_type: "business trip",
    feedback: "Enjoyed my stay. Nice atmosphere"
  )

  Review.create!(
    user_id: 3,
    listing_id: 6,
    reservation_id: 16,
    security: 8,
    cleanliness: 8,
    location: 8,
    facilities: 8,
    staff: 8,
    value_for_money: 8, 
    atmosphere: 8,
    total_score: 8.0,
    about_you: "male",
    age_group: "20-25",
    trip_type: "business trip",
    feedback: "super charming place, adds a lot to the trip. staff was kind, bed was good, all clean. only unfortunate incident was my dad's wallet got stolen at night in the room, but he did leave it outside his locker, so not the hostel's fault :')"
  )

  Review.create!(
    user_id: 9,
    listing_id: 6,
    reservation_id: 17,
    security: 8,
    cleanliness: 10,
    location: 10,
    facilities: 10,
    staff: 8,
    value_for_money: 10, 
    atmosphere: 8,
    total_score: 9.1,
    about_you: "female",
    age_group: "18-24",
    trip_type: "weekend away",
    feedback: "pretty good although a bit far out from the city"
  )

  Review.create!(
    user_id: 8,
    listing_id: 6,
    reservation_id: 18,
    security: 7,
    cleanliness: 9,
    location: 8,
    facilities: 7,
    staff: 9,
    value_for_money: 8, 
    atmosphere: 8,
    total_score: 8.0,
    about_you: "female",
    age_group: "41+",
    trip_type: "vacation",
    feedback: "Palmers Swiss Cottage is a beautiful property. The staff are sincerly happy and helpful. It is just a good atmosphere. It's a bit out of central London, but worth the tube rides."
  )

  Review.create!(
    user_id: 7,
    listing_id: 6,
    reservation_id: 19,
    security: 10,
    cleanliness: 10,
    location: 10,
    facilities: 10,
    staff: 10,
    value_for_money: 10, 
    atmosphere: 10,
    total_score: 10.0,
    about_you: "couple",
    age_group: "20-25",
    trip_type: "weekend aaway",
    feedback: "Great place and had good breakfast."
  )

  Review.create!(
    user_id: 6,
    listing_id: 6,
    reservation_id: 20,
    security: 10,
    cleanliness: 10,
    location: 10,
    facilities: 10,
    staff: 10,
    value_for_money: 10, 
    atmosphere: 10,
    total_score: 10.0,
    about_you: "female",
    age_group: "41+",
    trip_type: "business trip",
    feedback: "Keep up the good work ! Top hostel!"
  )

  Review.create!(
    user_id: 5,
    listing_id: 6,
    reservation_id: 21,
    security: 8,
    cleanliness: 8,
    location: 8,
    facilities: 8,
    staff: 8,
    value_for_money: 8, 
    atmosphere: 8,
    total_score: 8.0,
    about_you: "all female group",
    age_group: "20-25",
    trip_type: "vacation",
    feedback: "The staff here are super friendly and open to answer any questions. It is kinda far from the city center and the area didn't feel the safest but nothing to bad. The kitchen is really small i wouldn't plan to make any full meals here because no more than 2 people fit in the space. But other than that the bed rooms, coffee lounge, and bar area were nice and spacious."
  )

  Review.create!(
    user_id: 4,
    listing_id: 7,
    reservation_id: 22,
    security: 10,
    cleanliness: 10,
    location: 10,
    facilities: 10,
    staff: 10,
    value_for_money: 10, 
    atmosphere: 10,
    total_score: 10.0,
    about_you: "couple",
    age_group: "25-30",
    trip_type: "weekend aaway",
    feedback: "Really helpful and friendly staff. Café & bar seemed social."
  )

  Review.create!(
    user_id: 5,
    listing_id: 7,
    reservation_id: 23,
    security: 8,
    cleanliness: 10,
    location: 8,
    facilities: 10,
    staff: 8,
    value_for_money: 10, 
    atmosphere: 8,
    total_score: 8.9,
    about_you: "all female group",
    age_group: "20-25",
    trip_type: "vacation",
    feedback: "Great little place. Bit of a travel to get around. Yet the tube is close by and still one hell of a good spot."
  )

  Review.create!(
    user_id: 6,
    listing_id: 7,
    reservation_id: 24,
    security: 10,
    cleanliness: 10,
    location: 8,
    facilities: 8,
    staff: 6,
    value_for_money: 8, 
    atmosphere: 10,
    total_score: 8.6,
    about_you: "female",
    age_group: "41+",
    trip_type: "business trip",
    feedback: "Everything was so good! The hostel felt almost like a hotel, l'm little surprised of that. So clean and many facilities! Security lockers were also super!"
  )
    
    puts "Done!"
#   end