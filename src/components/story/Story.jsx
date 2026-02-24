import React from "react";
import "./Story.css";
import wreathImg from "../../assets/flower.png";
import ringIcon from "../../assets/cross.png";
import back1 from "../../assets/back.jpeg";
import back2 from "../../assets/back2.jpeg";

const timelineData = [
    {
        year: "2023",
        imageMain: back1,
        imageSecondary: back2,
        title: "Ontmoeting",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt porttitor venenatis. Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.",
    },
    {
        year: "2024",
        imageMain: back2,
        imageSecondary: back1,
        title: "1 Jaar saam",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt porttitor venenatis. Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.",
    },
    {
        year: "2025",
        imageMain: back1,
        imageSecondary: back2,
        title: "2 Jaar saam!",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt porttitor venenatis. Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.",
    },
    {
        year: "2026",
        imageMain: back1,
        imageSecondary: back2,
        title: "Verloof",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt porttitor venenatis. Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.Vestibulum sit amet est nisl. Vestibulum iaculis finibus sem nec condimentum.",
    },
];

const Story = () => {
    return (
        <div className="story-section">
            <h2 className="story-main-title">Ons Verhaal</h2>
            <div className="title-divider">
                <span className="diamond-icon">❖</span>
            </div>

            <div className="timeline-container">
                {/* The central vertical line */}
                <div className="timeline-line"></div>

                {timelineData.map((item, index) => (
                    <div key={index} className="timeline-item">
                        {/* Year Box */}
                        <div className="timeline-year-box">
                            <span className="year-text">{item.year}</span>
                        </div>

                        {/* Content Section */}
                        <div className="timeline-content-wrapper">
                            {/* Flower Decorations */}
                            <img
                                src={wreathImg}
                                alt=""
                                className="flower-bg flower-top"
                            />
                            <img
                                src={wreathImg}
                                alt=""
                                className="flower-bg flower-bottom"
                            />

                            <div className="collage-grid">
                                {/* Secondary Image (Back) */}
                                <div className="image-frame secondary-image">
                                    <img
                                        src={item.imageSecondary}
                                        alt="Secondary moment"
                                    />
                                </div>

                                {/* Main Image (Front) */}
                                <div className="image-frame main-image">
                                    <img
                                        src={item.imageMain}
                                        alt="Main moment"
                                    />
                                </div>

                                {/* Text Box */}
                                <div className="text-box">
                                    <h3 className="content-title">
                                        {item.title}
                                    </h3>
                                    <div className="content-divider">❖</div>
                                    <p className="content-description">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- NEW TIMELINE FOOTER --- */}
                <div className="timeline-footer">
                    <div className="footer-icon-container">
                        <img
                            src={ringIcon}
                            alt="Forever begins ring"
                            className="ring-icon"
                        />
                    </div>
                    <h3 className="footer-pre-title">Dis waar ons</h3>
                    <h2 className="footer-main-title">Ewigheid Begin</h2>
                </div>
            </div>
        </div>
    );
};

export default Story;
