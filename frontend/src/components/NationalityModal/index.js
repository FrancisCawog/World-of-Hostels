// Memoized 

import React, { useEffect, useState } from 'react';
import "./NationalityModal.css";

const NationalityModal = ({ onClose, onInputChange }) => {
    const [restCountriesData, setRestCountriesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,independent");
                const data = await response.json();
                setRestCountriesData(data);
            } catch (error) {
                console.error('Error fetching countries data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCountryClick = (countryName) => {
        onInputChange(countryName);
        onClose();
    };

    const filteredCountries = restCountriesData
        .filter(country => country.independent === true || ["Palestine", "Zambia", "Kosovo", "Taiwan"].includes(country.name.common))
        .sort((a, b) => a.name.common.localeCompare(b.name.common));

    return (
        <div className="modal-overlay4" onClick={onClose}>
            <div className="modal4" onClick={(e) => e.stopPropagation()}>
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
    );
};

export default NationalityModal;