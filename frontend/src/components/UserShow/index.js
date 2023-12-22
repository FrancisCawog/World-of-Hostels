import Navigation from "../Navigation";
import "./UserShow.css"
import Footer from "../Footer";
import userIcon from "../../assets/pictures/icons/user-128.svg"
import houseIcon from "../../assets/pictures/icons/house-svgrepo-com.svg"
import mapIcon from "../../assets/pictures/icons/clipart2731071.png"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import { updateUser } from "../../store/session";

function UserShow() {
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Home');
    const [countryCount, setcountryCount] = useState(0);
    const [propertyCount, setpropertyCount] = useState(0);
    const [age, setAge] = useState(0);
    const [year, month, day] = sessionUser.date_of_birth.split('-');
    const formattedDate = `${month}/${day}/${year}`;
    const [fullName, setFullName] = useState(
        sessionUser.first_name + " " + sessionUser.last_name
      );
    const [dateOfBirth, setDateOfBirth] = useState(formattedDate);
    const [userNationality, setUserNationality] = useState(sessionUser.nationality);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true)

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

    const conditionalMargin = {
        marginBottom: activeTab === 'Home' ||  activeTab === 'Edit Details' ? "5rem" : ""
    }

    const handleSaveChanges = () => {
        const fullName = document.getElementById('fullName').value;
        const [firstName, lastName] = fullName.split(' ');
      
        const dateOfBirth = document.getElementById('dateofBirth').value;
        const nationality = document.getElementById('nationality').value;
      
        const [year, month, day] = dateOfBirth.split('-');
        const dob = new Date(`${month}/${day}/${year}`);
      
        const now = new Date();
        let ages = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
      
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
          ages--;
        }
      
        dispatch(
          updateUser({
            id: sessionUser.id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            nationality: nationality,
            age: ages,
          })
        );

        setShowConfirmation(true);
      };

      useEffect(() => {
        if (showConfirmation) {
          const timer = setTimeout(() => {
            setShowConfirmation(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [showConfirmation]);

      useEffect(() => {
        const [firstName, lastName] = fullName.split(' ');
      
        if (
          formattedDate !== dateOfBirth ||
          sessionUser.nationality !== userNationality ||
          sessionUser.first_name !== firstName ||
          sessionUser.last_name !== lastName
        ) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      }, [dateOfBirth, userNationality, fullName, sessionUser]);
      
      const currentDate = new Date();

      const futureReservations = Object.values(reservations).filter(reservation => {
        const endDate = new Date(reservation.end_date); 
        return endDate > currentDate;
      });

      const pastReservations = Object.values(reservations).filter(reservation => {
        const endDate = new Date(reservation.end_date); 
        return endDate < currentDate;
      });

      function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
      }

    return (
        <>
        <div style={{ borderBottom: "1px solid #dddfe4",boxShadow: "0 4px 32px rgba(0,0,0,.1)"}}>
          <Navigation />
        </div>

        {showConfirmation && (
        <div className="confirmation-box">Changes saved successfully</div>
      )}

        <div className="user-yellow-box" style={conditionalColor}>
            <div className="mid-div" style={conditionalMargin}>
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
                        <p style={{fontSize: "26px"}}>{age} years old, {sessionUser.nationality}</p>
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
                            <input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="input-with-label">
                            <label htmlFor="dateofBirth">Date of Birth </label>
                            <input
                                id="dateofBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            </div>
                        <div className="input-with-label">
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                id="nationality"
                                value={userNationality}
                                onChange={(e) => setUserNationality(e.target.value)}
                            />
                        </div>
                        <div className="input-with-label">
                            <label htmlFor="email">Email</label>
                            <input id="email"  value={sessionUser.email} disabled />
                            <p style={{fontSize: "12px", fontWeight: "300", marginTop: "-2.5px"}}>To change your email, please contact us</p>
                        </div>
                    </div>
                </div>
                </>
            )}

            {activeTab === "My Trips" && (
                <>
                    <div className="my-trips">
                        <p>My Trips</p>
                            <br/>
                        <p>Coming Soon</p>

                        {futureReservations.length === 0 ? (
                            <div className="bus-div">
                                <img src="https://www.hostelworld.com/_nuxt/img/05d49c7.svg"/>
                                <div className="other-ready">
                                <p id="other">Others are busy booking.</p>
                                <p id="ready">Ready to start looking?</p>
                                </div>
                            </div>
                            ) : (
                            <>
                                {futureReservations.map((reservation) => {
                                const startDate = formatDate(reservation.start_date);
                                const endDate = formatDate(reservation.end_date);
                                const correspondingListing = Object.values(listings).find(
                                    (listing) => listing.id === reservation.listing_id
                                );

                                return (
                                    <div key={reservation.id} className="future-booking">
                                        <div className="future-picture">

                                        </div >
                                        <p>{correspondingListing.property_name}</p>
                                        <p>{correspondingListing.city}</p>
                                        <p>{startDate} - {endDate}</p>
                                    </div>
                                );
                                })}
                            </>
                        )}
                        
                        {pastReservations.length > 0 ? (
                        <>
                        <br/>
                        <p>Past Trips</p>
                        {pastReservations.map((reservation) => {
                            const startDate = formatDate(reservation.start_date);
                            const endDate = formatDate(reservation.end_date);
                            const correspondingListing = Object.values(listings).find(
                                (listing) => listing.id === reservation.listing_id
                            );

                            return (
                                <div key={reservation.id} className="future-booking">
                                    <div className="future-picture">

                                    </div >
                                    <p>{correspondingListing.property_name}</p>
                                    <p>{correspondingListing.city}</p>
                                    <p>{startDate} - {endDate}</p>
                                </div>
                            );
                            })}
                        </>
                        ) : null}
                    </div>
                </>
            )}
            </div>
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
            <button className={`edit-user-button ${buttonDisabled ? 'disabled' : ''}`} onClick={!buttonDisabled ? handleSaveChanges : undefined} disabled={buttonDisabled} > Save Changes</button>
        )}


        <Footer />
        </>
    )

}

export default UserShow;