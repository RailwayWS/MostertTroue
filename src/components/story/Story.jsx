import React from "react";
import "./Story.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../context/translations";
import wreathImg from "../../assets/optimized_webp/flower.webp";
import ringIcon from "../../assets/optimized_webp/cross.webp";
import back1 from "../../assets/optimized_webp/back.webp";
import back2 from "../../assets/optimized_webp/back2.webp";
import verloof from "../../assets/optimized_webp/verloof1.webp";
import verloof2 from "../../assets/optimized_webp/verloof2.webp";
import ontmoet1 from "../../assets/optimized_webp/ontmoet1.webp";
import ontmoet2 from "../../assets/optimized_webp/ontmoet2.webp";
import jaar1 from "../../assets/optimized_webp/jaar1.webp";
import jaar2 from "../../assets/optimized_webp/jaar2.webp";
import jaar2nog from "../../assets/optimized_webp/jaar2nog.webp";

const timelineImages = [
    { imageMain: ontmoet1, imageSecondary: ontmoet2 },
    { imageMain: back1, imageSecondary: jaar1 },
    { imageMain: jaar2, imageSecondary: jaar2nog },
    { imageMain: verloof, imageSecondary: verloof2 },
];

const years = ["2023", "2024", "2025", "2026"];

const TimelineItem = ({ images, year, titleText, descText, index }) => {
    const itemRef = useScrollReveal({ threshold: 0.15 });

    return (
        <div
            key={index}
            className="timeline-item reveal reveal-fade-up"
            ref={itemRef}
        >
            {/* Year Box */}
            <div className="timeline-year-box">
                <span className="year-text">{year}</span>
            </div>

            {/* Content Section */}
            <div className="timeline-content-wrapper">
                {/* Flower Decorations */}
                <img src={wreathImg} alt="" className="flower-bg flower-top" />
                <img
                    src={wreathImg}
                    alt=""
                    className="flower-bg flower-bottom"
                />

                <div className="collage-grid">
                    {/* Secondary Image (Back) */}
                    <div className="image-frame secondary-image">
                        <img
                            src={images.imageSecondary}
                            alt="Secondary moment"
                        />
                    </div>

                    {/* Main Image (Front) */}
                    <div className="image-frame main-image">
                        <img src={images.imageMain} alt="Main moment" />
                    </div>

                    {/* Text Box */}
                    <div className="text-box">
                        <h3 className="content-title">{titleText}</h3>
                        <div className="content-divider">❖</div>
                        <p className="content-description">{descText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Story = () => {
    const titleRef = useScrollReveal({ threshold: 0.3 });
    const footerRef = useScrollReveal({ threshold: 0.3 });
    const { lang } = useLanguage();
    const t = translations.story;

    return (
        <div className="story-section">
            <div ref={titleRef}>
                <h2 className="story-main-title reveal reveal-fade-up delay-1">
                    {t.mainTitle[lang]}
                </h2>
                <div className="title-divider reveal reveal-fade-up delay-2">
                    <span className="diamond-icon">❖</span>
                </div>
            </div>

            <div className="timeline-container">
                {/* The central vertical line */}
                <div className="timeline-line"></div>

                {t.timeline.map((item, index) => (
                    <TimelineItem
                        key={index}
                        images={timelineImages[index]}
                        year={years[index]}
                        titleText={item.title[lang]}
                        descText={item.description[lang]}
                        index={index}
                    />
                ))}

                {/* --- TIMELINE FOOTER --- */}
                <div
                    className="timeline-footer reveal reveal-fade-up"
                    ref={footerRef}
                >
                    <div className="footer-icon-container">
                        <img
                            src={ringIcon}
                            alt="Forever begins ring"
                            className="ring-icon"
                        />
                    </div>
                    <h3 className="footer-pre-title">{t.footerPre[lang]}</h3>
                    <h2 className="footer-main-title">{t.footerMain[lang]}</h2>
                </div>
            </div>
        </div>
    );
};

export default Story;
