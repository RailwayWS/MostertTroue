import React, { useState } from "react";
import "./RSVP.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";

const RSVP = () => {
    const sectionRef = useScrollReveal({ threshold: 0.15 });
    const { lang } = useLanguage();
    const t = translations.rsvp;
    const [hasDiet, setHasDiet] = useState(false);
    const [guests, setGuests] = useState([{ id: 1 }]); // Track multiple guests

    const handleAddGuest = (e) => {
        e.preventDefault(); // Prevent form submission
        setGuests([...guests, { id: Date.now() }]);
    };

    const handleRemoveGuest = (id) => {
        setGuests(guests.filter((guest) => guest.id !== id));
    };

    return (
        <div className="rsvp-section" id="rsvp" ref={sectionRef}>
            <div className="rsvp-container reveal reveal-fade-up">
                {/* The Frame Border Wrapper */}
                <div className="rsvp-frame">
                    <h2 className="rsvp-title">{t.title[lang]}</h2>
                    <div className="title-divider">
                        <span className="diamond-icon">❖</span>
                    </div>

                    <p className="rsvp-deadline">{t.weddingDate[lang]}</p>
                    <p className="rsvp-deadline">{t.deadline[lang]}</p>

                    <form className="rsvp-form">
                        <div className="form-group">
                            {guests.map((guest, index) => (
                                <div
                                    key={guest.id}
                                    style={{
                                        position: "relative",
                                        marginBottom:
                                            index !== guests.length - 1
                                                ? "15px"
                                                : "0",
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder={t.namePlaceholder[lang]}
                                        required
                                        style={{
                                            marginBottom: "0",
                                            paddingRight:
                                                index !== 0
                                                    ? "40px"
                                                    : undefined,
                                        }}
                                    />
                                    {index !== 0 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveGuest(guest.id)
                                            }
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                background: "none",
                                                border: "none",
                                                color: "inherit",
                                                fontSize: "1.5rem",
                                                opacity: "0.6",
                                                cursor: "pointer",
                                            }}
                                            title="Remove guest"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="form-group radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="yes"
                                    defaultChecked
                                />
                                <span>{t.yes[lang]}</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="no"
                                />
                                <span>{t.no[lang]}</span>
                            </label>
                        </div>

                        {/* Dietary Preferences */}
                        <div className="form-group diet-group">
                            <label className="input-label">
                                {t.dietLabel[lang]}
                            </label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="diet"
                                        value="yes"
                                        onChange={() => setHasDiet(true)}
                                    />
                                    <span>{t.dietYes[lang]}</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="diet"
                                        value="no"
                                        defaultChecked
                                        onChange={() => setHasDiet(false)}
                                    />
                                    <span>{t.dietNo[lang]}</span>
                                </label>
                            </div>
                            {hasDiet && (
                                <div className="diet-specify">
                                    <textarea
                                        placeholder={
                                            guests.length > 1
                                                ? t.dietPlaceholderMultiple[
                                                      lang
                                                  ]
                                                : t.dietPlaceholder[lang]
                                        }
                                        rows="3"
                                    ></textarea>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            className="rsvp-submit-btn"
                            onClick={handleAddGuest}
                            style={{ marginBottom: "15px" }}
                        >
                            {t.add[lang]}
                        </button>

                        <button type="submit" className="rsvp-submit-btn">
                            {t.submit[lang]}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RSVP;
