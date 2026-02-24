import React from "react";
import "./Location.css";

import churchIcon from "../../assets/church.png";
import crossIcon from "../../assets/placeholder.png";

const Location = () => {
    return (
        <div className="location-section">
            <h2 className="location-main-title">Waar?</h2>
            <div className="title-divider">
                <span className="diamond-icon">❖</span>
            </div>

            <div className="location-container">
                {/* The Google Map Embed */}
                <div className="map-wrapper">
                    <iframe
                        title="Wedding Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.208369527638!2d-118.06129668479363!3d33.77004658068367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd2f3900000001%3A0x6d76378858763073!2sBirchwood%20Church!5e0!3m2!1sen!2sus!4v1675123456789!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* The Floating Info Card */}
                <div className="info-card">
                    {/* Ceremony Section */}
                    <div className="event-block">
                        <div className="icon-wrapper">
                            <img src={churchIcon} alt="Church" />
                        </div>
                        <h3 className="event-title">Ceremony</h3>
                        <p className="event-time">03:00pm</p>
                        <div className="event-details">
                            <strong>Birchwood Church</strong>
                            <p>4181 Birchwood Ave Seal Beach, CA</p>
                            <p className="coords">33.776825, -118.059113</p>
                        </div>
                    </div>

                    <div className="card-divider">❖</div>

                    {/* Reception Section */}
                    <div className="event-block">
                        <div className="icon-wrapper">
                            <img src={crossIcon} alt="Reception" />
                        </div>
                        <h3 className="event-title">Reception</h3>
                        <p className="event-time">05:30pm</p>
                        <div className="event-details">
                            <strong>Old Ranch Country Club</strong>
                            <p>29033 West Lake, Agoura Hills, CA</p>
                            <p className="coords">33.776025, -118.065314</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
