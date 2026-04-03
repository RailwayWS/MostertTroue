import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext"; // Import language context
import "./Timer.css";

const WeddingCountdown = () => {
    const { lang } = useLanguage(); // Get current language
    const weddingDate = new Date("2027-01-05T15:00:00").getTime();

    // Translation dictionary for timer labels
    const t = {
        days: { af: "dae", en: "days" },
        hours: { af: "ure", en: "hours" },
        minutes: { af: "minute", en: "minutes" },
        seconds: { af: "sekondes", en: "seconds" },
    };

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
            {/* The Countdown Numbers and Labels */}
            <div className="countdown-timer">
                <div className="time-block">
                    <span className="number">{timeLeft.days}</span>
                    <span className="label">{t.days[lang]}</span>
                </div>
                <div className="time-block">
                    <span className="number">{timeLeft.hours}</span>
                    <span className="label">{t.hours[lang]}</span>
                </div>
                <div className="time-block">
                    <span className="number">{timeLeft.minutes}</span>
                    <span className="label">{t.minutes[lang]}</span>
                </div>
                <div className="time-block">
                    <span className="number">{timeLeft.seconds}</span>
                    <span className="label">{t.seconds[lang]}</span>
                </div>
            </div>
        </div>
    );
};

export default WeddingCountdown;
