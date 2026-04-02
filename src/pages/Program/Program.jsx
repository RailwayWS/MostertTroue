import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./Program.css";
import Navbar from "../../components/Navbar/PageNavbar";

const events = [
    {
        time: "14:00",
        title: { af: "Seremonie", en: "Ceremony" },
        desc: {
            af: "Die huwelikseremonie begin",
            en: "The wedding ceremony begins",
        },
    },
    {
        time: "14:45",
        title: { af: "Groepfotos", en: "Group Photos" },
        desc: {
            af: "Familiefoto's en bruidspaarfoto's",
            en: "Family and couple photographs",
        },
    },
    {
        time: "15:30",
        title: { af: "Onthaal & Welkom", en: "Reception & Welcome" },
        desc: {
            af: "Verwelkoming en verversings",
            en: "Welcome drinks and refreshments",
        },
    },
    {
        time: "16:00",
        title: { af: "Toesprake", en: "Speeches" },
        desc: { af: "Heildronke en toesprake", en: "Toasts and speeches" },
    },
    {
        time: "17:00",
        title: { af: "Ete", en: "Dinner" },
        desc: { af: "Feesmaal word bedien", en: "Wedding feast is served" },
    },
    {
        time: "18:30",
        title: { af: "Koek Sny", en: "Cake Cutting" },
        desc: {
            af: "Tradisionele koeksny-seremonie",
            en: "Traditional cake cutting ceremony",
        },
    },
    {
        time: "19:00",
        title: { af: "Eerste Dans", en: "First Dance" },
        desc: {
            af: "Die bruidspaar se eerste dans",
            en: "The couple's first dance",
        },
    },
    {
        time: "19:30",
        title: { af: "Dansvloer Oop", en: "Dance Floor Open" },
        desc: {
            af: "Geniet die aand en dans saam!",
            en: "Enjoy the evening and dance along!",
        },
    },
];

const Program = () => {
    const { lang } = useLanguage();

    const t = {
        title: lang === "af" ? "Program" : "Program",
        subtitle: lang === "af" ? "Die dag se verloop" : "Order of the day",
    };

    return (
        <>
            <Navbar />
            <div className="program-page">
                <div className="program-header">
                    <h1 className="program-title">{t.title}</h1>
                    <p className="program-subtitle">{t.subtitle}</p>
                </div>

                <div className="timeline">
                    {events.map((event, i) => (
                        <div key={i} className="timeline-item">
                            <div className="timeline-time">{event.time}</div>
                            <div className="timeline-marker">
                                <div className="timeline-dot"></div>
                                {i < events.length - 1 && (
                                    <div className="timeline-line"></div>
                                )}
                            </div>
                            <div className="timeline-content">
                                <h3 className="timeline-event-title">
                                    {event.title[lang]}
                                </h3>
                                <p className="timeline-event-desc">
                                    {event.desc[lang]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Program;
