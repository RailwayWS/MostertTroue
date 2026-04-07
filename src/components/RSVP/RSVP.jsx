import React, { useState } from "react";
import "./RSVP.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import translations from "../../context/translations";

import { ref, push } from "firebase/database";
import { db } from "../../firebase";

// 1. Import EmailJS
import emailjs from "@emailjs/browser";

const RSVP = () => {
    const sectionRef = useScrollReveal({ threshold: 0.15 });
    const { lang } = useLanguage();
    const navigate = useNavigate();

    const t = translations.rsvp;

    const [guests, setGuests] = useState([{ id: Date.now(), name: "" }]);

    // 2. Add email state
    const [email, setEmail] = useState("");

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

        // Prevent double clicks by exiting if already submitting
        if (isSubmitting) return;

        setIsSubmitting(true);

        // Format names nicely for the email ("Janes & Liezaan")
        const formattedNames = guests.map((guest) => guest.name).join(" & ");

        try {
            // Create the payload to send to Firebase
            const rsvpData = {
                guests: guests.map((guest) => guest.name),
                email: email, // Save email to database too
                attendance: attendance,
                hasDiet: hasDiet,
                dietDetails: hasDiet ? dietDetails : "",
                timestamp: new Date().toISOString(),
            };

            // Push to the 'rsvps' node in your Firebase Realtime Database
            const rsvpsRef = ref(db, "rsvps");
            await push(rsvpsRef, rsvpData);

            // --- EMAILJS SEND ---
            // Only send the confirmation email if an email address was provided
            if (email.trim() !== "") {
                await emailjs.send(
                    "service_k77ka5e",
                    "template_z7fljon",
                    {
                        guest_names: formattedNames,
                        guest_email: email,
                        attendance:
                            attendance === "yes"
                                ? "Gaan bywoon / Attending"
                                : "Kan nie bywoon nie / Not Attending",
                        diet_details: hasDiet ? dietDetails : "Geen / None",
                    },
                    "LhQTmAv1vozAXL-3Y",
                );
            }

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
                        {/* 1. NAME AND SURNAME */}
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
                                        }
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

                        {/* 2. EMAIL INPUT FIELD */}
                        <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                        >
                            <p
                                style={{
                                    fontSize: "0.85rem",
                                    color: "inherit",
                                    opacity: 0.8,
                                    marginBottom: "8px",
                                    textAlign: "left",
                                    lineHeight: "1.4",
                                }}
                            >
                                {lang === "af"
                                    ? "As jy 'n bevestiging van jou RSVP wil ontvang, vul asseblief jou e-posadres in (opsioneel)."
                                    : "If you would like to receive a confirmation of your RSVP, please enter your email address (optional)."}
                            </p>
                            <input
                                type="email"
                                placeholder={
                                    lang === "af"
                                        ? "E-posadres (opsioneel)"
                                        : "Email Address (optional)"
                                }
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: "100%", marginBottom: "0" }}
                            />
                        </div>

                        {/* 3. ATTENDANCE */}
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
                                    }
                                />
                                <span>{t.no[lang]}</span>
                            </label>
                        </div>

                        {/* 4. DIET PREFERENCES */}
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

                        {/* 5. BUTTONS */}
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
