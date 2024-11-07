import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/users";
import ListingsShowReviewModal from "../../ListingsShowReviewModal";
import StarSVG from "../../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import { compose } from "redux";

const restCountriesData = await fetch("https://restcountries.com/v3.1/all?fields=name,independent,cca3").then(res => res.json());

export default function ListingReviewSection({ numberOfReviews, listing, reviews, MyArrowSVG, tabName }) {
    const dispatch = useDispatch();
    const reservations = useSelector((state) => state?.reservations);
    const users = useSelector((state) => state?.users);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg";

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

    const conditionalHeight = () => {
        const numReviews = numberOfReviews(listing?.id);
        return { height: (numReviews - numbers.length + 3) <= 2 ? "520px" : "900px" };
    };

    const averageTotalScore = (listingId) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        if (!listingReviews.length) return 0.0;
        const totalScoreSum = listingReviews.reduce((acc, review) => acc + review.total_score, 0);
        return totalScoreSum / listingReviews.length;
    };

    const reviewWordRating = (listingId) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const totalScoreSum = listingReviews.reduce((acc, review) => acc + review.total_score, 0);
        const average = totalScoreSum / listingReviews.length;
        if (average >= 9) return "Superb";
        if (average >= 8) return "Fabulous";
        if (average >= 7) return "Very Good";
        if (average >= 6) return "Good";
        return "";
    };

    const catRating = (listingId, category) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const totalCategorySum = listingReviews.reduce((acc, review) => acc + review[category], 0);
        return totalCategorySum / listingReviews.length;
    };

    const getReviewDetails = (listingId, num) => {
        const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
        const review = listingReviews[num];
        if (!review) return {};

        const user = Object.values(users).find(user => user.id === review.user_id);
        const reservation = Object.values(reservations).find(reservation => reservation?.id === review.reservation_id);

        return { review, user, reservation };
    };

    const extractDate = (listingId, num) => {
        const { reservation } = getReviewDetails(listingId, num);
        if (!reservation) return '';
        const date = new Date(reservation.start_date);
        const options = { year: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const extractRating = (listingId, num) => {
        const { review } = getReviewDetails(listingId, num);
        return review?.total_score;
    };

    const extractPicture = (listingId, num) => {
        const { user } = getReviewDetails(listingId, num);
        return user?.photoUrl || defaultPic;
    };

    const extractName = (listingId, num) => {
        const { user } = getReviewDetails(listingId, num);
        if (!user) return '';
        return `${user.first_name} ${user.last_name.charAt(0)}.`;
    };

    const extractDemographic = (listingId, num) => {
        const { review, user } = getReviewDetails(listingId, num);
        if (!user || !review) return '';

        const nationality = user.nationality;
        const matchingCountry = restCountriesData.find(country => country.name.common === nationality);
        const ageGroup = review.age_group;
        const gender = review.about_you.charAt(0).toUpperCase() + review.about_you.slice(1);

        return `${gender}, ${ageGroup}, ${matchingCountry ? matchingCountry.cca3 : nationality}`;
    };

    const extractFeedback = (listingId, num) => {
        const { review } = getReviewDetails(listingId, num);
        return review?.feedback;
    };

    const closeReviewModal = () => setShowReviewModal(false);

    let numbers = [1, 2, 3];
    const missingCount = numbers.filter(num => extractFeedback(listing?.id, numberOfReviews(listing?.id) - num) === "").length;

    for (let i = 0; i < missingCount; i++) {
      numbers.push(4 + i);
    }

    console.log(numbers.length)
    console.log(numbers)

    return (
        <>
        {showReviewModal && <ListingsShowReviewModal tabName={tabName} onClose={closeReviewModal} reviews={reviews} />}

        {numberOfReviews(listing?.id) !== 0 &&
            <div id="show-reviews" className="show-reviews">
                <div className="purple-container">
                    <div className="angled-box" style={conditionalHeight()}>
                        <div className="skewed-wrapper">
                            <div>
                                <span id="reviews">{numberOfReviews(listing?.id) > 1 ? "Reviews" : "Review"}</span>
                                <div id="review-box">
                                    <div className="review-rating-box">
                                        <div className="listing-review-star-and-rating" style={{ marginTop: "10px" }}>
                                            <img style={{ width: "24px", height: "24px" }} src={StarSVG} />
                                            <p>
                                                <span className="total-score" style={{ marginRight: "10px", fontFamily: "Poppins-bold" }}>
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
                                        {['Security', 'Location', 'Staff', 'Atmosphere', 'Cleanliness', 'Facilities', 'Value for Money'].map((category, index) => (
                                            <div key={index} className="rating-cats-tab">
                                                <div className="category-label">
                                                    <p>{category}</p>
                                                </div>
                                                <div className="rating-bar-and-score">
                                                    <div className="rating-bars">
                                                        <div className="gray-bar"/>
                                                        <div className="yellow-bar" style={{ width: `${catRating(listing?.id, category.toLowerCase().replace(/\s/g, '_')) * 0.475}rem` }}/>
                                                    </div>
                                                    <p>{catRating(listing?.id, category.toLowerCase().replace(/\s/g, '_')).toFixed(1)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
                <div className="side-divs">
                    {numbers.map(num => numberOfReviews(listing?.id) >= num && extractFeedback(listing?.id, numberOfReviews(listing?.id) - num) !== "" && (
                        <div key={num} className="side-div">
                        <div className="date-and-rating">
                            <p style={{ marginTop: "25px" }}>Stayed in {extractDate(listing?.id, numberOfReviews(listing?.id) - num)}</p>
                            <div className="star-and-rating">
                            <img src={StarSVG} style={{ width: "20px", height: "20px" }} />
                            <p>{extractRating(listing?.id, numberOfReviews(listing?.id) - num)}</p>
                            </div>
                        </div>
                        <div className="pic-name-and-info">
                            <div className="review-profile-pic">
                            <img src={extractPicture(listing?.id, numberOfReviews(listing?.id) - num) || defaultPic} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%" }} />
                            </div>
                            <div className="review-name-info">
                            <p>{extractName(listing?.id, numberOfReviews(listing?.id) - num)}</p>
                            <p>{extractDemographic(listing?.id, numberOfReviews(listing?.id) - num)}</p>
                            </div>
                        </div>
                        <div className="review-feedback">
                            <p>{extractFeedback(listing?.id, numberOfReviews(listing?.id) - num)}</p>
                        </div>
                        </div>
                    ))}
                    {numberOfReviews(listing?.id) - numbers.length + 3 >= 4 && (
                        <div className="view-reviews" onClick={() => setShowReviewModal(true)}>
                        <p className="read-more">View all reviews</p>
                        <img src={MyArrowSVG} style={{ width: '14px' }} />
                        </div>
                    )}
                </div>
            </div>
        }
        </>
    )
}