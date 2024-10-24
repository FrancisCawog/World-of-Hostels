import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/users";
import ListingsShowReviewModal from "../../ListingsShowReviewModal";
import StarSVG from "../../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
const restCountriesData = await fetch("https://restcountries.com/v3.1/all?fields=name,independent,cca3").then(res => res.json());

export default function ListingReviewSection({numberOfReviews, listing, reviews, MyArrowSVG, tabName}) {
    const dispatch = useDispatch();
    const reservations = useSelector((state) => state?.reservations);
    const users = useSelector((state) => state?.users);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg"

    const conditionalHeight = () => {
        if (numberOfReviews(listing?.id) <= 2) {
          return {height: "520px"}
        } else if (numberOfReviews(listing?.id) > 2){
          return {height: "900px"}
        }
      }

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

      const reviewWordRating = (listingId) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const totalScoreSum = listingReviews.reduce(
          (accumulator, review) => accumulator + review.total_score,
          0
        );
        const average = totalScoreSum / listingReviews.length;
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

      const catRating = (listingId, category) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const totalCategorySum = listingReviews.reduce(
          (accumulator, review) => accumulator + review[category], 
          0
        );
        return totalCategorySum / listingReviews.length;
      }

      const extractDate = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const numberedElement = listingReviews[num]
        const reservationId = numberedElement.reservation_id;
        const reservation = Object.values(reservations).find(reservation => reservation?.id === reservationId);
        const date = new Date(reservation?.start_date);
        const options = { year: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
      }

      const extractRating = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const numberedElement = listingReviews[num]
        return numberedElement.total_score
      }

      const extractPicture = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const numberedElement = listingReviews[num]
        const userId = numberedElement.user_id;
        const user = Object.values(users).find(user => user.id === userId);
        if (user) {
          return user.photoUrl
        }
      }

      const extractName = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const numberedElement = listingReviews[num]
        const userId = numberedElement.user_id;
        const user = Object.values(users).find(user => user.id === userId);
        const abbreviatedLastName = user?.last_name.charAt(0);
        const firstName = user?.first_name
        return `${firstName} ${abbreviatedLastName}.`;
      }

      
    const extractDemographic = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const numberedElement = listingReviews[num];
        const userId = numberedElement.user_id;
        const user = Object.values(users).find(user => user.id === userId);
        const nationality = user?.nationality;
        const matchingCountry = restCountriesData.find(country => country.name.common === nationality);
        const ageGroup = numberedElement.age_group;
        let gender = numberedElement.about_you;
        gender = gender.charAt(0).toUpperCase() + gender.slice(1);
    
        return `${gender}, ${ageGroup}, ${matchingCountry ? matchingCountry.cca3 : nationality}`;
    };

    const extractFeedback = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const numberedElement = listingReviews[num]
        return numberedElement.feedback
      }

      useEffect(() => {
        dispatch(fetchUsers()).catch((error) => {
          console.error("Error fetching users:", error);
        });
      }, [dispatch]);

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

    return (
        <>
        {showReviewModal && <ListingsShowReviewModal tabName={tabName} onClose={closeReviewModal} reviews={reviews}/>}

        {numberOfReviews(listing?.id) !== 0 &&
            <div id="show-reviews" className="show-reviews">
              <div className="purple-container">
                  <div className="angled-box" style={conditionalHeight()}>
                      <div className="skewed-wrapper">
                          <div>
                            {numberOfReviews(listing?.id) > 1 &&
                              <span id="reviews">Reviews</span>
                            }
                            {numberOfReviews(listing?.id) === 1 &&
                              <span id="reviews">Review</span>
                            }
                              <div id="review-box">
                                <div className="review-rating-box"> 
                                  <div className="listing-review-star-and-rating" style={{marginTop: "10px"}}>
                                    <img style={{width: "24px", height: "24px"}} src={StarSVG}/>
                                    <p>
                                      <span className="total-score" style={{marginRight: "10px", fontFamily: "Poppins-bold"}}>
                                        {averageTotalScore(listing?.id).toFixed(1)}
                                      </span>
                                      <span style={{ fontSize: '16px' }}>
                                        {reviewWordRating(listing?.id)}
                                      </span>
                                    </p>
                                  </div>
                                  <p style={{ fontSize: '20px', marginTop: "5px" }}>({numberOfReviews(listing?.id)} Reviews)</p>
                                </div>
                                <ul className="rating-cats">
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Security</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'security') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'security').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Location</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'location') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'location').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Staff</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'staff') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'staff').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Atmosphere</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'atmosphere') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'atmosphere').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Cleanliness</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'cleanliness') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'cleanliness').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Facilities</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'facilities') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'facilities').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                  <div className="rating-cats-tab">
                                    <div className="category-label">
                                      <p>Value for Money</p>
                                    </div>
                                    <div className="rating-bar-and-score">
                                      <div className="rating-bars">
                                        <div className="gray-bar"></div>
                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'value_for_money') * 0.475}rem` }}></div>
                                      </div>
                                      <p>{catRating(listing?.id, 'value_for_money').toFixed(1)}</p>
                                    </div>
                                  </div>
  
                                </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="side-divs">
                  {numberOfReviews(listing?.id) >= 1 &&
                  <div className="side-div">
                    <div className="date-and-rating">
                      <p style={{marginTop: "25px"}}>Stayed in {extractDate(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                      <div className="star-and-rating">
                        <img src={StarSVG} style={{width: "20px", height: "20px"}}/>
                        <p>{extractRating(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                      </div>
                    </div>
  
                    <div className="pic-name-and-info">
                      <div className="review-profile-pic">
                        <img src={extractPicture(listing?.id, (numberOfReviews(listing?.id) - 1)) || defaultPic} style={{width: "2.25rem", height: "2.25rem", borderRadius: "50%"}}/>
                      </div>
                      <div className="review-name-info">
                        <p>{extractName(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                        <p>{extractDemographic(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                      </div>
                    </div>
  
                    <div className="review-feedback">
                      <p>{extractFeedback(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                    </div>
                  </div>
                  }
                  {numberOfReviews(listing?.id) >= 2 &&
                  <div className="side-div">
                  <div className="date-and-rating">
                    <p style={{marginTop: "25px"}}>Stayed in {extractDate(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                    <div className="star-and-rating">
                      <img src={StarSVG} style={{width: "20px", height: "20px"}}/>
                      <p>{extractRating(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                    </div>
                  </div>
  
                  <div className="pic-name-and-info">
                    <div className="review-profile-pic">
                      <img src={extractPicture(listing?.id, (numberOfReviews(listing?.id) - 2)) || defaultPic} style={{width: "2.25rem", height: "2.25rem", borderRadius: "50%"}}/>
                    </div>
                    <div className="review-name-info">
                      <p>{extractName(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                      <p>{extractDemographic(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                    </div>
                  </div>
  
                  <div className="review-feedback">
                    <p>{extractFeedback(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                  </div>
                </div>
                  }
                  {numberOfReviews(listing?.id) >= 3 &&
                  <div className="side-div">
                  <div className="date-and-rating">
                    <p style={{marginTop: "25px"}}>Stayed in {extractDate(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                    <div className="star-and-rating">
                      <img src={StarSVG} style={{width: "20px", height: "20px"}}/>
                      <p>{extractRating(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                    </div>
                  </div>
  
                  <div className="pic-name-and-info">
                    <div className="review-profile-pic">
                      <img src={extractPicture(listing?.id, (numberOfReviews(listing?.id) - 3)) || defaultPic} style={{width: "2.25rem", height: "2.25rem", borderRadius: "50%"}}/>
                    </div>
                    <div className="review-name-info">
                      <p>{extractName(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                      <p>{extractDemographic(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                    </div>
                  </div>
  
                  <div className="review-feedback">
                    <p>{extractFeedback(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                  </div>
                </div>
                  }
                  {numberOfReviews(listing?.id) >= 4 &&
                  <div className="view-reviews" onClick={() => setShowReviewModal(true)}>
                    <p className="read-more" >View all reviews</p>
                    <img src={MyArrowSVG} style={{ width: '14px' }}/>
                  </div>
                  }
              </div>
            </div>
        }
        </>
    )
}