import { React, useState, useEffect } from "react";
const restCountriesData = await fetch("https://restcountries.com/v3.1/all?fields=name,independent,cca3").then(res => res.json());

export function UserHome({ sessionUser }) {
    const [age, setAge] = useState(0);
    const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg"

    const findCountryCCA3 = (commonName) => {
        const matchingCountry = restCountriesData.find(country => country.name.common === commonName);
        return matchingCountry ? matchingCountry.cca3 : commonName;
    };

    useEffect(() => {
        if (sessionUser.date_of_birth !== null) {
        const dob = new Date(sessionUser.date_of_birth);
        const now = new Date();
    
        let ages = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
            ages--;
        }
    
        setAge(ages);
        }
    }, [sessionUser.date_of_birth]);

    return (
        <div className="user-about">
            <div className="picture-circle">
                <img src={sessionUser?.photoUrl || defaultPic} alt="User" style={{borderRadius: "50%", width: "5rem", height: "5rem"}}/>
            </div>
            <div className="name-and-age">
                <p>{sessionUser.first_name}</p>
                {sessionUser.date_of_birth !== null && sessionUser.nationality !== "" && sessionUser.nationality !== null && (
                    <p style={{ fontSize: "26px" }}>{age} years old, {findCountryCCA3(sessionUser.nationality)}</p>
                    )}
                {sessionUser.date_of_birth !== null && (sessionUser.nationality === "" || sessionUser.nationality === null) && (
                    <p style={{ fontSize: "26px" }}>{age} years old</p>
                    )}
                {sessionUser.date_of_birth === null && sessionUser.nationality !== "" && (
                    <p style={{ fontSize: "26px" }}>{findCountryCCA3(sessionUser.nationality)}</p>
                    )}
            </div>
        </div>
    )
}

export function HomeStats({ reservations, sessionUser, listings }) {
    const [countryCount, setcountryCount] = useState(0);
    const [propertyCount, setpropertyCount] = useState(0);
    let propertyWord;
    let countryWord;

    useEffect(() => {
        const uniqueListingIds = Object.values(reservations).reduce((acc, reservation) => {
            if (reservation && reservation.listing_id && reservation.user_id === sessionUser.id) {
                acc.add(reservation.listing_id);
            }
            return acc;
        }, new Set());

        const numberOfProperties = uniqueListingIds.size;
        setpropertyCount(numberOfProperties);
    }, [reservations]);

    useEffect(() => {
        const uniqueListingIds = Object.values(reservations).reduce((acc, reservation) => {
            if (reservation && reservation.listing_id && reservation.user_id === sessionUser.id) {
                acc.add(reservation.listing_id);
            }
            return acc;
        }, new Set());

        const uniqueCountries = new Set();

        Object.values(listings).forEach(listing => {
            if (uniqueListingIds.has(listing.id) && listing.country) {
                uniqueCountries.add(listing.country);
            }
        });

        const numberOfCountries = uniqueCountries.size;

        setcountryCount(numberOfCountries);
    }, [reservations, listings, sessionUser]);

    if (propertyCount === 1) {
        propertyWord = "property";
    } else {
        propertyWord = "properties";
    }

    if (countryCount === 1) {
        countryWord = "country";
    } else {
        countryWord = "countries";
    }

    return (
        <div className="travel-stats">
            <div >
                <p>My Travel Stats</p>
                <p>I've explored <span style={{ fontFamily:"Inter-bold"}} >{countryCount} {countryWord}</span></p>
                <p>and stayed in <span style={{ fontFamily:"Inter-bold"}} >{propertyCount} {propertyWord}</span></p>
            </div>
        </div>
    )
} 