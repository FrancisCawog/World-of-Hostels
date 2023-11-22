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
    # Reviews.destroy_all
  
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
        phone: "3479998980",
        password: "Password123!",
        nationality: "American",
        date_of_birth: "2010-10-10",
        age: 13
    )

    # u1.photo.attach(io: URI.open(""), filename: "profile_pic.png")

    u2 = User.create!(
        first_name: "Francis",
        last_name: "Cawog",
        email: "franciscawog@gmail.com",
        phone: "3479999999",
        password: "Password123!",
        nationality: "American",
        date_of_birth: "1997-05-11",
        age: 26
    )
  
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
        facilities: "[Security Lockers, Swimming Pool, Air Conditioning, Hot Showers, Towels Not Included, Luggage Storage, 24 Hour Reception, Tours/Travel Desk, 24 Hour Security Housekeeping, restaurant, bar, Follows Covid-19 sanitation guidance]",
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

    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey+Pics/174.webp"), filename: "/174.webp")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey+Pics/mp5y0nivmoqoqiubyxul.jpeg"), filename: "/mp5y0nivmoqoqiubyxul.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey+Pics/r7xo3qa9tjp0uagmvi8b.jpeg"), filename: "/r7xo3qa9tjp0uagmvi8b.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey+Pics/174.webp"), filename: "/174.webp")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey+Pics/reznmebvzcrx7tdmrxpb.jpeg"), filename: "/reznmebvzcrx7tdmrxpb.jpeg")
    l1.photos.attach(io: URI.open("https://world-of-hostels-seeds.s3.amazonaws.com/Mad+Monkey+Pics/rrkqevybhnv8ljqy1j61.jpeg"), filename: "/rrkqevybhnv8ljqy1j61.jpeg")


    l2 = Listing.create!(
        property_name: "Bangkok Backpacker Haven",
        property_type: "hostel", 
        address: "28 Sukhumvit Road",
        city: "Bangkok",
        country: "Thailand",
        check_in: "12:00 - 24:00",
        check_out: "11:00", 
        description: "Welcome to Bangkok Backpacker Haven, your ultimate home away from home in the vibrant city of Bangkok! Nestled in the bustling Sukhumvit area, our hostel offers a perfect blend of comfort, convenience, and a lively atmosphere. Explore the nearby street markets, indulge in delicious street food, and experience the best of Bangkok's nightlife just steps away from your doorstep.
        
        Our hostel features cozy shared dorms and private rooms, ensuring a comfortable stay for solo travelers and groups alike. Enjoy our communal spaces, including a rooftop lounge with panoramic city views and a vibrant common area where you can meet fellow travelers from around the world.

        FACILITIES & AMENITIES
        - Free Welcome Drink
        - Shared Dorms
        - Private Rooms
        - Rooftop Lounge
        - Common Area
        - 24h Reception
        - Daily Tours
        - Air Conditioning
        - Luggage Storage
        - WiFi
        - Travel Desk
        - Smoking Area
        - Social Events
        
        DAILY ACTIVITIES
        Immerse yourself in the Bangkok experience with our daily activities:
        MON: Street Food Safari + Movie Night
        TUE: City Walking Tour + Trivia Night
        WED: Temple Exploration + Pub Crawl
        THU: Tuk Tuk Adventure + Karaoke Party
        FRI: Night Market Excursion + Games Night
        SAT: Rooftop BBQ + Music Jam
        SUN: Chatuchak Market + Cultural Exchange
        
        LOCATION
        Our hostel is strategically located in the heart of Sukhumvit, surrounded by vibrant street life, trendy cafes, and exciting nightlife options. Explore the nearby attractions and easily access public transportation to discover the wonders of Bangkok.
        
        WHY CHOOSE BANGKOK BACKPACKER HAVEN?
        At Bangkok Backpacker Haven, we aim to provide not just a place to stay but a memorable travel experience. Join our community, connect with like-minded travelers, and create lasting memories in the enchanting city of Bangkok.", 
        facilities: "[Free WiFi, Air Conditioning, 24-Hour Reception, Luggage Storage, Tours/Travel Desk, Rooftop Lounge, Common Area, Smoking Area]",
        house_rules: "
1. Check-in Time: from 14:00 to 23:00.
2. Check-out Time: before 12:00 (noon).
3. Payment: Full balance must be paid in cash (THB) upon check-in. Credit card processing fee is applicable.
4. Cancellation Policy: 7 days advance notice required.
5. Age Restriction: Minors are not allowed.
6. Reception working hours: 24 hours.
7. No smoking inside the building.
8. Pets are not allowed.",
        latitude: 13.731979,
        longitude: 100.569214,
        has_wifi?: true,
        has_breakfast?: false,
    )

    l3 = Listing.create!(
        property_name: "Urban Oasis Hostel",
        property_type: "hostel",
        address: "45 Ratchadaphisek Road",
        city: "Bangkok",
        country: "Thailand",
        check_in: "15:00 - 22:00",
        check_out: "11:00",
        description: "Discover the vibrant energy of Bangkok at Urban Oasis Hostel! Our modern and stylish hostel is located in the heart of Ratchadaphisek, offering a perfect blend of comfort and convenience. Immerse yourself in the local culture, explore nearby attractions, and enjoy the lively atmosphere of this urban oasis.",
        facilities: "[Free WiFi, Air Conditioning, 24-Hour Reception, Rooftop Garden, Shared Kitchen, Lounge Area, Luggage Storage]",
        house_rules: "
1. Check-in Time: from 15:00 to 22:00.
2. Check-out Time: before 11:00.
3. Payment: Credit cards accepted.
4. Cancellation Policy: 48 hours advance notice required.
5. Age Restriction: Adults only.
6. No loud noises after 10:00 PM.
7. Respect fellow guests and staff.
8. Smoking allowed only in designated areas.",
        latitude: 13.776908,
        longitude: 100.564695,
        has_wifi?: true,
        has_breakfast?: false
        )

    l4 = Listing.create!(
        property_name: "Cosmic Traveler Hostel",
        property_type: "hostel",
        address: "19 Sukhumvit Road",
        city: "Bangkok",
        country: "Thailand",
        check_in: "14:00 - 22:00",
        check_out: "12:00",
        description: "Welcome to Cosmic Traveler Hostel, where the charm of Bangkok meets the comfort of home. Nestled in the heart of Sukhumvit, our hostel offers a unique blend of modern amenities and a vibrant atmosphere. Immerse yourself in the city's diverse culture, explore nearby markets, and make memories with fellow travelers.",
        facilities: "[Free WiFi, Air Conditioning, 24-Hour Reception, Cozy Lounge, Shared Kitchen, Cultural Events]",
        house_rules: "
1. Check-in Time: from
14:00 to 22:00. 2. Check-out Time: before 12:00.
3. Payment: Credit cards accepted.
4. Cancellation Policy: 72 hours advance notice required.
5. Age Restriction: 18 and above.
6. Quiet hours from 10:00 PM to 7:00 AM.
7. No pets allowed.
8. Eco-friendly practices encouraged.",
        latitude: 13.726850,
        longitude: 100.576904,
        has_wifi?: true,
        has_breakfast?: false
        )
  
    l5 = Listing.create!(
        property_name: "Serenity Suites",
        property_type: "hotel",
        address: "8 Silom Road",
        city: "Bangkok",
        country: "Thailand",
        check_in: "15:00 - 23:00",
        check_out: "12:00",
        description: "Indulge in luxury at Serenity Suites, a boutique hotel in the heart of Silom. Impeccable design, personalized service, and a tranquil ambiance await you. Whether you're here for business or leisure, our sophisticated rooms and amenities will make your stay in Bangkok truly memorable.",
        facilities: "[Free High-Speed WiFi, Spa & Wellness Center, Rooftop Pool, 24-Hour Concierge, Gourmet Restaurant, Conference Facilities]",
        house_rules: "
1. Check-in Time: from 15:00 to 23:00.
2. Check-out Time: before 12:00.
3. Payment: All major credit cards accepted.
4. Cancellation Policy: 48 hours advance notice required.
5. No smoking in rooms.
6. Pets are not allowed.
7. Dress code for dining areas.
8. Respectful behavior is expected.",
        latitude: 13.729023,
        longitude: 100.532332,
        has_wifi?: true,
        has_breakfast?: true
        )

    RO1 = Room.create!(
        listing_id: 1,
        room_type: "shared",
        room_title: "Standard 8 Bed Dorm",
        description: "Bed located in a shared room with 8 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 8,
        price: 20.00
    )

    RO2 = Room.create!(
        listing_id: 2,
        room_type: "private",
        room_title: "Private 2 Bed Dorm",
        description: "Bed located in a shared room with 2 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 8,
        price: 100.00
    )

    RO3 = Room.create!(
        listing_id: 3,
        room_type: "shared",
        room_title: "Standard 6 Bed Dorm",
        description: "Bed located in a shared room with 6 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 6,
        price: 25.00
    )

    RO4 = Room.create!(
        listing_id: 4,
        room_type: "shared",
        room_title: "Standard 4 Bed Dorm",
        description: "Bed located in a shared room with 4 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 4,
        price: 50.00
    )

    RO5 = Room.create!(
        listing_id: 5,
        room_type: "private",
        room_title: "Private Room",
        description: "Nice Primate Room",
        num_beds: 2,
        price: 100.00
    )

    RO6 = Room.create!(
        listing_id: 1,
        room_type: "shared",
        room_title: "Standard 12 Bed Dorm",
        description: "Bed located in a shared room with 12 beds distributed in 4 bunk beds 0.90X2.00, equipped with curtains, night light, private locker and private bathroom. Bed linen is provided.",
        num_beds: 12,
        price: 12.00
    )

    RO7 = Room.create!(
        listing_id: 1,
        room_type: "private",
        room_title: "Private Room overlooking the city",
        description: "Best hostel room in the city.",
        num_beds: 2,
        price: 50.00
    )

    RE1 = Reservation.create!(
        listing_id: 1,
        user_id: 1,
        room_id: 1,
        num_guests: 2,
        start_date: "2023-11-21",
        end_date: "2023-11-24",
        refundable: true
    )

    RE2 = Reservation.create!(
        listing_id: 1,
        user_id: 2,
        room_id: 1,
        num_guests: 1,
        start_date: "2023-11-21",
        end_date: "2023-11-23",
        refundable: false
    )
    
    puts "Done!"
#   end