import React from 'react';
import { useSelector } from 'react-redux';
import './ReviewModal.css';
import HotelSVG from "../../assets/pictures/icons/95d12e1.svg"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import GrayStar from "../../assets/pictures/icons/star-on.svg"

const ReviewModal = ({ onClose, modalReservationId, modalPropertyName }) => {
    const reviews = useSelector((state) => state.reviews);
    const listingReview = Object.values(reviews).filter(review => review.reservation_id === modalReservationId);
    const review = listingReview.length > 0 ? listingReview[0] : null;

    const {
        atmosphere = 0, cleanliness = 0, facilities = 0,
        location = 0, security = 0, staff = 0, value_for_money = 0,
        total_score = 0, feedback = "", about_you = "", age_group = "", trip_type = ""
    } = review || {};

    const atmosphereRating = atmosphere / 2;
    const cleanlinessRating = cleanliness / 2;
    const facilitiesRating = facilities / 2;
    const locationRating = location / 2;
    const securityRating = security / 2;
    const staffRating = staff / 2;
    const valueRating = value_for_money / 2;

    const generateStarRating = (rating) => {
        const filledStars = Array(Math.floor(rating)).fill(1);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = Array(5 - Math.ceil(rating)).fill(0);

        return (
            <>
                {filledStars.map((_, index) => (
                    <img key={`star-filled-${index}`} src={StarSVG} alt="Filled Star" style={{ marginRight: '4px' }} />
                ))}
                {hasHalfStar && <img key={`star-half`} src={GrayStar} alt="Half Star" style={{ marginRight: '4px' }} />}
                {emptyStars.map((_, index) => (
                    <img key={`star-empty-${index}`} src={GrayStar} alt="Empty Star" style={{ marginRight: '4px' }} />
                ))}
            </>
        );
    };

    const reviewWord = (average) => {
        if (average >= 9) {
            return "Superb";
        } else if (average >= 8.0) {
            return "Fabulous";
        } else if (average >= 7.0) {
            return "Very Good";
        } else if (average >= 6.0) {
            return "Good";
        } else {
            return "";
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="review-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <p className='modal-review-label'>My Review</p>
                    <span className="close" onClick={onClose}>&times;</span>
                    <div className="horizontal-line"></div>
                    <div className='review-content-box'>
                        <div className='property-info'>
                            <div>
                                <p className='property-tag'>Property</p>
                                <p className='property-name'>{modalPropertyName}</p>
                            </div>
                            <img className='hotel-img' src={HotelSVG} alt="Hotel" />
                        </div>

                        <div>
                            <div className='category-rating'>
                                <p>Atmosphere</p>
                                <div className='star-rating'>
                                    {generateStarRating(atmosphereRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Cleanliness</p>
                                <div className='star-rating'>
                                    {generateStarRating(cleanlinessRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Facilities</p>
                                <div className='star-rating'>
                                    {generateStarRating(facilitiesRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Location</p>
                                <div className='star-rating'>
                                    {generateStarRating(locationRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Security</p>
                                <div className='star-rating'>
                                    {generateStarRating(securityRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Staff</p>
                                <div className='star-rating'>
                                    {generateStarRating(staffRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Value</p>
                                <div className='star-rating'>
                                    {generateStarRating(valueRating)}
                                </div>
                            </div>

                            <div className='category-rating'>
                                <p>Overall Review</p>
                                <div className='overall-rating'>
                                    <img src={StarSVG} alt="Star" />
                                    <p id='total-score'>{total_score}</p>
                                    <p id='review-word'>{reviewWord(total_score)}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className='my-review'>My Review</p>
                            <p className='my-feedback'>{feedback}</p>
                        </div>

                        <div>
                            <p className='my-review'>About you</p>
                            <p className='my-review-desc'>{about_you}</p>
                            <p className='my-review-desc'>{age_group}</p>
                            <p className='my-review-desc'>{trip_type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;