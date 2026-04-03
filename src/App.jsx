import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingScreen from "./components/loading/LoadingScreen";
import Hero from "./components/hero/Hero";
import Marry from "./components/marry/Marry";
import Story from "./components/story/Story";
import Location from "./components/location/Location";
import RSVP from "./components/RSVP/RSVP";
import Gifts from "./components/Gifts/Gifts"; // Add this import
import Parallax from "./components/parallax/Parallax";
import Navbar from "./components/Navbar/Navbar";
import Seating from "./pages/Seating/Seating";
import Liedere from "./pages/Liedere/Liedere";
import Program from "./pages/Program/Program";
import Picture from "./pages/Picture/Picture";
import Thanks from "./pages/Thankyou/Thanks"; // Add this import

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const appRef = useRef(null);

    useEffect(() => {
        // Record the time we started loading
        const startTime = Date.now();

        const checkAllLoaded = () => {
            if (!appRef.current) return;

            // 1. Get standard images and iframes
            const domImages = Array.from(
                appRef.current.querySelectorAll("img"),
            );
            const iframes = Array.from(
                appRef.current.querySelectorAll("iframe"),
            );

            // 2. Extract background images from the Hero slider
            const slides = Array.from(
                appRef.current.querySelectorAll(".slide"),
            );
            const bgImageUrls = slides
                .map((slide) => {
                    const match = slide.style.backgroundImage.match(
                        /url\(['"]?(.*?)['"]?\)/,
                    );
                    return match ? match[1] : null;
                })
                .filter(Boolean);

            // Create off-screen image objects to track background image loading
            const bgImages = bgImageUrls.map((url) => {
                const img = new Image();
                img.src = url;
                return img;
            });

            const allElements = [...domImages, ...bgImages, ...iframes];

            const revealSite = () => {
                // Ensure a minimum of 1 second (1000ms) has passed since load started
                const timeElapsed = Date.now() - startTime;
                const remainingTime = Math.max(0, 1000 - timeElapsed);

                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 600);
                }, remainingTime);
            };

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
                        el.contentDocument?.readyState === "complete") ||
                    // Image objects created manually won't have tagNames, check complete
                    (el instanceof Image && el.complete)
                ) {
                    loaded++;
                } else {
                    el.addEventListener("load", onLoad);
                    el.addEventListener("error", onLoad); // Continue even if one fails
                }
            });

            if (loaded >= total) {
                revealSite();
            }

            // Fallback timeout inside the effect
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
            <div
                ref={appRef}
                className={!isLoading ? "app-loaded" : "app-loading"}
            >
                {/* <Navbar /> */}
                {/* Pass isLoading state to Hero so it knows when to start moving */}
                <Hero isLoaded={!isLoading} />
                <Marry />
                <Story />
                <Parallax />
                <Location />
                <RSVP />
                <Gifts />
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
                    <Route path="/thanks" element={<Thanks />} />
                </Routes>
            </div>
        </LanguageProvider>
    );
}

export default App;
