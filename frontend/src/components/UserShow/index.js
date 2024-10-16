import Navigation from "../Navigation";
import { UserHome, HomeStats } from '../UserShow/UserHome';
import { UserEdit, EditButtons } from "./UserEdit";
import "./UserShow.css"
import Footer from "../Footer";
import userIcon from "../../assets/pictures/icons/user-128.svg"
import houseIcon from "../../assets/pictures/icons/house-svgrepo-com.svg"
import mapIcon from "../../assets/pictures/icons/clipart2731071.png"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import { deleteReservation } from "../../store/reservations";
import LocationSVG from "../../assets/pictures/icons/location-pin-svgrepo-com.svg"
import CalendarSVG from "../../assets/pictures/icons/calendar-alt-svgrepo-com.svg"
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import ArrowRight from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import BuildingSVG from "../../assets/pictures/icons/921-200.png"
import CancelSVG from "../../assets/pictures/icons/728248.webp"
import RightSVG from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import ReservationMapModal from "../ReservationMapModal";
import { useHistory, useLocation } from 'react-router-dom';
import ReviewModal from "../ReviewModal";
import ReviewForm from "../ReviewForm";
import transpartstar from "../../assets/pictures/icons/2336461-200.png"
import BookingDetailsModal from "../BookingDetailsModal"
import SearchBar2 from "../SearchBar2";
import { updateGuests, setLocation } from "../../store/cart";

function UserShow() {
    const location = useLocation();
    const { tabName } = location.state || {};
    const reviews = useSelector((state) => state.reviews);
    const history = useHistory();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [activeTab, setActiveTab] = useState(tabName);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const [ReservationId, setReservationId] = useState();
    const [showMapModal, setShowMapModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [modalReservationId, setModalReservationId] = useState("");
    const [modalPropertyName,setModalPropertyName] = useState("");
    const [modalListingId, setModalListingId] = useState();
    const [showDetails, setShowDetails] = useState(false);
    const [isRefundable, setIsRefundable] = useState(true);
    const today = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [activeTab, showReservation]);

    useEffect(() => {
        if (showMapModal || showDetails) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto'; 
        };
      }, [showMapModal, showDetails]);
    
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

     const closeModal = () => {
        setShowDetails(false);
      };

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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); 
    };

    useEffect(() => {
        setActiveTab(tabName);
      }, [tabName]);

    const conditionalColor = {
        backgroundColor: activeTab === 'Home' ? "#f6a90e" : "white"
    };
    
    const conditionalClipPath = {
        clipPath: activeTab === 'Home' ? 'polygon(0 0, 100% 0, 100% calc(100% - 3rem), 0 100%)' : ''
    };    

    useEffect(() => {
        if (activeTab === 'My Trips'){
            setShowReservation(false);
        }
    }, [activeTab]);

      useEffect(() => {
        if (showDeleteConfirmation) {
          const timer = setTimeout(() => {
            setShowDeleteConfirmation(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [showDeleteConfirmation]);
      
      function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const formattedDate = utcDate.toLocaleDateString('en-US', options);
        return formattedDate;
      }

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const futureReservations = Object.values(reservations)
      .filter(reservation => reservation?.user_id === sessionUser.id)
      .filter(reservation => {
        const startDate = new Date(reservation?.start_date);
        return startDate > currentDate;
      });
    
    const pastReservations = Object.values(reservations)
      .filter(reservation => reservation?.user_id === sessionUser.id)
      .filter(reservation => {
        const startDate = new Date(reservation?.start_date);
        return startDate < currentDate;
      });    

      const groupReservationsByTime = (reservations) => reservations.reduce((groups, reservation) => {
        const existingGroup = groups.find(group => Math.abs(new Date(reservation.created_at) - new Date(group[group.length - 1].created_at)) <= 1500);
        existingGroup ? existingGroup.push(reservation) : groups.push([reservation]);
        return groups;
      }, []).map(group => group[0]);

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

    const handleDeleteReservation = (ReservationId, reservations) => {
        handleTabClick('My Trips');
        setShowReservation(false);
      
        const reservationsArray = Object.values(reservations);
        const targetReservation = reservationsArray.find(reservation => reservation.id === ReservationId);
        const targetCreatedAt = targetReservation ? targetReservation.created_at : null;
      
        const reservationsToDelete = reservationsArray.filter(reservation => {
          if (targetCreatedAt) {
            const timeDifference = Math.abs(new Date(targetCreatedAt) - new Date(reservation.created_at));
            return timeDifference <= 1500;
          }
          return false;
        });
      
        reservationsToDelete.forEach(reservation => {
          dispatch(deleteReservation(reservation.id));
        });
      
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

    sessionStorage.setItem('redirectUrl', window.location.pathname);
    const guests = cart.guests || localStorage.getItem('guests') || "1";
    const locations = cart.location || localStorage.getItem('location') || "";

    useEffect(() => {
    localStorage.setItem('location', locations);
    localStorage.setItem('guests', guests);

    dispatch(setLocation(locations));
    dispatch(updateGuests(guests));
    }, [locations, guests]);

    useEffect(() => {
    if (cart.checkIn){
    dispatch(fetchListings(cart.checkIn, cart.checkOut)).catch((error) => {
    console.error("Error fetching listing:", error);
    });
    } else {
    dispatch(fetchListings(today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0])).catch((error) => {
        console.error("Error fetching listing:", error)
    });
    }
    }, [dispatch]);

    return (
        <>
        {showMapModal && <ReservationMapModal  latitude= {foundListing.latitude} longitude= {foundListing.longitude} name= {foundListing.property_name} address={foundListing.address} city={foundListing.city} country={foundListing.country} onClose={closeMapModal} />}
        {showReviewModal && <ReviewModal onClose={closeReviewModal} modalReservationId= {modalReservationId} modalPropertyName= {modalPropertyName}/>}
        {showReviewForm && <ReviewForm onClose={closeReviewForm} sessionUserId= {sessionUser.id} modalReservationId= {modalReservationId} modalListingId= {modalListingId} modalPropertyName= {modalPropertyName}/>}
        {showDetails && <BookingDetailsModal onClose={closeModal} bookingReference= {ReservationId} startDate= {foundReservation.start_date} endDate= {foundReservation.end_date} reservationDate= {foundReservation.created_at} listing={foundListing}/>}

        {showDeleteConfirmation && (
            <div className="confirmation-box">Reservation cancelled</div>
        )}

        <div style={{ borderBottom: "1px solid #dddfe4", boxShadow: "0 4px 32px rgba(0,0,0,.1)"}}>
            <Navigation />
        </div>

        <div className="user-yellow-box" style={{ backgroundColor: conditionalColor.backgroundColor, clipPath: conditionalClipPath.clipPath }}>
            <div className="mid-div">
            <div className="user-tabs">
                <div className={`user-tabs-cont ${activeTab === 'Home' && 'active'}`} onClick={() => handleTabClick('Home')}>
                    <img src={houseIcon} alt="Home Icon" />
                    <p>Home</p>
                    {activeTab === 'Home' && (
                        <span className='check-mark2'>&#10004;</span>
                    )}
                </div>
                <div className={`user-tabs-cont ${activeTab === 'Edit Details' && 'active'}`} onClick={() => handleTabClick('Edit Details')}>
                    <img src={userIcon} alt="Edit Details Icon" />
                    <p>Edit Details</p>
                    {activeTab === 'Edit Details' && (
                        <span className='check-mark2'>&#10004;</span>
                    )}
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
                    {activeTab === 'My Trips' && (
                        <span className='check-mark2'>&#10004;</span>
                    )}
                </div>
            </div>

            {activeTab === 'Home' && (
                <UserHome sessionUser= {sessionUser}/>
            )}

            {activeTab === 'Edit Details' && (
               <UserEdit sessionUser= {sessionUser} setButtonDisabled= {setButtonDisabled}/>
            )}

            {activeTab === "My Trips" && !showReservation && (
                <>
                    <div className="my-trips">
                        <p>My Trips</p>
                        <p>Coming Soon</p>

                        {futureReservations.length === 0 ? (
                            <>
                            <div style={{width: "125%"}}>

                                <div className="bus-div">
                                    <img src="https://www.hostelworld.com/pwa/_nuxt/img/05d49c7.svg"/>
                                    <div className="other-ready">
                                    <p id="other">Others are busy booking.</p>
                                    <p id="ready">Ready to start looking?</p>
                                    </div>
                                </div>
                            <div style={{width: "45rem"}}>
                                <SearchBar2/>
                            </div>
                            </div>
                            
                            </>
                            ) : (
                            <>
                                {groupReservationsByTime(futureReservations).map((reservation) => {
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
                        {groupReservationsByTime(pastReservations).map((reservation) => {
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
          <HomeStats reservations= {reservations} sessionUser= {sessionUser} listings= {listings}/>
        )}

        {activeTab === 'Edit Details' && (
            <EditButtons buttonDisabled= {buttonDisabled} sessionUser= {sessionUser} /> 
        )}

        {activeTab === 'My Trips' && showReservation && (
            <>
                <div className="reservation-info">
                    <div className="reservation-info-buttons">
                        <div className="reservation-info-button" onClick={() => setShowDetails(true)}>
                            <div className="reservation-info-button-inner">
                                <img src={CalendarSVG} alt="Calendar Icon" className="trip-icon" />
                                <p>Booking Details</p>
                            </div>
                            <img src={RightSVG} alt="Calendar Icon" className="icon" style={{marginRight: "10px", marginTop: "0px"}}/>
                        </div>
                        <div className="reservation-info-button" onClick={() => {history.push(`/listings/${foundListing.id}`)}}>
                            <div className="reservation-info-button-inner">
                                <img src={BuildingSVG} alt="Calendar Icon" className="trip-icon" />
                                <p>View Booking</p>
                            </div>
                            <img src={RightSVG} alt="Calendar Icon" className="icon" style={{marginRight: "10px", marginTop: "0px"}}/>
                        </div>

                        {!isReservationInPast ? (
                        <>
                        {/* <div className="reservation-info-button">
                            <div className="reservation-info-button-inner">
                                    <img src={ChangeSVG} alt="Calendar Icon" className="trip-icon"/>
                                    <p>Change Booking</p>
                            </div>
                                <img src={RightSVG} alt="Calendar Icon" className="icon" style={{marginRight: "10px", marginTop: "0px"}}/>
                        </div> */}
                            <div onClick={() => isRefundable && handleDeleteReservation(ReservationId, reservations)} disabled={!isRefundable} style={{display: "flex", alignItems: "center", opacity: isRefundable ? "initial" : ".5", pointerEvents: isRefundable ? 'auto' : 'none'}}>
                                <div className="reservation-info-button" >
                                    <div className="reservation-info-button-inner">
                                        <img src={CancelSVG} alt="Calendar Icon" className="trip-icon" />
                                        <p>Cancel Booking</p>
                                    </div>
                                    <img src={RightSVG} alt="Calendar Icon" className="icon" style={{ marginRight: "10px", marginTop: "0px" }} />
                                </div>
                                { !isRefundable && 
                                <p style={{fontFamily: "Inter-bold", marginTop: "14px", fontSize: "12px"}}>This booking is non-refundable</p>
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