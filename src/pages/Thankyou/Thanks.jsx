import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Thanks.css";

const Thanks = () => {
    const { lang } = useLanguage();
    const location = useLocation();

    // Check if they RSVP'd "no", otherwise default to "yes"
    const attendance = location.state?.attendance || "yes";

    const t = {
        title: { af: "Dankie!", en: "Thank You!" },
        messageYes: {
            af: "Jou RSVP is suksesvol gestuur. Ons sien baie uit daarna om ons spesiale dag saam met jou te vier!",
            en: "Your RSVP has been successfully sent. We look forward to celebrating our special day with you!",
        },
        messageNo: {
            af: "Jou RSVP is suksesvol gestuur. Ons is jammer jy kan dit nie maak nie.",
            en: "Your RSVP has been successfully sent. We're sorry you can't make it.",
        },
        button: {
            af: "Terug na Tuisblad",
            en: "Back to Home page",
        },
    };

    return (
        <div className="thanks-page">
            <div className="thanks-container fade-in-up">
                <h1 className="thanks-title">{t.title[lang]}</h1>

                <div className="thanks-divider">
                    <span className="diamond-icon">❖</span>
                </div>

                <p className="thanks-message">
                    {attendance === "yes"
                        ? t.messageYes[lang]
                        : t.messageNo[lang]}
                </p>

                <Link to="/" className="thanks-btn">
                    {t.button[lang]}
                </Link>
            </div>
        </div>
    );
};

export default Thanks;
