import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { useParams } from 'react-router-dom';
import './ListingsModal.css';
import checkInPic from '../../assets/pictures/icons/Screenshot 2023-11-17 at 1.50.07 PM.png';
import checkOutPic from '../../assets/pictures/icons/Screenshot 2023-11-17 at 1.49.46 PM.png';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import FacilityIcon from "../../components/FacilityIcon/index.js";

const ListingsModal = ({ tabName, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const checkIn = cart.checkIn;
  const checkOut = cart.checkOut;
  const start_date = new Date(checkIn).toISOString();
  const end_date = new Date(checkOut).toISOString();
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const [activeTab, setActiveTab] = useState(tabName);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const facilitiesObjectString = listing?.facilities.replace(/=>/g, ':');

  let allKeys = [];
  let facilitiesObject = {};
  
  if (facilitiesObjectString) {
    try {
      facilitiesObject = JSON.parse(facilitiesObjectString);
      allKeys = Object.keys(facilitiesObject);
    } catch (error) {
      console.error("Invalid JSON string:", error);
    }
  }

  useEffect(() => {
    if (checkIn !== null) {
      dispatch(fetchListing(listingId, start_date, end_date)).catch((error) => {
        console.error('Error fetching listing:', error);
      });
    } else {
      dispatch(fetchListing(listingId, today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0])).catch((error) => {
        console.error('Error fetching listing:', error);
      });
    }
  }, [listingId, checkIn, checkOut, dispatch]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const mapStyles = {
    height: '40rem',
    width: '100%',
  };

  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  const handleMarkerClick = () => {
    setInfoWindowVisible(!infoWindowVisible);
    setInfoWindowPosition({ lat: listing.latitude, lng: listing.longitude });
  };

  const markerImageSize = new window.google.maps.Size(40, 40);

  const customMarkerIcon = {
    url: `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${markerImageSize.width}" height="${markerImageSize.height + 12}" viewBox="0 0 ${markerImageSize.width} ${markerImageSize.height + 12}"><rect width="${markerImageSize.width}" height="${markerImageSize.height}" fill="none"/><text x="50%" y="90%" font-size="24" font-family="Arial, sans-serif" dominant-baseline="middle" text-anchor="middle" fill="%23e45b2e">▼</text><image href="${logo}" width="${markerImageSize.width}" height="${markerImageSize.height}" /></svg>`,
    scaledSize: markerImageSize,
  };

  const handleMapClick = (e) => {
    if (infoWindowVisible) {
      setInfoWindowVisible(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>

          {tabName === 'Map' ? (
            <>
            <div>
              <h2 className='modal-header'>Location</h2>
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={18}
                center={{
                  lat: listing.latitude,
                  lng: listing.longitude,
                }}
                onClick={handleMapClick}
              >
                <Marker
                  position={{
                    lat: listing.latitude,
                    lng: listing.longitude,
                  }}
                  onClick={handleMarkerClick}
                  icon={customMarkerIcon}
                />
                {infoWindowVisible && infoWindowPosition && (
                  <InfoWindow
                    position={infoWindowPosition}
                    onCloseClick={() => setInfoWindowVisible(false)}
                  >
                    <div className="listing-container">
                      <h3 className="listing-title">{listing.property_name}</h3>
                      <p className="listing-address">{listing.address}</p>
                      <p className="listing-location">{`${listing.city}, ${listing.country}`}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
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

              {activeTab === 'About' && (
                <div className="tab-content">
                  <p>{listing.description}</p>
                </div>
              )}

              {activeTab === 'Facilities' && (
                <div className="tab-content">
                  {allKeys.map((key, index) => (
                    <div key={key}>
                      <p className='facilities-key'>{key}</p>
                      <div className='facilities-modal-list'>
                        {facilitiesObject[key].map((item, i) => (
                          <div key={i} className='facilities-modal-list-item'>
                            <div className="facilities-icon2">
                              <FacilityIcon item={item} />
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                      {index < allKeys.length - 1 && (
                        <div className="horizontal-line" id="facilities-modal-line" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'HouseRules' && (
                <>
                  <h2 className='hostel-policies'>Hostel Policies</h2>
                  <div id='modal-check' className="checkInandOut">
                    <div className="checkInContainer">
                      <img className="checkIn" src={checkInPic} id='checkin-modal-img' alt="Check In" />
                      <div className="checkInText">
                        Check In
                        <div className="check_in">{listing?.check_in}</div>
                      </div>
                    </div>
                    <div className="separator"></div>
                    <div className="checkOutContainer">
                      <img className="checkOut" src={checkOutPic} id='checkin-modal-img' alt="Check Out" />
                      <div className="checkOutText">
                        Check Out
                        <div className="check_out">until {listing?.check_out}</div>
                      </div>
                    </div>
                  </div>
                  <div className="smaller-horizontal-line"></div>

                  <div className="tab-content">
                    <h2 className='tab-cancellation'>Cancellation Policy</h2>
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
                    <div className="smaller-horizontal-line"></div>
                    <h2 className='things-to-note '>Things to Note</h2>
                    <p>{listing?.house_rules}</p>
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