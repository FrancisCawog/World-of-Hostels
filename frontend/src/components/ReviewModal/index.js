import React from 'react';
import { useSelector } from 'react-redux';
import './ReviewModal.css';
import HotelSVG from "../../assets/pictures/icons/95d12e1.svg"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import GrayStar from "../../assets/pictures/icons/star-on.svg"

const ReviewModal = ({onClose, modalReservationId, modalPropertyName}) => {
    const reviews = useSelector((state) => state.reviews);
    const listingReview = Object.values(reviews).filter(review => review.reservation_id === modalReservationId);
    const review = listingReview[0]
    const atmosphere = (review.atmosphere / 2)
    const cleanliness = (review.cleanliness / 2)
    const facilities = (review.facilities / 2)
    const location = (review.location / 2)
    const security = (review.security / 2)
    const staff = (review.staff / 2)
    const value = (review.value_for_money / 2)
    const totalScore = review.total_score
    const feedback = review.feedback
    const gender = review.about_you
    const ageGroup = review.age_group
    const tripType = review.trip_type

    const generateStarRating = (rating) => {
        const filledStars = Array(rating).fill(1);
        const emptyStars = Array(5 - rating).fill(0);
      
        return (
          <>
            {filledStars.map((_, index) => (
              <img key={`star-filled-${index}`} src={StarSVG} alt="Filled Star" style={{marginRight: '4px'}}/>
            ))}
            {emptyStars.map((_, index) => (
              <img key={`star-empty-${index}`} src={GrayStar} alt="Empty Star" style={{marginRight: '4px'}}/>
            ))}
          </>
        );
      };

    const reviewWord = (average) => {
        if (average >= 9){
            return "Superb"
        } else if (average >= 8.0) {
            return "Fabulous"
        } else if (average >= 7.0) {
            return "Very Good"
        } else if (average >= 6.0) {
            return "Good"
        } else {
            return ""
        }
    }
      

    return (
        <div className="modal-overlay">
            <div className="review-modal">
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
                                <img className='hotel-img' src={HotelSVG}/>
                            </div>

                            <div>
                                <div className='category-rating'>
                                    <p>Atmosphere</p>
                                    <div className='star-rating'>
                                        {generateStarRating(atmosphere)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Cleanliness</p>
                                    <div className='star-rating'>
                                        {generateStarRating(cleanliness)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Facilities</p>
                                    <div className='star-rating'>
                                        {generateStarRating(facilities)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Location</p>
                                    <div className='star-rating'>
                                        {generateStarRating(location)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Security</p>
                                    <div className='star-rating'>
                                        {generateStarRating(security)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Staff</p>
                                    <div className='star-rating'>
                                        {generateStarRating(staff)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Value</p>
                                    <div className='star-rating'>
                                        {generateStarRating(value)}
                                    </div>
                                </div>

                                <div className='category-rating'>
                                    <p>Overall Review</p>
                                    <div className='overall-rating'>
                                        <img src={StarSVG}/>
                                        <p id='total-score'>{totalScore}</p>
                                        <p id='review-word'>{reviewWord(totalScore)}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className='my-review'>My Review</p>
                                <p className='my-feedback'>{feedback}</p>
                            </div>

                            <div>
                                <p className='my-review'>About you</p>
                                <p className='my-review-desc'>{gender}</p>
                                <p className='my-review-desc'>{ageGroup}</p>
                                <p className='my-review-desc'>{tripType}</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );

}

export default ReviewModal