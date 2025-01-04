import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./WorldsBest.css"

export default function WorldsBest({listings}) {
    return (
    <div className="world-best">
      <div className="world-cards">
        <div className="world-best-flex">
        <Link to={`/listings/${listings[1]?.id}`} className="world-cards1">
            <div className="world-photo">
              <img  src={listings[1]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[1]?.property_name}</p>
            <p className="world-car-p2">{listings[1]?.city}, {listings[1]?.country}</p>
        </Link>
        <Link to={`/listings/${listings[2]?.id}`} className="world-cards2">
            <div className="world-photo">
              <img  src={listings[2]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[2]?.property_name}</p>
            <p className="world-car-p2">{listings[2]?.city}, {listings[2]?.country}</p>
        </Link>
        </div>

        <div className="world-best-flex">
          <div className="world-text" id="world-text-middle">
            <h3>
              The world's best hostels, with over
              <span className="thirteen-million">13 million reviews</span>
              .
            </h3>
            <p>With over 16,500 hostels in 180 countries, there’s always room for a new adventure!</p>
          </div>
          <Link to={`/listings/${listings[6]?.id}`} className="world-cards3">
            <div className="world-photo">
              <img  src={listings[6]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[6]?.property_name}</p>
            <p className="world-car-p2">{listings[6]?.city}, {listings[6]?.country}</p>
        </Link>
        </div>

        <div className="world-best-flex">
        <Link to={`/listings/${listings[4]?.id}`} className="world-cards4">
            <div className="world-photo">
              <img  src={listings[4]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[4]?.property_name}</p>
            <p className="world-car-p2">{listings[4]?.city}, {listings[4]?.country}</p>
        </Link>
        <Link to={`/listings/${listings[5]?.id}`} className="world-cards5">
            <div className="world-photo">
              <img  src={listings[5]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[5]?.property_name}</p>
            <p className="world-car-p2">{listings[5]?.city}, {listings[5]?.country}</p>
        </Link>
        </div>
      </div>
    </div>
    )
}