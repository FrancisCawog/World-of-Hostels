import React from "react";
import userIcon from "../../../assets/pictures/icons/user-128.svg";
import houseIcon from "../../../assets/pictures/icons/house-svgrepo-com.svg";
import mapIcon from "../../../assets/pictures/icons/clipart2731071.png";

export default function SideBar({ activeTab, handleTabClick, setShowReservation }) {
    return (
        <div className="user-tabs">
            <div 
                className={`user-tabs-cont ${activeTab === 'Home' && 'active'}`} 
                onClick={() => handleTabClick('Home')}
            >
                <img src={houseIcon} alt="Home Icon" />
                <p>Home</p>
                {activeTab === 'Home' && <span className='check-mark2'>&#10004;</span>}
            </div>
            
            <div 
                className={`user-tabs-cont ${activeTab === 'Edit Details' && 'active'}`} 
                onClick={() => handleTabClick('Edit Details')}
            >
                <img src={userIcon} alt="Edit Details Icon" />
                <p>Edit Details</p>
                {activeTab === 'Edit Details' && <span className='check-mark2'>&#10004;</span>}
            </div>
            
            <div
                className={`user-tabs-cont ${activeTab === 'My Trips' && 'active'}`}
                onClick={() => {
                    handleTabClick('My Trips');
                    setShowReservation(false);
                }}
            >
                <img src={mapIcon} alt="My Trips Icon" />
                <p>My Trips</p>
                {activeTab === 'My Trips' && <span className='check-mark2'>&#10004;</span>}
            </div>
        </div>
    );
}