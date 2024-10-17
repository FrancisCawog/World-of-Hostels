import Navigation from "../Navigation";
import { UserHome, HomeStats } from '../UserShow/UserHome';
import { UserEdit, EditButtons } from "./UserEdit";
import { UserTrips, PastTrips, PastTripButtons } from "./UserTrips";
import mapIcon from "../../assets/pictures/icons/clipart2731071.png"
import "./UserShow.css"
import Footer from "../Footer";
import userIcon from "../../assets/pictures/icons/user-128.svg"
import houseIcon from "../../assets/pictures/icons/house-svgrepo-com.svg"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useLocation } from 'react-router-dom';
import ReviewModal from "../ReviewModal";
import ReviewForm from "../ReviewForm";
import { updateGuests, setLocation } from "../../store/cart";

function UserShow() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { tabName } = location.state || {};
    const reviews = useSelector((state) => state.reviews);
    const cart = useSelector((state) => state.cart);
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const [showDetails, setShowDetails] = useState(false);
    const [ReservationId, setReservationId] = useState();
    const [isRefundable, setIsRefundable] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [activeTab, setActiveTab] = useState(tabName);
    const [showReservation, setShowReservation] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [modalReservationId, setModalReservationId] = useState("");
    const [modalPropertyName,setModalPropertyName] = useState("");
    const [modalListingId, setModalListingId] = useState();
    const [foundListing, setFoundListing] = useState(null);
    const today = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const pastReservations = Object.values(reservations)
    .filter(reservation => reservation?.user_id === sessionUser.id)
    .filter(reservation => {
      const startDate = new Date(reservation?.start_date);
      return startDate < currentDate;
    });   

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [activeTab, showReservation]);

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

      const handleReservation = (id) => {
        setShowReservation(true);
        setReservationId(id);
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
      
      function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const formattedDate = utcDate.toLocaleDateString('en-US', options);
        return formattedDate;
      }

      const futureReservations = Object.values(reservations)
      .filter(reservation => reservation?.user_id === sessionUser.id)
      .filter(reservation => {
        const startDate = new Date(reservation?.start_date);
        return startDate > currentDate;
      });

    const listingReview = (reservationId) => {
        const review = Object.values(reviews).filter(review => review?.reservation_id === reservationId);
        if (review.length === 1) {
            return true
        } else {
            return false
        }
    }

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
        {showReviewModal && <ReviewModal onClose={closeReviewModal} modalReservationId= {modalReservationId} modalPropertyName= {modalPropertyName}/>}
        {showReviewForm && <ReviewForm onClose={closeReviewForm} sessionUserId= {sessionUser.id} modalReservationId= {modalReservationId} modalListingId= {modalListingId} modalPropertyName= {modalPropertyName}/>}

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
                <UserTrips futureReservations={futureReservations} formatDate={formatDate} listings={listings} pastReservations={pastReservations} listingReview={listingReview} reviews={reviews} handleReviewClick={handleReviewClick} handleReviewForm={handleReviewForm} handleReservation={handleReservation}/>
            )}

            {activeTab === "My Trips" && showReservation && (
                <PastTrips handleTabClick={handleTabClick} ReservationId={ReservationId} foundListing={foundListing} setShowReservation={setShowReservation} formatDate={formatDate} reservations={reservations} listings={listings} setIsRefundable={setIsRefundable} showDetails={showDetails} setShowDetails={setShowDetails} setFoundListing={setFoundListing} />
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
            <PastTripButtons reservations={reservations} foundListing={foundListing} handleTabClick={handleTabClick} setShowReservation={setShowReservation} listingReview={listingReview} handleReviewForm={handleReviewForm} handleReviewClick={handleReviewClick} ReservationId={ReservationId} isRefundable={isRefundable} setShowDetails={setShowDetails} pastReservations={pastReservations}/>
        )}

        <Footer/>
        </>
    )

}

export default UserShow;