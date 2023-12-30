import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';


const ReservationMapModal = ({ latitude, longitude, onClose }) => {
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);

  const mapStyles = {
    height: '40rem',
    width: '100%',
  };

  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  
  const handleMarkerClick = () => {
    setInfoWindowVisible(!infoWindowVisible);
  };

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>

                <>
                <h2 className='modal-header'>Location</h2>
                <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={18}
                center={{
                  lat: latitude,
                  lng: longitude,
                }}
              >
                <Marker position={{
                  lat: latitude,
                  lng: longitude,
                }}
                  onClick={handleMarkerClick}
                />
                {infoWindowVisible && (
                  <InfoWindow
                    position={{
                      lat: listing?.latitude,
                      lng: listing?.longitude,
                    }}
                    onCloseClick={() => setInfoWindowVisible(false)}
                  >
                  </InfoWindow>
                )}
              </GoogleMap>
              </>
            </div>
        </div>
        </div>
    );
};

export default ReservationMapModal;