import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/listings";
import { useParams } from "react-router-dom";
import './ListingsModal.css';
import checkIn from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.50.07 PM.png"
import checkOut from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.49.46 PM.png"

const ListingsModal = ({ tabName, onClose }) => {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector((state) => state.listings[listingId]);
    const [activeTab, setActiveTab] = useState(tabName);

    useEffect(() => {
        dispatch(fetchListing(listingId))
          .catch((error) => {
            console.error("Error fetching listing:", error);
          });
      }, [listingId, dispatch]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
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
                    <img className="checkIn" src={checkIn} style={{ width: '18px' }}/>
                    <div className="checkInText">
                        Check In
                        <div className="check_in"> {listing?.check_in}
                        </div>
                    </div>
                    </div>
                    <div className="separator"></div>
                    <div className="checkOutContainer">
                    <img className="checkOut" src={checkOut} style={{ width: '18px' }}/>
                    <div className="checkOutText">
                        Check Out
                        <div className="check_out"> until {listing?.check_out}
                        </div>
                    </div>
                    </div>
                </div>
                <div className="tab-content">
                <p> {listing.house_rules}</p> 
                </div> 
                </>
            )}
            </div>
        </div>
        </div>
    );
};

export default ListingsModal;
