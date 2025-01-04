import React from "react";
import { useInView } from 'react-intersection-observer';
import "./SeeWhosGoing.css";

import hostel from "../../../assets/pictures/los-patios-card_png.jpg";
import user1 from "../../../assets/profile-pics/user1.jpeg";
import user2 from "../../../assets/profile-pics/user2.jpeg";
import user3 from "../../../assets/profile-pics/user3.jpeg";
import user4 from "../../../assets/profile-pics/user4.jpeg";
import user5 from "../../../assets/profile-pics/user5.jpeg";
import user6 from "../../../assets/profile-pics/user6.jpeg";
import user7 from "../../../assets/profile-pics/user7.jpeg";
import user8 from "../../../assets/profile-pics/user8.jpeg";
import user9 from "../../../assets/profile-pics/user9.jpeg";
import user10 from "../../../assets/profile-pics/user10.jpeg";
import user11 from "../../../assets/profile-pics/user11.jpeg";

export default function SeeWhosGoing() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <div className="see-who-going" id="see-who-going" ref={ref}>
            {inView && (
                <div className="animation">
                    <img src={hostel} alt="Hostel" />
                    <div className="user-images">
                        {[user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11].map((user, index) => (
                            <div key={index} className={`user-${index + 1}`}>
                                <img src={user} alt={`User ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="see-who-going-text">
                <h2>
                    See
                    <span className="see-who-going-orange">who's</span>
                    going.
                </h2>
                <p>Connect with other travellers staying in the same hostel or city as you.</p>
            </div>
        </div>
    );
}
