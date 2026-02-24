import React from "react";
import "./Parallax.css";
// You can change this to any image you want for the wide background
import parallaxImg from "../../assets/back3.jpeg";

const Parallax = () => {
    return (
        <div
            className="parallax-section"
            style={{ backgroundImage: `url(${parallaxImg})` }}
        >
            {/* Dark overlay to make text readable */}
            <div className="parallax-overlay"></div>

            <div className="parallax-content">
                <h2 className="parallax-verse">
                    "Twee vaar beter as een. Hulle inspanning kom tot iets. As
                    die een val, kan die ander hom ophelp. Maar as een val wat
                    alleen is, is daar niemand om hom op te help nie."
                </h2>
                <div className="parallax-divider">❖</div>
                <p className="parallax-reference">Prediker 4:9-10</p>
            </div>
        </div>
    );
};

export default Parallax;
