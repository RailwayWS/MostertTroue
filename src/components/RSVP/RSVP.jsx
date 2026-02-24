import React from "react";
import "./RSVP.css";

const RSVP = () => {
    return (
        <div className="rsvp-section">
            <div className="rsvp-container">
                {/* The Frame Border Wrapper */}
                <div className="rsvp-frame">
                    <h2 className="rsvp-title">RSVP</h2>
                    <div className="title-divider">
                        <span className="diamond-icon">❖</span>
                    </div>

                    <form className="rsvp-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Naam en Van"
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
                                <span>Ja, ek kom</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="no"
                                />
                                <span>Nee, ek kom nie</span>
                            </label>
                        </div>

                        <button type="submit" className="rsvp-submit-btn">
                            Stuur
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RSVP;
