import Navigation from "../Navigation";
import "./UserShow.css"
import Footer from "../Footer";
import userIcon from "../../assets/pictures/icons/user-128.svg"
import houseIcon from "../../assets/pictures/icons/house-svgrepo-com.svg"
import mapIcon from "../../assets/pictures/icons/clipart2731071.png"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import { deleteReservation } from "../../store/reservations";
import { updateUser } from "../../store/session";
import LocationSVG from "../../assets/pictures/icons/location-pin-svgrepo-com.svg"
import CalendarSVG from "../../assets/pictures/icons/calendar-alt-svgrepo-com.svg"
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import ArrowRight from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import BuildingSVG from "../../assets/pictures/icons/921-200.png"
import ChangeSVG from "../../assets/pictures/icons/2831588-200.png"
import CancelSVG from "../../assets/pictures/icons/728248.webp"
import RightSVG from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import ReservationMapModal from "../ReservationMapModal";
import { useHistory, useLocation } from 'react-router-dom';
import ReviewModal from "../ReviewModal";
import ReviewForm from "../ReviewForm";
import transpartstar from "../../assets/pictures/icons/2336461-200.png"

function UserShow() {
    const location = useLocation();
    const { tabName } = location.state || {};
    const reviews = useSelector((state) => state.reviews);
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const [activeTab, setActiveTab] = useState(tabName);
    const [countryCount, setcountryCount] = useState(0);
    const [propertyCount, setpropertyCount] = useState(0);
    const [age, setAge] = useState(0);
    let formattedDate = null;
    if (sessionUser.date_of_birth) {
        const [year, month, day] = sessionUser.date_of_birth.split('-');
        formattedDate = `${month}/${day}/${year}`;
    }
    const [fullName, setFullName] = useState(
        sessionUser.first_name + " " + sessionUser.last_name
      );
    const [dateOfBirth, setDateOfBirth] = useState(formattedDate);
    const [userNationality, setUserNationality] = useState(sessionUser.nationality);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showReservation, setShowReservation] = useState(false);
    const [ReservationId, setReservationId] = useState();
    const [showMapModal, setShowMapModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [modalReservationId, setModalReservationId] = useState("");
    const [modalPropertyName,setModalPropertyName] = useState("");
    const [modalListingId, setModalListingId] = useState();
    const [isRefundable, setIsRefundable] = useState(true);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg"

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [activeTab, showReservation]);

    useEffect(() => {
        if (showMapModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto'; 
        };
      }, [showMapModal]);
    
      const closeMapModal = () => {
        setShowMapModal(false);
      };

      useEffect(() => {
        if (showReviewModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto'; 
        };
      }, [showReviewModal]);
    
      const closeReviewModal = () => {
        setShowReviewModal(false);
      };

      useEffect(() => {
        if (showReviewForm) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto'; 
        };
      }, [showReviewForm]);
    
      const closeReviewForm = () => {
        setShowReviewForm(false);
      };

     function handleMapClick() {
        setShowMapModal(true);
     } 

     function handleReviewClick(reservationId, property_name) {
        handleReservation(reservationId)
        setModalReservationId(reservationId)
        setModalPropertyName(property_name)
        setShowReviewModal(true);
     } 

     function handleReviewForm(reservationId, property_name, listing_id) {
         setModalReservationId(reservationId);
         setModalPropertyName(property_name);
         setModalListingId(listing_id)
         setShowReviewForm(true);
     }


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
        setActiveTab(tabName);
      }, [tabName]);

    useEffect(() => {
        dispatch(fetchListings(today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0])).catch((error) => {
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
        if (sessionUser.date_of_birth !== null) {
        const dob = new Date(sessionUser.date_of_birth);
        const now = new Date();
    
        let ages = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
            ages--;
        }
    
        setAge(ages);
        }
    }, [sessionUser.date_of_birth]);

    const conditionalColor = {
        backgroundColor: activeTab === 'Home' ? "#f6a90e" : "white"
    }

    useEffect(() => {
        if (activeTab === 'My Trips'){
            setShowReservation(false);
        }
    }, [activeTab]);

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
        if (showDeleteConfirmation) {
          const timer = setTimeout(() => {
            setShowDeleteConfirmation(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [showDeleteConfirmation]);

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
      
      function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const formattedDate = utcDate.toLocaleDateString('en-US', options);
        return formattedDate;
      }

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const futureReservations = Object.values(reservations).filter(reservation => {
        const startDate = new Date(reservation?.start_date);
        return startDate > currentDate;
      });

      const pastReservations = Object.values(reservations).filter(reservation => {
        const startDate = new Date(reservation?.start_date);
        return startDate < currentDate;
      });

      const isReservationInPast = pastReservations.some(reservation => reservation.id === ReservationId);

      const handleReservation = (id) => {
        setShowReservation(true);
        setReservationId(id);
      };

      let foundReservation = null;
      let foundListing = null;

    if (ReservationId) {
        foundReservation = Object.values(reservations).find(
            (reservation) => reservation.id === ReservationId
        );
    
        if (foundReservation) {
        foundListing = Object.values(listings).find(
            (listing) => listing.id === foundReservation.listing_id
        )}
    }

    const handleDeleteReservation = (ReservationId) => {
        handleTabClick('My Trips');
        setShowReservation(false);
        dispatch(deleteReservation(ReservationId));
        setShowDeleteConfirmation(true);
    };    

    const extractRating = (reservationId) => {
        const listingReviews = Object.values(reviews).filter(review => review.reservation_id === reservationId);
        const review = listingReviews[0]
        return review?.total_score
      }

    const listingReview = (reservationId) => {
        const review = Object.values(reviews).filter(review => review?.reservation_id === reservationId);
        if (review.length === 1) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (!foundReservation?.refundable) {
          setIsRefundable(false);
        } else {
            setIsRefundable(true);
        }
      }, [foundReservation]);
    

    return (
        <>
        {showMapModal && <ReservationMapModal  latitude= {foundListing.latitude} longitude= {foundListing.longitude} name= {foundListing.property_name} address={foundListing.address} city={foundListing.city} country={foundListing.country} onClose={closeMapModal} />}
        {showReviewModal && <ReviewModal onClose={closeReviewModal} modalReservationId= {modalReservationId} modalPropertyName= {modalPropertyName}/>}
        {showReviewForm && <ReviewForm onClose={closeReviewForm} sessionUserId= {sessionUser.id} modalReservationId= {modalReservationId} modalListingId= {modalListingId} modalPropertyName= {modalPropertyName}/>}

        <div style={{ borderBottom: "1px solid #dddfe4",boxShadow: "0 4px 32px rgba(0,0,0,.1)"}}>
          <Navigation />
        </div>

        {showConfirmation && (
            <div className="confirmation-box">Changes saved successfully</div>
        )}

        {showDeleteConfirmation && (
            <div className="confirmation-box">Reservation cancelled</div>
        )}


        <div className="user-yellow-box" style={conditionalColor}>
            <div className="mid-div">
            <div className="user-tabs">
                <div className={`user-tabs-cont ${activeTab === 'Home' && 'active'}`} onClick={() => handleTabClick('Home')}>
                    <img src={houseIcon} alt="Home Icon" />
                    <p>Home</p>
                </div>
                <div className={`user-tabs-cont ${activeTab === 'Edit Details' && 'active'}`} onClick={() => handleTabClick('Edit Details')}>
                    <img src={userIcon} alt="Edit Details Icon" />
                    <p>Edit Details</p>
                </div>
                <div
                    className={`user-tabs-cont ${activeTab === 'My Trips' && 'active'}`}
                    onClick={() => {
                        handleTabClick('My Trips');
                        setShowReservation(false);
                    }}
                >
                    <img src={mapIcon} alt="My Trips Icon" />
                    <p>My Trips</p>
                </div>
            </div>

            {activeTab === 'Home' && (
                <div className="user-about">
                    <div className="picture-circle">
                        <img src={sessionUser.photoUrl || defaultPic} alt="User" style={{borderRadius: "50%", width: "5rem", height: "5rem"}}/>
                    </div>
                    <div className="name-and-age">
                        <p>{sessionUser.first_name}</p>
                        {sessionUser.date_of_birth !== null && sessionUser.nationality !== "" && (
                            <p style={{ fontSize: "26px" }}>{age} years old, {sessionUser.nationality}</p>
                        )}
                        {sessionUser.date_of_birth !== null && sessionUser.nationality === "" && (
                            <p style={{ fontSize: "26px" }}>{age} years old</p>
                        )}
                        {sessionUser.date_of_birth === null && sessionUser.nationality !== "" && (
                            <p style={{ fontSize: "26px" }}>{sessionUser.nationality}</p>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'Edit Details' && (
                <>
                <div className="edit-about">
                    <p>Edit Details</p>
                    <div className="edit-picture-circle">
                        <img src={sessionUser.photoUrl || defaultPic} alt="User" style={{borderRadius: "50%", width: "2.5rem", height: "2.5rem"}}/>
                    </div>
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

            {activeTab === "My Trips" && !showReservation && (
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
                                    <div key={reservation.id} className="future-booking" onClick={() => handleReservation(reservation.id)}>
                                        <div className="future-picture">
                                            <img src={correspondingListing?.photoUrls[0]}/>
                                        </div >
                                        <p>{correspondingListing?.property_name}</p>
                                        <div className="icon-and-text">
                                            <img src={LocationSVG} alt="Location Icon" className="icon" />
                                            <p>{correspondingListing?.city}</p>
                                            </div>
                                        <div className="icon-and-text">
                                            <img src={CalendarSVG} alt="Calendar Icon" className="icon" />
                                            <p>{startDate} - {endDate}</p>
                                        </div>
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
                                <div key={reservation.id} className="past-booking" onClick={() => handleReservation(reservation.id)}>
                                    <div className="outer-past-div">
                                        <div className="past-picture">
                                            <img src={correspondingListing?.photoUrls[0]} />
                                        </div>
                                        <div className="past-trip-info">
                                            <p>{correspondingListing?.property_name}</p>
                                            <div className="past-icon-and-text">
                                                <img src={LocationSVG} alt="Location Icon" className="past-icon" />
                                                <p>{correspondingListing?.city}</p>
                                            </div>
                                            <div className="past-icon-and-text">
                                                <img src={CalendarSVG} alt="Calendar Icon" className="past-icon" />
                                                <p>{startDate} - {endDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="past-review-div">
                                        <div className="past-num-div">
                                            {listingReview(reservation.id) &&
                                            <>
                                            <img src={StarSVG}/>
                                            <p style={{fontSize: "16px"}}>{extractRating(reservation.id)}</p>
                                            </>
                                            }
                                        </div>
                                        <div className="leave-review">
                                            {listingReview(reservation.id) ? (
                                            <>
                                                <p style={{fontSize: "14px"}} onClick={() => handleReviewClick(reservation.id, correspondingListing.property_name)}>See review</p>
                                                <img src={ArrowRight}/>
                                            </>
                                            ) : (
                                            <>
                                                <p style={{fontSize: "14px"}} onClick={() => handleReviewForm(reservation.id, correspondingListing.property_name, correspondingListing.id)}>Leave a review</p>
                                                <img src={ArrowRight}/>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                            })}
                        </>
                        ) : null}
                    </div>
                </>
            )}

            {activeTab === "My Trips" && showReservation && (
            <div className="reservation-container">
                <div className="back-to-trips" onClick={() => {
                    handleTabClick('My Trips');
                    setShowReservation(false);
                }}
                >
                    <div className="back-to-my-trips">
                        <img src={MyArrowSVG} alt="Back" style={{ width: '12px' }}/>
                        <p>Back to My Trips</p>
                    </div>
                </div>

                <div className="reservation-picture">
                    <img src={foundListing?.photoUrls[0]} />
                </div>

                <p className="found-listing-name">{foundListing.property_name}</p>
                <div className="icon-and-text">
                    <img src={LocationSVG} alt="Location Icon" className="icon" />
                    <p>{foundListing.address}, {foundListing.city}, {foundListing.country}</p>
                </div>
                <div className="icon-and-text" style={{marginTop: "5px"}}>
                    <img src={CalendarSVG} alt="Calendar Icon" className="icon" />
                    <p>{formatDate(foundReservation.start_date)} - {formatDate(foundReservation.end_date)}</p>
                </div>
                <div className="trips-maps-button" onClick={() => handleMapClick()}>
                    <img src={mapIcon} alt="My Trips Icon" />
                    <p>Map</p>
                </div>
                

            </div>
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

        {activeTab === 'My Trips' && showReservation && (
            <>
                <div className="reservation-info">
                    <div className="reservation-info-buttons">
                        <div className="reservation-info-button">
                            <div className="reservation-info-button-inner">
                                <img src={CalendarSVG} alt="Calendar Icon" className="trip-icon" />
                                <p>Booking Details</p>
                            </div>
                            <img src={RightSVG} alt="Calendar Icon" className="icon" style={{marginRight: "10px", marginTop: "0px"}}/>
                        </div>
                        <div className="reservation-info-button">
                            <div className="reservation-info-button-inner" onClick={() => {history.push(`/listings/${foundListing.id}`)}}>
                                <img src={BuildingSVG} alt="Calendar Icon" className="trip-icon" />
                                <p>View Booking</p>
                            </div>
                            <img src={RightSVG} alt="Calendar Icon" className="icon" style={{marginRight: "10px", marginTop: "0px"}}/>
                        </div>

                        {!isReservationInPast ? (
                        <>
                        <div className="reservation-info-button">
                            <div className="reservation-info-button-inner">
                                    <img src={ChangeSVG} alt="Calendar Icon" className="trip-icon"/>
                                    <p>Change Booking</p>
                                </div>
                                <img src={RightSVG} alt="Calendar Icon" className="icon" style={{marginRight: "10px", marginTop: "0px"}}/>
                            </div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <div className="reservation-info-button" onClick={() => isRefundable && handleDeleteReservation(ReservationId)} disabled={!isRefundable} style={{opacity: isRefundable ? "initial" : ".5", pointerEvents: isRefundable ? 'auto' : 'none'}} >
                                    <div className="reservation-info-button-inner">
                                        <img src={CancelSVG} alt="Calendar Icon" className="trip-icon" />
                                        <p>Cancel Booking</p>
                                    </div>
                                    <img src={RightSVG} alt="Calendar Icon" className="icon" style={{ marginRight: "10px", marginTop: "0px" }} />
                                </div>
                                { !isRefundable && 
                                <p style={{fontFamily: "Inter", fontWeight: "700", marginTop: "14px", fontSize: "12px"}}>This booking is non-refundable</p>
                                }
                            </div>
                        </>
                        ) : (
                            !listingReview(ReservationId) ? (
                                <button className="review-button" onClick={() => handleReviewForm(ReservationId, foundListing.property_name, foundListing.id)}> 
                                    <img src={transpartstar}/>
                                    <span>Leave a review</span>
                                </button>
                            ) : (
                                <button className="review-button" onClick={() => handleReviewClick(ReservationId, foundListing.property_name)}> 
                                    <img src={transpartstar}/>
                                    <span>View Review</span>
                                </button>
                            )
                        )}
                    </div>
                </div>
                <div className="reservation-info2"></div>
            </>
        )}

        <Footer />
        </>
    )

}

export default UserShow;