import Navigation from "../Navigation";
import "./UserShow.css"
import Footer from "../Footer";
import userIcon from "../../assets/pictures/icons/user-128.svg"
import houseIcon from "../../assets/pictures/icons/house-svgrepo-com.svg"
import mapIcon from "../../assets/pictures/icons/clipart2731071.png"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";

function UserShow() {
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Home');
    const [countryCount, setcountryCount] = useState(0);
    const [propertyCount, setpropertyCount] = useState(0);
    const [age, setAge] = useState(0);

    let propertyWord;

    if (propertyCount === 1) {
        propertyWord = "property";
    } else {
        propertyWord = "properties";
    }

    let countryWord;

    if (countryCount === 1) {
        countryWord = "country";
    } else {
        countryWord = "countries";
    }

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); 
    };

    useEffect(() => {
        dispatch(fetchListings()).catch((error) => {
          console.error("Error fetching listing:", error);
        });
      }, [dispatch]);

    
    useEffect(() => {
        const uniqueListingIds = Object.values(reservations).reduce((acc, reservation) => {
            if (reservation && reservation.listing_id) {
                acc.add(reservation.listing_id);
            }
            return acc;
        }, new Set());

        const numberOfProperties = uniqueListingIds.size;
        setpropertyCount(numberOfProperties);
    }, [reservations]);

    useEffect(() => {
        const uniqueListingIds = Object.values(reservations).reduce((acc, reservation) => {
            if (reservation && reservation.listing_id) {
                acc.add(reservation.listing_id);
            }
            return acc;
        }, new Set());

        const uniqueCountries = new Set();

        Object.values(listings).forEach(listing => {
            if (uniqueListingIds.has(listing.id) && listing.country) {
                uniqueCountries.add(listing.country);
            }
        });

        const numberOfCountries = uniqueCountries.size;

        setcountryCount(numberOfCountries);
    }, [reservations, listings]);

    useEffect(() => {
        const dob = new Date(sessionUser.date_of_birth);
        const now = new Date();
    
        let ages = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
            ages--;
        }
    
        setAge(ages);
    }, [sessionUser.date_of_birth]);

    const conditionalColor = {
        backgroundColor: activeTab === 'Home' ? "#f6a90e" : "white"
    }

    const [year, month, day] = sessionUser.date_of_birth.split('-');
    const formattedDate = `${month}/${day}/${year}`;
    

    return (
        <>
        <div style={{ borderBottom: "1px solid #dddfe4",boxShadow: "0 4px 32px rgba(0,0,0,.1)"}}>
          <Navigation />
        </div>
        <div className="user-yellow-box" style={conditionalColor}>
            <div className="user-tabs">
                <div className={`user-tabs-cont ${activeTab === 'Home' && 'active'}`} onClick={() => handleTabClick('Home')}>
                    <img src={houseIcon} alt="Home Icon" />
                    <p>Home</p>
                </div>
                <div className={`user-tabs-cont ${activeTab === 'Edit Details' && 'active'}`} onClick={() => handleTabClick('Edit Details')}>
                    <img src={userIcon} alt="Edit Details Icon" />
                    <p>Edit Details</p>
                </div>
                <div className={`user-tabs-cont ${activeTab === 'My Trips' && 'active'}`} onClick={() => handleTabClick('My Trips')}>
                    <img src={mapIcon} alt="My Trips Icon" />
                    <p>My Trips</p>
                </div>
            </div>

            {activeTab === 'Home' && (
                <div className="user-about">
                    <div className="picture-circle">
                        
                    </div>
                    <div className="name-and-age">
                        <p>{sessionUser.first_name}</p>
                        <p>{age} years old, {sessionUser.nationality}</p>
                    </div>
                </div>
            )}

            {activeTab === 'Edit Details' && (
                <>
                <div className="edit-about">
                    <p>Edit Details</p>
                    <div className="edit-picture-circle"></div>
                    <div className="four-inputs-div">
                        <div className="input-with-label">
                            <label htmlFor="fullName">Full Name</label>
                            <input id="fullName"  value={sessionUser.first_name + " " + sessionUser.last_name} />
                        </div>
                        <div className="input-with-label">
                            <label htmlFor="dateofBirth">Date of Birth </label>
                            <input id="dateofBirth"  value={formattedDate} />
                        </div>
                        <div className="input-with-label">
                            <label htmlFor="nationality">Nationality</label>
                            <input id="nationality"  value={sessionUser.nationality} />
                        </div>
                        <div className="input-with-label">
                            <label htmlFor="email">Email</label>
                            <input id="email"  value={sessionUser.email} disabled />
                        </div>
                    </div>
                </div>
                </>
            )}

        </div>

        {activeTab === 'Home' && (
            <div className="travel-stats">
                <div >
                    <p>My Travel Stats</p>
                    <p>I've explored <strong>{countryCount} {countryWord}</strong></p>
                    <p>and stayed in <strong>{propertyCount} {propertyWord}</strong></p>
                </div>
            </div>
        )}

        {activeTab === 'Edit Details' && (
            <button className="edit-user-button"> Save Changes</button>
        )}


        <Footer />
        </>
    )

}

export default UserShow;