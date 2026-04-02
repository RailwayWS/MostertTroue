import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { lang } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const labels = {
        sitplekke: lang === "af" ? "Sitplekke" : "Seating",
        liedere: lang === "af" ? "Liedere" : "Songs",
        program: lang === "af" ? "Program" : "Program",
        fotos: lang === "af" ? "Fotos" : "Photos",
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar-container">
                <button
                    className={`hamburger ${isOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
                    <li className="nav-item">
                        <Link
                            to="/sitplekke"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            {labels.sitplekke}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/liedere"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            {labels.liedere}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/program"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            {labels.program}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/fotos"
                            className="nav-link"
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

export default Navbar;
