import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingScreen from "./components/loading/LoadingScreen";
import Hero from "./components/hero/Hero";
import Marry from "./components/marry/Marry";
import Story from "./components/story/Story";
import Location from "./components/location/Location";
import RSVP from "./components/RSVP/RSVP";
import Parallax from "./components/parallax/Parallax";
import Navbar from "./components/Navbar/Navbar";
import Seating from "./pages/Seating/Seating";
import Liedere from "./pages/Liedere/Liedere";
import Program from "./pages/Program/Program";
import Picture from "./pages/Picture/Picture";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const appRef = useRef(null);

    useEffect(() => {
        const checkAllLoaded = () => {
            if (!appRef.current) return;

            const images = Array.from(appRef.current.querySelectorAll("img"));
            const iframes = Array.from(
                appRef.current.querySelectorAll("iframe"),
            );

            const allElements = [...images, ...iframes];

            if (allElements.length === 0) {
                revealSite();
                return;
            }

            let loaded = 0;
            const total = allElements.length;

            const onLoad = () => {
                loaded++;
                if (loaded >= total) {
                    revealSite();
                }
            };

            allElements.forEach((el) => {
                if (
                    el.complete ||
                    el.readyState === 4 ||
                    (el.tagName === "IFRAME" &&
                        el.contentDocument?.readyState === "complete")
                ) {
                    loaded++;
                } else {
                    el.addEventListener("load", onLoad);
                    el.addEventListener("error", onLoad);
                }
            });

            if (loaded >= total) {
                revealSite();
            }

            const timeout = setTimeout(() => {
                revealSite();
            }, 8000);

            return () => {
                clearTimeout(timeout);
                allElements.forEach((el) => {
                    el.removeEventListener("load", onLoad);
                    el.removeEventListener("error", onLoad);
                });
            };
        };

        const revealSite = () => {
            setFadeOut(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 600);
        };

        const timer = setTimeout(checkAllLoaded, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && (
                <div className={`loading-screen${fadeOut ? " fade-out" : ""}`}>
                    <LoadingScreen />
                </div>
            )}
            <div ref={appRef}>
                <Hero />
                <Marry />
                <Story />
                <Parallax />
                <Location />
                <RSVP />
            </div>
        </>
    );
}

function App() {
    return (
        <LanguageProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sitplekke" element={<Seating />} />
                    <Route path="/liedere" element={<Liedere />} />
                    <Route path="/program" element={<Program />} />
                    <Route path="/fotos" element={<Picture />} />
                </Routes>
            </div>
        </LanguageProvider>
    );
}

export default App;
