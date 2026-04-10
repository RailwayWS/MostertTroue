import React from "react";
import "./Location.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";

import churchIcon from "../../assets/optimized_webp/church.webp";
import crossIcon from "../../assets/optimized_webp/cross.webp";

const Location = () => {
    const titleRef = useScrollReveal({ threshold: 0.3 });
    const card1Ref = useScrollReveal({ threshold: 0.15 });
    const card2Ref = useScrollReveal({ threshold: 0.15 });
    const { lang } = useLanguage();
    const t = translations.location;

    return (
        <div className="location-section">
            <div ref={titleRef}>
                <h2 className="location-main-title reveal reveal-fade-up delay-1">
                    {t.mainTitle[lang]}
                </h2>
                <div className="title-divider reveal reveal-fade-up delay-2">
                    <span className="diamond-icon">❖</span>
                </div>
            </div>

            {/* Ceremony Card */}
            <div className="venue-card reveal reveal-slide-left" ref={card1Ref}>
                <div className="venue-info">
                    <div className="venue-icon-wrapper">
                        <img src={churchIcon} alt="Church" />
                    </div>
                    <h3 className="venue-label">{t.ceremony[lang]}</h3>
                    <div className="venue-divider-line"></div>
                    <p className="venue-time">14:00</p>
                    <div className="venue-address">
                        <p>Gereformeerde Kerk</p>
                        <p>Marais Street, Stellenbosch Central</p>
                    </div>
                    <a
                        href="https://maps.google.com/?q=Gereformeerde+Kerk,+Marais+Street,+Stellenbosch+Central,+Stellenbosch,+7600"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-directions-btn"
                    >
                        {t.directions[lang]}
                    </a>
                </div>
                <div className="venue-map">
                    <iframe
                        title="Ceremony Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1037.6838949075682!2d18.871571075910452!3d-33.93485068132738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdb241f4b3497b%3A0xe4fb2b1c3eae4786!2sGereformeerde%20Kerk!5e1!3m2!1sen!2sza!4v1772883936530!5m2!1sen!2sza"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/* Elegant spacer between cards */}
            <div className="venue-spacer">
                <span className="diamond-icon">❖</span>
            </div>

            {/* Reception Card */}
            <div
                className="venue-card venue-card-reverse reveal reveal-slide-right"
                ref={card2Ref}
            >
                <div className="venue-info">
                    <div className="venue-icon-wrapper">
                        <img src={crossIcon} alt="Reception" />
                    </div>
                    <h3 className="venue-label">{t.reception[lang]}</h3>
                    <div className="venue-divider-line"></div>
                    <p className="venue-time">16:00</p>
                    <div className="venue-address">
                        <p>Skilpadvlei Wine Estate</p>
                        <p>M12 Polkadraai Rd</p>
                    </div>
                    <a
                        href="https://maps.google.com/?q=Skilpadvlei+Wine+Estate,+M12+Polkadraai+Rd,+Stellenbosch,+7604"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-directions-btn"
                    >
                        {t.directions[lang]}
                    </a>
                </div>
                <div className="venue-map">
                    <iframe
                        title="Reception Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4149.52849484515!2d18.76526767661473!3d-33.95960632376963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdb2ce150fe3ab%3A0xd3a9c5b158e6bad4!2sSkilpadvlei%20Wine%20Estate!5e1!3m2!1sen!2sza!4v1772884056068!5m2!1sen!2sza"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Location;
