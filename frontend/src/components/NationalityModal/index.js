import React from 'react';
import "./NationalityModal.css"
const restCountriesData = await fetch("https://restcountries.com/v3.1/all?fields=name,independent").then(res => res.json());

const NationalityModal = ({ onClose, onInputChange }) => {
    const handleCountryClick = (countryName) => {
        onInputChange(countryName);
        onClose();
    };

    const filteredCountries = restCountriesData
        .filter(country => country.independent === true || ["Palestine", "Zambia", "Kosovo", "Taiwan"].includes(country.name.common))
        .sort((a, b) => a.name.common.localeCompare(b.name.common));

    return (
        <div className="modal-overlay4">
            <div className="modal4">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1 className='booking-details-h1'>Select your nationality</h1>
                    <div className='details-modal'>
                        <ul className='countries-ul'>
                            {filteredCountries.map((country) => (
                                <li key={country.name.common} onClick={() => handleCountryClick(country.name.common)} className='countries-li'>
                                    <button className='countries-button'>
                                        <div className='countries-div'>
                                            <p>{country.name.common}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NationalityModal;