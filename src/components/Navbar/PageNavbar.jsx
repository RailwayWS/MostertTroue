import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./PageNavbar.css";

const PageNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { lang } = useLanguage();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const labels = {
        tuis: lang === "af" ? "Tuis" : "Home",
        sitplekke: lang === "af" ? "Sitplekke" : "Seating",
        liedere: lang === "af" ? "Liedere" : "Songs",
        program: lang === "af" ? "Program" : "Program",
        fotos: lang === "af" ? "Fotos" : "Photos",
    };

    return (
        <nav className="page-navbar">
            <div className="page-navbar-container">
                <button
                    className={`page-hamburger ${isOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="page-bar"></span>
                    <span className="page-bar"></span>
                    <span className="page-bar"></span>
                </button>

                <ul className={`page-nav-menu ${isOpen ? "active" : ""}`}>
                    <li className="page-nav-item">
                        <Link
                            to="/"
                            className="page-nav-link"
                            onClick={closeMenu}
                        >
                            {labels.tuis}
                        </Link>
                    </li>
                    <li className="page-nav-item">
                        <Link
                            to="/sitplekke"
                            className="page-nav-link"
                            onClick={closeMenu}
                        >
                            {labels.sitplekke}
                        </Link>
                    </li>
                    <li className="page-nav-item">
                        <Link
                            to="/liedere"
                            className="page-nav-link"
                            onClick={closeMenu}
                        >
                            {labels.liedere}
                        </Link>
                    </li>
                    <li className="page-nav-item">
                        <Link
                            to="/program"
                            className="page-nav-link"
                            onClick={closeMenu}
                        >
                            {labels.program}
                        </Link>
                    </li>
                    <li className="page-nav-item">
                        <Link
                            to="/fotos"
                            className="page-nav-link"
                            onClick={closeMenu}
                        >
                            {labels.fotos}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default PageNavbar;
