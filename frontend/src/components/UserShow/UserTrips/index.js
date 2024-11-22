import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReservation } from "../../../store/reservations";
import SearchBar2 from "../../SearchBar2";
import ReservationMapModal from "../../ReservationMapModal";
import BookingDetailsModal from "../../BookingDetailsModal";
import StarSVG from "../../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import ArrowRight from "../../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import mapIcon from "../../../assets/pictures/icons/clipart2731071.png";
import LocationSVG from "../../../assets/pictures/icons/location-pin-svgrepo-com.svg";
import MyArrowSVG from "../../../assets/pictures/icons/arrow-left.svg";
import CalendarSVG from "../../../assets/pictures/icons/calendar-alt-svgrepo-com.svg";
import RightSVG from "../../../assets/pictures/icons/right-arrow-svgrepo-com.svg";
import BuildingSVG from "../../../assets/pictures/icons/921-200.png";
import CancelSVG from "../../../assets/pictures/icons/728248.webp";
import transpartstar from "../../../assets/pictures/icons/2336461-200.png";

export function UserTrips({
    futureReservations,
    formatDate,
    listings,
    pastReservations,
    listingReview,
    reviews,
    handleReviewClick,
    handleReviewForm,
    handleReservation
}) {
    const groupReservationsByTime = (reservations) => {
        return reservations.reduce((groups, reservation) => {
            const existingGroup = groups.find(group => 
                Math.abs(new Date(reservation.created_at) - new Date(group[group.length - 1].created_at)) <= 1500
            );
            existingGroup ? existingGroup.push(reservation) : groups.push([reservation]);
            return groups;
        }, []).map(group => group[0]);
    };

    const extractRating = (reservationId) => {
        const listingReviews = Object.values(reviews).filter(review => review.reservation_id === reservationId);
        const review = listingReviews[0];
        return review?.total_score;
    };

    return (
        <>
            <div className="my-trips">
                <p>My Trips</p>
                <p>Coming Soon</p>

                {futureReservations.length === 0 ? (
                    <div style={{width: "125%"}}>
                        <div className="bus-div">
                            <img src="https://www.hostelworld.com/pwa/_nuxt/img/05d49c7.svg" />
                            <div className="other-ready">
                                <p id="other">Others are busy booking.</p>
                                <p id="ready">Ready to start looking?</p>
                            </div>
                        </div>
                        <div style={{width: "45rem"}}>
                            <SearchBar2 />
                        </div>
                    </div>
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
                                        <img src={correspondingListing?.photoUrls[0]} />
                                    </div>
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

                {pastReservations.length > 0 && (
                    <>
                        <br />
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
                                            {listingReview(reservation.id) && (
                                                <>
                                                    <img src={StarSVG} />
                                                    <p style={{fontSize: "16px"}}>{extractRating(reservation.id)}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="leave-review">
                                            {listingReview(reservation.id) ? (
                                                <>
                                                    <p style={{fontSize: "14px"}} onClick={() => handleReviewClick(reservation.id, correspondingListing.property_name)}>
                                                        See review
                                                    </p>
                                                    <img src={ArrowRight} />
                                                </>
                                            ) : (
                                                <>
                                                    <p style={{fontSize: "14px"}} onClick={() => handleReviewForm(reservation.id, correspondingListing.property_name, correspondingListing.id)}>
                                                        Leave a review
                                                    </p>
                                                    <img src={ArrowRight} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
}


export function PastTrips({
    handleTabClick, 
    ReservationId,
    foundListing, 
    setShowReservation, 
    formatDate, 
    reservations, 
    listings, 
    setIsRefundable, 
    showDetails, 
    setShowDetails,
    setFoundListing
}) {
    const [showMapModal, setShowMapModal] = useState(false);
    let foundReservation = null;

    useEffect(() => {
        if (!foundReservation?.refundable) {
            setIsRefundable(false);
        } else {
            setIsRefundable(true);
        }
    }, [foundReservation]);

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

    if (ReservationId) {
        foundReservation = Object.values(reservations).find(
          (reservation) => reservation.id === ReservationId
        );
    
        if (foundReservation) {
          const listing = Object.values(listings).find(
            (listing) => listing.id === foundReservation.listing_id
          );
          setFoundListing(listing);
        }
      }

    const handleMapClick = () => setShowMapModal(true);
    const closeModal = () => setShowDetails(false);
    const closeMapModal = () => setShowMapModal(false);

    return (
        <>
        {showDetails && (
            <BookingDetailsModal
                onClose={closeModal}
                bookingReference={ReservationId}
                startDate={foundReservation.start_date}
                endDate={foundReservation.end_date}
                reservationDate={foundReservation.created_at}
                listing={foundListing}
            />
        )}
        {showMapModal && (
            <ReservationMapModal
                latitude={foundListing?.latitude}
                longitude={foundListing?.longitude}
                name={foundListing?.property_name}
                address={foundListing?.address}
                city={foundListing?.city}
                country={foundListing?.country}
                onClose={closeMapModal}
            />
        )}
        <div className="reservation-container">
            <div className="back-to-trips" onClick={() => {
                handleTabClick('My Trips');
                setShowReservation(false);
            }}>
                <div className="back-to-my-trips">
                    <img src={MyArrowSVG} alt="Back" style={{ width: '12px' }} />
                    <p>Back to My Trips</p>
                </div>
            </div>

            <div className="reservation-picture">
                <img src={foundListing?.photoUrls[0]} />
            </div>

            <p className="found-listing-name">{foundListing?.property_name}</p>
            <div className="icon-and-text">
                <img src={LocationSVG} alt="Location Icon" className="icon" />
                <p>{foundListing?.address}, {foundListing?.city}, {foundListing?.country}</p>
            </div>
            <div className="icon-and-text" style={{ marginTop: "5px" }}>
                <img src={CalendarSVG} alt="Calendar Icon" className="icon" />
                <p>{formatDate(foundReservation.start_date)} - {formatDate(foundReservation.end_date)}</p>
            </div>
            <div className="trips-maps-button" onClick={handleMapClick}>
                <img src={mapIcon} alt="My Trips Icon" />
                <p>Map</p>
            </div>
        </div>
        </>
    );
}

export function PastTripButtons({
    reservations, 
    foundListing, 
    handleTabClick, 
    setShowReservation, 
    listingReview, 
    handleReviewForm, 
    handleReviewClick, 
    ReservationId, 
    isRefundable, 
    setShowDetails, 
    pastReservations,
    setShowDeleteConfirmation,
    showDeleteConfirmation
}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const isReservationInPast = pastReservations.some(reservation => reservation.id === ReservationId);

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

    useEffect(() => {
        if (showDeleteConfirmation) {
            const timer = setTimeout(() => setShowDeleteConfirmation(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showDeleteConfirmation]);

    return (
        <>

        <div className="reservation-info">
            <div className="reservation-info-buttons">
                <div className="reservation-info-button" onClick={() => setShowDetails(true)}>
                    <div className="reservation-info-button-inner">
                        <img src={CalendarSVG} alt="Calendar Icon" className="trip-icon" />
                        <p>Booking Details</p>
                    </div>
                    <img src={RightSVG} alt="Calendar Icon" className="icon" style={{ marginRight: "10px", marginTop: "0px" }} />
                </div>
                <div className="reservation-info-button" onClick={() => history.push(`/listings/${foundListing.id}`)}>
                    <div className="reservation-info-button-inner">
                        <img src={BuildingSVG} alt="Calendar Icon" className="trip-icon" />
                        <p>View Booking</p>
                    </div>
                    <img src={RightSVG} alt="Calendar Icon" className="icon" style={{ marginRight: "10px", marginTop: "0px" }} />
                </div>

                {!isReservationInPast ? (
                    <>
                    {/* <div className="reservation-info-button">
                        <div className="reservation-info-button-inner">
                            <img src={ChangeSVG} alt="Calendar Icon" className="trip-icon"/>
                            <p>Change Booking</p>
                        </div>
                        <img src={RightSVG} alt="Calendar Icon" className="icon" style={{ marginRight: "10px", marginTop: "0px" }}/>
                    </div> */}
                    <div
                        onClick={() => isRefundable && handleDeleteReservation(ReservationId, reservations)}
                        disabled={!isRefundable}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            opacity: isRefundable ? "initial" : ".5",
                            pointerEvents: isRefundable ? 'auto' : 'none'
                        }}
                    >
                        <div className="reservation-info-button">
                            <div className="reservation-info-button-inner">
                                <img src={CancelSVG} alt="Calendar Icon" className="trip-icon" />
                                <p>Cancel Booking</p>
                            </div>
                            <img src={RightSVG} alt="Calendar Icon" className="icon" style={{ marginRight: "10px", marginTop: "0px" }} />
                        </div>
                        {!isRefundable && (
                            <p style={{ fontFamily: "Inter-bold", marginTop: "14px", fontSize: "12px" }}>
                                This booking is non-refundable
                            </p>
                        )}
                    </div>
                    </>
                ) : (
                    !listingReview(ReservationId) ? (
                        <button className="review-button" onClick={() => handleReviewForm(ReservationId, foundListing.property_name, foundListing.id)}> 
                            <img src={transpartstar} />
                            <span>Leave a review</span>
                        </button>
                    ) : (
                        <button className="review-button" onClick={() => handleReviewClick(ReservationId, foundListing.property_name)}> 
                            <img src={transpartstar} />
                            <span>View Review</span>
                        </button>
                    )
                )}
            </div>
        </div>
        <div className="reservation-info2" />
        </>
    );
}