import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageNavbar from "../../components/Navbar/PageNavbar"; // <-- Import the new navbar here
import "./Seating.css";

const guests = [
    { name: "Janes", table: 1 },
    { name: "Liezel", table: 1 },
    { name: "Sarah", table: 2 },
    { name: "Johan", table: 2 },
    { name: "Anna", table: 3 },
    { name: "Pieter", table: 3 },
    { name: "Maria", table: 4 },
    { name: "Hendrik", table: 4 },
    { name: "Elsa", table: 5 },
    { name: "Willem", table: 5 },
    { name: "Karien", table: 6 },
    { name: "Danie", table: 6 },
    { name: "Suzanne", table: 7 },
    { name: "Francois", table: 7 },
    { name: "Marelize", table: 8 },
    { name: "Christiaan", table: 8 },
];

const Seating = () => {
    const [search, setSearch] = useState("");
    const { lang } = useLanguage();

    const trimmed = search.trim().toLowerCase();
    const match = trimmed
        ? guests.find((g) => g.name.toLowerCase() === trimmed)
        : null;

    const t = {
        title: lang === "af" ? "Sitplekke" : "Seating Plan",

        placeholder:
            lang === "af" ? "Tik jou naam hier..." : "Type your name here...",
        welcome:
            lang === "af"
                ? `Welkom! Jy sit by Tafel ${match?.table}.`
                : `Welcome! You're at Table ${match?.table}.`,
        notFound:
            lang === "af"
                ? "Naam nie gevind nie. Probeer asseblief weer."
                : "Name not found. Please try again.",
        table: lang === "af" ? "Tafel" : "Table",
        door: lang === "af" ? "Deur" : "Door",
    };

    return (
        <div className="seating-page">
            <PageNavbar />
            <div className="seating-header">
                <h1 className="seating-title">{t.title}</h1>

                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t.placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="search-icon">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </div>
                </div>

                {trimmed && (
                    <div
                        className={`search-result ${match ? "found" : "not-found"}`}
                    >
                        {match ? t.welcome : t.notFound}
                    </div>
                )}
            </div>
            <div className="room-container">
                <div className="tables-grid">
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                        <div
                            key={num}
                            className={`table-circle ${match?.table === num ? "highlight" : ""}`}
                        >
                            <span className="table-number">{num}</span>
                            <span className="table-label">{t.table}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Seating;
