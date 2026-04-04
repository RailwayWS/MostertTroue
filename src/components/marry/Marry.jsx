import React from "react";
import "./Marry.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";

const Marry = () => {
    const sectionRef = useScrollReveal({ threshold: 0.2 });
    const { lang } = useLanguage();
    const t = translations.marry;

    return (
        <div className="marry-section" ref={sectionRef}>
            <div className="marry-container">
                {/* Text Content */}
                <div className="marry-content">
                    <h3 className="pre-title reveal reveal-fade-up delay-1">
                        {t.preTitle[lang]}
                    </h3>
                    <h2 className="main-title reveal reveal-fade-up delay-2">
                        {t.mainTitle[lang]}
                    </h2>

                    {/* Bible Verse Section */}
                    <div className="bible-quote-wrapper reveal reveal-fade-up delay-3">
                        <p className="verse">{t.verse[lang]}</p>
                        <div className="verse-divider"></div>
                        <p className="verse-reference">{t.verseRef[lang]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marry;
