import React from 'react';
import "./NationalityModal.css"
const restCountriesData = await fetch('https://restcountries.com/v3.1/all?fields=name').then(res => res.json());

const NationalityModal = ({ onClose}) => {


    return (
        <div className="modal-overlay4">
            <div className="modal4">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1 className='booking-details-h1'>Select your nationality</h1>

                    <div className='details-modal'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NationalityModal;