import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { useParams } from 'react-router-dom';
import './ListingsModal.css';
import checkInPic from '../../assets/pictures/icons/Screenshot 2023-11-17 at 1.50.07 PM.png';
import checkOutPic from '../../assets/pictures/icons/Screenshot 2023-11-17 at 1.49.46 PM.png';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
// import { LoadScript } from '@react-google-maps/api';

const ListingsModal = ({ tabName, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const checkIn = cart.checkIn
  const checkOut = cart.checkOut
  const start_date = new Date(checkIn).toISOString();
  const end_date = new Date(checkOut).toISOString();
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const [activeTab, setActiveTab] = useState(tabName);

  useEffect(() => {
    if (start_date !== undefined && end_date !== undefined) {
    dispatch(fetchListing(listingId, start_date, end_date)).catch((error) => {
      console.error('Error fetching listing:', error);
    })};
  }, [listingId, dispatch]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const mapStyles = {
    height: '40rem',
    width: '100%',
  };

  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  
  const handleMarkerClick = () => {
    setInfoWindowVisible(!infoWindowVisible);
  };

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>

            {tabName === 'Map' ? (
                <>
                <h2 className='modal-header'>Location</h2>
                {/* <LoadScript
                  googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}> */}
                <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={18}
                center={{
                  lat: listing?.latitude,
                  lng: listing?.longitude,
                }}
              >
                <Marker position={{
                  lat: listing?.latitude,
                  lng: listing?.longitude,
                }}
                  onClick={handleMarkerClick}
                />
                {infoWindowVisible && (
                  <InfoWindow
                    position={{
                      lat: listing?.latitude,
                      lng: listing?.longitude,
                    }}
                    onCloseClick={() => setInfoWindowVisible(false)}
                  >
                  </InfoWindow>
                )}
              </GoogleMap>
              {/* </LoadScript> */}
              </>
                ) : (
            <>
            <h2 className='modal-header'>Property details</h2>
            <div className="horizontal-line"></div>
            <div className="tabs-container">
                
                <div className="modal-tabs">
                    <div
                        className={`tab ${activeTab === 'About' ? 'active' : ''}`}
                        onClick={() => handleTabClick('About')}
                    >
                        About
                    </div>
                    <div
                        className={`tab ${activeTab === 'Facilities' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Facilities')}
                    >
                        Facilities
                    </div>
                    <div
                        className={`tab ${activeTab === 'HouseRules' ? 'active' : ''}`}
                        onClick={() => handleTabClick('HouseRules')}
                    >
                        House Rules
                    
                    </div>
                </div>
            </div>
            <div className="tab-underline"></div>

            {activeTab === 'About' && (  <div className="tab-content">
                <p> {listing.description}</p> 
                </div> 
            )}

            {activeTab === 'HouseRules' && ( 
                <>
                <h2 style={{fontFamily: "Poppins-bold", fontSize: "20px", marginLeft: "2%", marginTop: "-.5%"}}>Hostel Policies</h2>
                    <div id='modal-check' className="checkInandOut">
                        <div className="checkInContainer">
                        <img className="checkIn" src={checkInPic} style={{ width: '18px' }}/>
                        <div className="checkInText">
                            Check In
                            <div className="check_in"> {listing?.check_in}
                            </div>
                        </div>
                        </div>
                        <div className="separator"></div>
                        <div className="checkOutContainer">
                            <img className="checkOut" src={checkOutPic} style={{ width: '18px' }}/>
                            <div className="checkOutText">
                                Check Out
                                <div className="check_out"> until {listing?.check_out}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="smaller-horizontal-line"> </div>

                <div className="tab-content">
                <h2 style={{fontFamily: "Poppins-bold", fontSize: "20px", marginTop: "15px"}}>Cancellation Policy</h2>
                <div className='cancellation-policy'>
                    <div className='free-cancellation-rates'>
                        <h2>Free Cancellation rates</h2>
                        <p>If you cancel your booking before 23:59 7 days before your check-in date your deposit will be refunded to your payment card. If you cancel after 23:59 7 days or in the event of a no-show, your deposit will not be refunded and the total of the first night's accommodation will be charged to your payment card, unless otherwise stated (see 'Things to Note' information). Please note that cancellations must be made directly within your booking in My Account.</p>
                    </div>
                    <div className='non-refundable-rates'>
                        <h2>Non-refundable rates</h2>
                        <p>Your booking is non-refundable. If you choose to cancel your booking, or in the case of a no-show, you will still be charged the full cost of your booking</p>
                    </div>
                </div>
                <div className="smaller-horizontal-line" style={{marginLeft: "1px", marginRight: "1px", marginBottom: "-15px"}}> </div>
                <h2 style={{fontFamily: "Poppins-bold", fontSize: "20px", marginTop: "15px", marginBottom: "-25px"}}>Things to Note</h2>
                <p> {listing.house_rules}</p> 
                </div> 
                </>
                
                )}
                </>
            )}
            </div>
        </div>
        </div>
    );
};

export default ListingsModal;
