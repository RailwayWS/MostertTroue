import React, { useState } from "react";
import "./RSVP.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import translations from "../../context/translations";

import { ref, push } from "firebase/database";
import { db } from "../../firebase";

const RSVP = () => {
    const sectionRef = useScrollReveal({ threshold: 0.15 });
    const { lang } = useLanguage();
    const navigate = useNavigate(); // 2. Initialize navigate

    const t = translations.rsvp;

    const [guests, setGuests] = useState([{ id: Date.now(), name: "" }]);
    const [attendance, setAttendance] = useState("yes");
    const [hasDiet, setHasDiet] = useState(false);
    const [dietDetails, setDietDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddGuest = (e) => {
        e.preventDefault(); // Prevent form submission
        setGuests([...guests, { id: Date.now(), name: "" }]);
    };

    const handleRemoveGuest = (id) => {
        setGuests(guests.filter((guest) => guest.id !== id));
    };

    const handleNameChange = (id, newName) => {
        setGuests(
            guests.map((guest) =>
                guest.id === id ? { ...guest, name: newName } : guest,
            ),
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create the payload to send to Firebase
            const rsvpData = {
                guests: guests.map((guest) => guest.name),
                attendance: attendance,
                hasDiet: hasDiet,
                dietDetails: hasDiet ? dietDetails : "",
                timestamp: new Date().toISOString(),
            };

            // Push to the 'rsvps' node in your Firebase Realtime Database
            const rsvpsRef = ref(db, "rsvps");
            await push(rsvpsRef, rsvpData);

            // Pass the attendance state to the Thanks page
            navigate("/thanks", { state: { attendance } });
        } catch (error) {
            console.error("Error submitting form", error);
            // Optional: fallback alert if the database fails
            alert(
                lang === "af"
                    ? "Daar was 'n fout, probeer asseblief weer."
                    : "There was an error, please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rsvp-section" id="rsvp" ref={sectionRef}>
            <div className="rsvp-container reveal reveal-fade-up">
                <div className="rsvp-frame">
                    <h2 className="rsvp-title">{t.title[lang]}</h2>
                    <div className="title-divider">
                        <span className="diamond-icon">❖</span>
                    </div>

                    <p className="rsvp-deadline">{t.weddingDate[lang]}</p>
                    <p className="rsvp-deadline">{t.deadline[lang]}</p>

                    <form className="rsvp-form" onSubmit={handleSubmit}>
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
                                        value={guest.name}
                                        onChange={(e) =>
                                            handleNameChange(
                                                guest.id,
                                                e.target.value,
                                            )
                                        } // UPDATED
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
                                    checked={attendance === "yes"}
                                    onChange={(e) =>
                                        setAttendance(e.target.value)
                                    }
                                />
                                <span>{t.yes[lang]}</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="no"
                                    checked={attendance === "no"}
                                    onChange={(e) =>
                                        setAttendance(e.target.value)
                                    } // UPDATED
                                />
                                <span>{t.no[lang]}</span>
                            </label>
                        </div>

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
                                        checked={hasDiet === true}
                                        onChange={() => setHasDiet(true)}
                                    />
                                    <span>{t.dietYes[lang]}</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="diet"
                                        value="no"
                                        checked={hasDiet === false}
                                        onChange={() => {
                                            setHasDiet(false);
                                            setDietDetails(""); // Clear text if they switch back to "No"
                                        }}
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
                                        value={dietDetails}
                                        onChange={(e) =>
                                            setDietDetails(e.target.value)
                                        }
                                        required //Ensure they type something if they clicked "yes"
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

                        <button
                            type="submit"
                            className="rsvp-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? lang === "af"
                                    ? "Stuur..."
                                    : "Sending..."
                                : t.submit[lang]}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RSVP;
