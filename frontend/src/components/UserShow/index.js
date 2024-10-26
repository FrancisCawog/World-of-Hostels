import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import Navigation from "../Navigation";
import SideBar from "./SideBar";
import { UserHome, HomeStats } from '../UserShow/UserHome';
import { UserEdit, EditButtons } from "./UserEdit";
import { UserTrips, PastTrips, PastTripButtons } from "./UserTrips";
import Footer from "../Footer";
import ReviewModal from "../ReviewModal";
import ReviewForm from "../ReviewForm";
import { fetchListings } from "../../store/listings";
import { updateGuests, setLocation } from "../../store/cart";
import "./UserShow.css";

function UserShow() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { tabName } = location.state || {};
    
    const reviews = useSelector(state => state.reviews);
    const cart = useSelector(state => state.cart);
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const guests = cart.guests || localStorage.getItem('guests') || "1";
    const locations = cart.location || localStorage.getItem('location') || "";

    const [activeTab, setActiveTab] = useState(tabName);
    const [showReservation, setShowReservation] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [modalReservationId, setModalReservationId] = useState("");
    const [modalPropertyName, setModalPropertyName] = useState("");
    const [modalListingId, setModalListingId] = useState();
    const [ReservationId, setReservationId] = useState();
    const [showDetails, setShowDetails] = useState(false);
    const [isRefundable, setIsRefundable] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [foundListing, setFoundListing] = useState(null);

    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeTab, showReservation]);

    useEffect(() => {
        if (showReviewModal || showReviewForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showReviewModal, showReviewForm]);

    const pastReservations = Object.values(reservations)
        .filter(reservation => reservation?.user_id === sessionUser.id)
        .filter(reservation => new Date(reservation?.start_date) < currentDate);

    const futureReservations = Object.values(reservations)
        .filter(reservation => reservation?.user_id === sessionUser.id)
        .filter(reservation => new Date(reservation?.start_date) > currentDate);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleReservation = (id) => {
        setShowReservation(true);
        setReservationId(id);
    };

    const handleReviewClick = (reservationId, property_name) => {
        handleReservation(reservationId);
        setModalReservationId(reservationId);
        setModalPropertyName(property_name);
        setShowReviewModal(true);
    };

    const handleReviewForm = (reservationId, property_name, listing_id) => {
        setModalReservationId(reservationId);
        setModalPropertyName(property_name);
        setModalListingId(listing_id);
        setShowReviewForm(true);
    };

    const listingReview = (reservationId) => {
        const review = Object.values(reviews).filter(review => review?.reservation_id === reservationId);
        return review.length === 1;
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        return utcDate.toLocaleDateString('en-US', options);
    };

    const conditionalColor = { backgroundColor: activeTab === 'Home' ? "#f6a90e" : "white" };
    const conditionalClipPath = { clipPath: activeTab === 'Home' ? 'polygon(0 0, 100% 0, 100% calc(100% - 3rem), 0 100%)' : '' };

    useEffect(() => {
        if (activeTab === 'My Trips') {
            setShowReservation(false);
        }
    }, [activeTab]);

    useEffect(() => {
        setActiveTab(tabName);
    }, [tabName]);

    useEffect(() => {
        localStorage.setItem('location', locations);
        localStorage.setItem('guests', guests);

        dispatch(setLocation(locations));
        dispatch(updateGuests(guests));
    }, [locations, guests]);

    useEffect(() => {
        const fetchDate = cart.checkIn ? cart.checkIn : today.toISOString().split("T")[0];
        const fetchEnd = cart.checkOut ? cart.checkOut : tomorrow.toISOString().split("T")[0];
        
        dispatch(fetchListings(fetchDate, fetchEnd)).catch(error => {
            console.error("Error fetching listing:", error);
        });
    }, [dispatch, cart.checkIn, cart.checkOut]);

    return (
        <>
            {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} modalReservationId={modalReservationId} modalPropertyName={modalPropertyName} />}
            {showReviewForm && <ReviewForm onClose={() => setShowReviewForm(false)} sessionUserId={sessionUser.id} modalReservationId={modalReservationId} modalListingId={modalListingId} modalPropertyName={modalPropertyName} />}

            <div style={{ borderBottom: "1px solid #dddfe4", boxShadow: "0 4px 32px rgba(0,0,0,.1)" }}>
                <Navigation />
            </div>

            <div className="user-yellow-box" style={{ backgroundColor: conditionalColor.backgroundColor, clipPath: conditionalClipPath.clipPath }}>
                <div className="mid-div">
                    <SideBar activeTab={activeTab} handleTabClick={handleTabClick} setShowReservation={setShowReservation} />

                    {activeTab === 'Home' && <UserHome sessionUser={sessionUser} />}
                    {activeTab === 'Edit Details' && <UserEdit sessionUser={sessionUser} setButtonDisabled={setButtonDisabled} />}
                    {activeTab === 'My Trips' && !showReservation && (
                        <UserTrips futureReservations={futureReservations} formatDate={formatDate} listings={listings} pastReservations={pastReservations} listingReview={listingReview} reviews={reviews} handleReviewClick={handleReviewClick} handleReviewForm={handleReviewForm} handleReservation={handleReservation} />
                    )}
                    {activeTab === 'My Trips' && showReservation && (
                        <PastTrips handleTabClick={handleTabClick} ReservationId={ReservationId} foundListing={foundListing} setShowReservation={setShowReservation} formatDate={formatDate} reservations={reservations} listings={listings} setIsRefundable={setIsRefundable} showDetails={showDetails} setShowDetails={setShowDetails} setFoundListing={setFoundListing} />
                    )}
                </div>
            </div>

            {activeTab === 'Home' && <HomeStats reservations={reservations} sessionUser={sessionUser} listings={listings} />}
            {activeTab === 'Edit Details' && <EditButtons buttonDisabled={buttonDisabled} sessionUser={sessionUser} />}
            {activeTab === 'My Trips' && showReservation && (
                <PastTripButtons reservations={reservations} foundListing={foundListing} handleTabClick={handleTabClick} setShowReservation={setShowReservation} listingReview={listingReview} handleReviewForm={handleReviewForm} handleReviewClick={handleReviewClick} ReservationId={ReservationId} isRefundable={isRefundable} setShowDetails={setShowDetails} pastReservations={pastReservations} />
            )}

            <Footer />
        </>
    );
}

export default UserShow;