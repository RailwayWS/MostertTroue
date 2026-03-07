import React from "react";
import "./Parallax.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";
// You can change this to any image you want for the wide background
import parallaxImg from "../../assets/stap.jpeg";

const Parallax = () => {
    const sectionRef = useScrollReveal({ threshold: 0.25 });
    const { lang } = useLanguage();
    const t = translations.parallax;

    return (
        <div
            className="parallax-section"
            style={{ backgroundImage: `url(${parallaxImg})` }}
            ref={sectionRef}
        >
            {/* Dark overlay to make text readable */}
            <div className="parallax-overlay"></div>

            <div className="parallax-content">
                <h2 className="parallax-verse reveal reveal-fade-up delay-1">
                    {t.verse[lang]}
                </h2>
                <div className="parallax-divider reveal reveal-fade-in delay-2">❖</div>
                <p className="parallax-reference reveal reveal-fade-up delay-3">
                    {t.verseRef[lang]}
                </p>
            </div>
        </div>
    );
};

export default Parallax;
