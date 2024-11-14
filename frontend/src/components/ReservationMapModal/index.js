import { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";

const ReservationMapModal = ({ latitude, longitude, onClose, name, address, city, country }) => {
  const mapStyles = {
    height: '40rem',
    width: '100%',
  };

  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  const handleMarkerClick = () => {
    setInfoWindowVisible(!infoWindowVisible);
    setInfoWindowPosition({ lat: latitude, lng: longitude });
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

          <div>
            <h2 className='modal-header'>Location</h2>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={18}
              center={{
                lat: latitude,
                lng: longitude,
              }}
              onClick={handleMapClick}
            >
              <Marker
                position={{
                  lat: latitude,
                  lng: longitude,
                }}
                onClick={handleMarkerClick}
                icon={customMarkerIcon}
              />
              {infoWindowVisible && infoWindowPosition && (
                <InfoWindow
                  position={infoWindowPosition}
                  onCloseClick={() => setInfoWindowVisible(false)}
                >
                  <div>
                    <h3 style={{ fontFamily: "Inter", fontSize: "20px" }}>{name}</h3>
                    <p style={{ fontFamily: "Inter", padding: "0px" }}>{address}</p>
                    <p style={{ fontFamily: "Inter", marginTop: "-10px" }}>{`${city}, ${country}`}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMapModal;