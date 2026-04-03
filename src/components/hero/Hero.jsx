import React from "react";
import "./Hero.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";
import Navbar from "../Navbar/Navbar";
import Timer from "../timer/Timer";

import wreathImg from "../../assets/optimized_webp/wreath.webp";
import back1 from "../../assets/optimized_webp/back.webp";
import back2 from "../../assets/optimized_webp/back2.webp";
import back3 from "../../assets/optimized_webp/back3.webp";
import vra from "../../assets/optimized_webp/vra.webp";
import hero1 from "../../assets/optimized_webp/hero1.webp";
import hero2 from "../../assets/optimized_webp/hero2.webp";
import hero3 from "../../assets/optimized_webp/hero3.webp";

const Hero = () => {
    const { lang, toggleLang } = useLanguage();
    const t = translations.hero;

    // Add a smooth scroll function to prevent the default anchor jump/page reload
    const handleScrollToRSVP = (e) => {
        e.preventDefault();
        const rsvpSection = document.getElementById("rsvp");
        if (rsvpSection) {
            rsvpSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="hero-container">
                {/* Language Toggle */}
                <button className="lang-toggle" onClick={toggleLang}>
                    {t.langToggle[lang]}
                </button>

                <div className="hero-background-slider">
                    <div
                        className="slide"
                        style={{
                            backgroundImage: `url(${vra})`,
                            backgroundPosition: "center 80%", // Adjust this percentage to move it up or down
                        }}
                    ></div>
                    <div
                        className="slide"
                        style={{ backgroundImage: `url(${hero1})` }}
                    ></div>
                    <div
                        className="slide"
                        style={{ backgroundImage: `url(${hero3})` }}
                    ></div>
                </div>

                <div className="overlay"></div>

                <div className="hero-content">
                    {/* Left Wreath Decoration */}
                    <div className="wreath-container left">
                        <img src={wreathImg} alt="decorative wreath" />
                    </div>

                    {/* Central Text */}
                    <div className="text-container">
                        <h1 className="main-names hero-entrance delay-1">
                            Liezaan <span className="amp">&</span> Janes
                        </h1>

                        <p className="sub-headline hero-entrance delay-2">
                            {t.saveTheDate[lang]}
                        </p>
                        <div className="date-divider hero-entrance delay-3">
                            <span className="line"></span>

                            <div className="date-group">
                                <span className="month">{t.month[lang]}</span>
                                <span className="day">{t.day[lang]}</span>
                                <span className="year">{t.year[lang]}</span>
                            </div>
                            <span className="line"></span>
                        </div>

                        <Timer />

                        <a
                            href="#rsvp"
                            onClick={handleScrollToRSVP}
                            className="hero-rsvp-btn hero-entrance delay-3"
                        >
                            RSVP
                        </a>
                    </div>
                    <div className="wreath-container right">
                        <img src={wreathImg} alt="decorative wreath" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
