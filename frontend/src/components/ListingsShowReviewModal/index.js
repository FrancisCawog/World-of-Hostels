import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ListingsShowReviewModal.css';
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png";
import communication from "../../assets/pictures/icons/communication.svg";

const ListingsShowReviewModal = ({ onClose, reviews }) => {
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const users = useSelector((state) => state.users);
  const reservations = useSelector((state) => state.reservations);
  const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg";
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,independent,cca3");
      const data = await response.json();
      setCountriesData(data);
    };
    fetchCountriesData();
  }, [])

  const extractDate = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    const reservationId = numberedElement.reservation_id;
    const reservation = Object.values(reservations).find(reservation => reservation.id === reservationId);
    const date = new Date(reservation?.start_date);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const extractRating = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    return numberedElement.total_score;
  };

  const extractName = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    const userId = numberedElement.user_id;
    const user = Object.values(users).find(user => user.id === userId);
    const abbreviatedLastName = user?.last_name.charAt(0);
    const firstName = user?.first_name;
    return `${firstName} ${abbreviatedLastName}.`;
  };

  const extractDemographic = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    const userId = numberedElement.user_id;
    const user = Object.values(users).find(user => user.id === userId);
    const nationality = user?.nationality;
    const matchingCountry = countriesData.find(country => country.name.common === nationality);
    const ageGroup = numberedElement.age_group;
    let gender = numberedElement.about_you;
    gender = gender.charAt(0).toUpperCase() + gender.slice(1);

    return `${gender}, ${ageGroup}, ${matchingCountry ? matchingCountry.cca3 : nationality}`;
  };

  const extractPicture = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    const userId = numberedElement.user_id;
    const user = Object.values(users).find(user => user.id === userId);
    if (user) {
      return user.photoUrl;
    }
    return defaultPic;
  };

  const extractFeedback = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    return numberedElement.feedback;
  };

  const averageTotalScore = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);

    if (!listingReviews.length) {
      return 0.0;
    }

    const totalScoreSum = listingReviews.reduce(
      (accumulator, review) => accumulator + review.total_score,
      0
    );
    return totalScoreSum / listingReviews.length;
  };

  const numberOfReviews = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    return listingReviews.length;
  };

  const reviewWordRating = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const totalScoreSum = listingReviews.reduce(
      (accumulator, review) => accumulator + review.total_score,
      0
    );
    const average = totalScoreSum / listingReviews.length;
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

  const catRating = (listingId, category) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const totalCategorySum = listingReviews.reduce(
      (accumulator, review) => accumulator + review[category],
      0
    );
    return totalCategorySum / listingReviews.length;
  };

  const totalReviews = numberOfReviews(listing?.id);
  const reviewIndices = Array.from({ length: totalReviews }, (_, index) => index);

  const reviewElements = reviewIndices.map((index) => (
    extractFeedback(listing?.id, index) !== "" && (
      <div key={index} className="side-div2">
      <div className="date-and-rating">
        <p style={{ marginTop: "25px" }}>Stayed in {extractDate(listing?.id, index)}</p>
        <div className="star-and-rating">
          <img src={StarSVG} style={{ width: "20px", height: "20px" }} alt="Star"/>
          <p>{extractRating(listing?.id, index)}</p>
        </div>
      </div>

      <div className="pic-name-and-info">
        <div className="review-profile-pic">
          <img src={extractPicture(listing?.id, index) || defaultPic} style={{ borderRadius: "50%", width: "2.25rem", height: "2.25rem" }} alt="Profile"/>
        </div>
        <div className="review-name-info">
          <p>{extractName(listing?.id, index)}</p>
          <p>{extractDemographic(listing?.id, index)}</p>
        </div>
      </div>

      <div className="review-feedback" style={{ whiteSpace: "pre-wrap" }}>
        <p>{extractFeedback(listing?.id, index)}</p>
      </div>
    </div>
    )
  ));

  return (
    <div className="modal-overlay-review" onClick={onClose}>
      <div className="modal-review" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-review">
          <p className='review-p'>Reviews</p>
          <span className="close" onClick={onClose}>&times;</span>
          <div className='review-message-modal'>
            <img src={communication} alt="Communication"/>
            <div>
              <p className='review-100'>100% genuine reviews from real hostel travellers like you!</p>
            </div>
          </div>
          <div style={{ display: "flex", height: "25rem" }}>
            <div className="review-box-modal">
              <div className="review-rating-box-modal">
                <div className="listing-review-star-and-rating">
                  <img style={{ width: "24px", height: "24px" }} src={StarSVG} alt="Star"/>
                  <p>
                    <span className="total-score" style={{ marginRight: "10px", fontFamily: "Poppins-bold", fontSize: "1.75rem" }}>
                      {averageTotalScore(listing?.id).toFixed(1)}
                    </span>
                    <span className='reviews-modal-numbers'>
                      {reviewWordRating(listing?.id)}
                    </span>
                    <span className='reviews-modal-numbers'>
                      ({numberOfReviews(listing?.id)} Reviews)
                    </span>
                  </p>
                </div>
              </div>

              <ul className="rating-cats-modal">
                {["security", "location", "staff", "atmosphere", "cleanliness", "facilities", "value_for_money"].map((category) => (
                  <div key={category} className="rating-cats-tab-review">
                    <div className="category-label">
                    {category === "value_for_money" ? 
                    <p>Value for Money</p>
                      :
                      <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                    }
                    </div>
                    <div className="rating-bar-and-score-review">
                      <div className="rating-bars">
                        <div className="gray-bar-modal"></div>
                        <div className="yellow-bar-modal" style={{ width: `${catRating(listing?.id, category) * 1.5}%` }}></div>
                      </div>
                      <div>
                        <p className='cat-p'>{catRating(listing?.id, category).toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <div className='review-modal-popup'>
              {reviewElements}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsShowReviewModal;