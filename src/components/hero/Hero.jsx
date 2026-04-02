import React from "react";
import "./Hero.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";

import wreathImg from "../../assets/wreath.png";
import back1 from "../../assets/back.jpeg";
import back2 from "../../assets/back2.jpeg";
import back3 from "../../assets/back3.jpeg";
import vra from "../../assets/vra.jpeg";
import hero1 from "../../assets/hero1.JPG";
import hero2 from "../../assets/hero2.jpeg";
import hero3 from "../../assets/hero3.JPG";

const Hero = () => {
    const { lang, toggleLang } = useLanguage();
    const t = translations.hero;

    return (
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
                        backgroundPosition: "center 100%", // Adjust this percentage to move it up or down
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

                    <a
                        href="#rsvp"
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
    );
};

export default Hero;
