import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchListings } from "../../store/listings";
import "./ListingsIndex.css";
import Footer from "../Footer";
import WifiSVG from "../../assets/pictures/icons/wifi.svg"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import WhiteWifiSVG from "../../assets/pictures/icons/wifi-white.svg"
import CoffeeSVG from "../../assets/pictures/icons/coffee.svg"
import WhiteCoffeeSVG from "../../assets/pictures/icons/white-coffee.svg"
import { useHistory } from 'react-router-dom';

function ListingsIndexPage() {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const reviews = useSelector((state) => state.reviews);
  const rooms = useSelector((state) => Object.values(state.rooms));
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  sessionStorage.setItem('redirectUrl', window.location.pathname);

  useEffect(() => {
    dispatch(fetchListings()).catch((error) => {
      console.error("Error fetching listing:", error);
    });
  }, [dispatch]);

  const handleRedirect = (listingId) => {
    const queryString = new URLSearchParams(cart).toString();
    history.push(`/listings/${listingId}?${queryString}`);
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
    return listingReviews.length
  }

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
    } else if (average >= 6.0 ) {
      return "Good"
    } else {
      return ""
    }
  }

  return (
    <>
    <div>
        <div
          style={{
            borderBottom: "1px solid #dddfe4",
            boxShadow: "0 4px 32px rgba(0,0,0,.1)",
          }}
        >
          <Navigation />
        </div>
        <div className="listings-location">
          <h2>Bangkok, Thailand</h2>
          <p>Showing {Object.values(listings).length} properties</p>
        </div>
        <div className="horizontal-line" style={{ marginBottom: "20px" }}></div>
    </div>

    <div>
    {Object.values(listings).map((listing) => (
    <a key={listing.id} href={`listings/${listing.id}`} onClick={(e) => {e.preventDefault(); handleRedirect(listing.id)}} className="show-listing" style={{ position: 'relative', marginBottom: '20px', textDecoration: 'none', color: "black" }}>
      <div className="index-picture"></div>

      <div className="single-listing">
        <h3>{listing.property_name}</h3>

        {numberOfReviews(listing.id) !== 0 &&
        <div className="listing-review">
          
          <div className="listing-review-star-and-rating">
            <img src={StarSVG}/>
            <p>
              <span style={{marginRight: "10px"}}>
                {averageTotalScore(listing.id).toFixed(1)}
              </span>
              <span style={{ fontSize: '14px' }}>
                {reviewWordRating(listing.id)} ({numberOfReviews(listing.id)})
              </span>
            </p>
          </div>

        </div>
        }
        
        <p className="single-listing-p">{listing.property_type.charAt(0).toUpperCase() + listing.property_type.slice(1)}</p>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: "-3%" }}>
                {listing['has_wifi?'] && (
                <>
                    <div className="listing-wifi" style={{ display: 'inline-block', borderRadius: '50%', padding: '5px', marginRight: '5px' }}  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <img src={WifiSVG} alt="WiFi Icon" className="wifi-icon" style={{ marginLeft: '1px', marginTop: '2px' }} />
                    {isHovered && (
                    <div className="hover-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={WhiteWifiSVG} alt="WiFi Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle'}} />
                        <p style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0', color: "white" }}>Free Wifi</p>
                    </div>
                    )}
                    </div>
                </>
                )}

                {listing['has_breakfast?'] && (
                <>
                    <div className="listing-coffee" style={{ display: 'inline-block', borderRadius: '50%', padding: '5px', marginRight: '5px' }} onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)}>
                    <img src={CoffeeSVG} alt="Coffee Icon" className="coffee-icon"style={{ marginLeft: '2px', marginTop: '2px' }}/>
                    {isHovered2 && (
                    <div className="hover-box2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={WhiteCoffeeSVG} alt="Coffee Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle'}} />
                        <p style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0', color: "white" }}>Free Breakfast</p>
                    </div>
                    )}
                    </div>
                </>
                )}
            </div>

            <div className="private-and-dorm" style={{ position: 'absolute', bottom: '5px', right: '5px', padding: '5px', borderRadius: '5px', fontFamily: "Poppins", display: "flex", alignItems: "center" }}>
            {(() => {
                const prices = Object.values(rooms).filter(room => room.listing_id === listing.id).reduce((acc, room) => {
                if (room.room_type === 'shared' && (!acc.sharedPrice || room.price < acc.sharedPrice)) {
                    acc.sharedPrice = room.price;
                } else if (room.room_type === 'private' && (!acc.privatePrice || room.price < acc.privatePrice)) {
                    acc.privatePrice = room.price;
                }
                return acc;
                }, { sharedPrice: null, privatePrice: null });

                const formatPrice = price => `$${(price * 0.95).toFixed(2)}`;

                return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {prices.privatePrice ? (
                    <div style={{ marginRight: '10px', textAlign: 'right', marginTop: "5%" }}>
                        <p style={{ margin: 0 }}>Privates From</p>
                        <p style={{ margin: 0, fontFamily: "Poppins-bold" }}>{formatPrice(prices.privatePrice)}</p>
                    </div>
                    ) : (
                        <p style={{ margin: 0, color: 'gray', alignSelf: 'flex-end' }}>No privates available</p>
                    )}
                    <div style={{ height: '50px', borderLeft: '1px solid gray', margin: '0 10px' }}></div>
                    {prices.sharedPrice ? (
                    <div style={{textAlign: 'right', marginTop: "5%" }}>
                        <p style={{ margin: 0 }}>Dorms From</p>
                        <p style={{ margin: 0, fontFamily: "Poppins-bold" }}>{formatPrice(prices.sharedPrice)}</p>
                    </div>
                    ) : (
                        <p style={{ margin: 0, color: 'gray', alignSelf: 'flex-end' }}>No dorms available</p>
                    )}
                </div>
                );
            })()}
            </div>
        </div>
        </a>
        ))}
    </div>



    <br/>
    <br/>
    <br/>
    <Footer />
    </>
  );
}

export default ListingsIndexPage;
