import React from 'react';
import { useState, useEffect } from 'react';
import "./bookingdetailsmodal.css"
import users from "../../assets/pictures/icons/17115.png"

const BookingDetailsModal = ({ onClose }) => {

    return (
        <div className="modal-overlay3">
            <div className="modal3">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1 className='booking-details-h1'>Booking Details</h1>

                    <div className='details-modal'>
                        <div className='details-content'>
                            <div className='details-inner'>
                                <div className='details-reference-data'>
                                    <div className='details-reference'>
                                        <p>Booking Reference</p>
                                        <p>12345</p>
                                    </div>
                                    <div className='details-left'/>
                                    <div  className='dotted-line'/>
                                    <div className='details-right'/>
                                    <div className='details-date'>
                                        <div className='stay-period'>
                                            <p>Dates</p>
                                            <p> 11 June - 14 June 2022</p>
                                        </div>
                                        <div className='details-guests'>
                                            <div className='details-icon-cont'>
                                                <img src={users}/>
                                            </div>
                                            <div className='details-guests-num'>
                                                <p>Guests</p>
                                                <p>2</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <hr className='seperator-details'/>
                            <div className='details-collapsables'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingDetailsModal;
