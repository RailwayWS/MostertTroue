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
                            <input
                                type="text"
                                placeholder={t.namePlaceholder[lang]}
                                required
                            />
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
                            <label className="input-label">{t.dietLabel[lang]}</label>
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
                                        placeholder={t.dietPlaceholder[lang]}
                                        rows="3"
                                    ></textarea>
                                </div>
                            )}
                        </div>

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
