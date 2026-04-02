import React, { useState, useEffect } from "react";
import "./Timer.css"; // Import the CSS file below

const WeddingCountdown = () => {
    // SET YOUR WEDDING DATE HERE (Use ISO format for timezone consistency)
    const weddingDate = new Date("2026-10-10T15:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = weddingDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    ),
                    minutes: Math.floor(
                        (difference % (1000 * 60 * 60)) / (1000 * 60),
                    ),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [weddingDate]);

    return (
        <div className="countdown-wrapper">
            {/* Decorative Top Divider with the Infinity Symbol */}
            <div className="divider-container">
                <div className="line"></div>
                <div className="infinity-symbol">∞</div>
                <div className="line"></div>
            </div>

            {/* The Countdown Numbers and Labels */}
            <div className="countdown-timer">
                <div className="time-block">
                    <span className="number">{timeLeft.days}</span>
                    <span className="label">days</span>
                </div>
                <div className="time-block">
                    <span className="number">{timeLeft.hours}</span>
                    <span className="label">hours</span>
                </div>
                <div className="time-block">
                    <span className="number">{timeLeft.minutes}</span>
                    <span className="label">minutes</span>
                </div>
                <div className="time-block">
                    <span className="number">{timeLeft.seconds}</span>
                    <span className="label">seconds</span>
                </div>
            </div>

            {/* Decorative Bottom Divider */}
            <div className="divider-container">
                <div className="line"></div>
                <div className="infinity-symbol">∞</div>
                <div className="line"></div>
            </div>
        </div>
    );
};

export default WeddingCountdown;
