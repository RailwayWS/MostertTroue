import React from "react";
import "./Hero.css";

import wreathImg from "../../assets/wreath.png";
import back1 from "../../assets/back.jpeg";
import back2 from "../../assets/back2.jpeg";
import back3 from "../../assets/back3.jpeg";

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-background-slider">
                <div
                    className="slide"
                    style={{ backgroundImage: `url(${back1})` }}
                ></div>
                <div
                    className="slide"
                    style={{ backgroundImage: `url(${back2})` }}
                ></div>
                <div
                    className="slide"
                    style={{ backgroundImage: `url(${back3})` }}
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
                    <h1 className="main-names">
                        Liezaan <span className="amp">&</span> Janes
                    </h1>

                    <p className="sub-headline">SAVE THE DATE</p>
                    <div className="date-divider">
                        <span className="line"></span>

                        <div className="date-group">
                            <span className="month">JAN</span>
                            <span className="day">05</span>
                            <span className="year">2027</span>
                        </div>
                        <span className="line"></span>
                    </div>
                </div>
                <div className="wreath-container right">
                    <img src={wreathImg} alt="decorative wreath" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
