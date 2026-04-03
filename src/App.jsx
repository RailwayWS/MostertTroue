import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingScreen from "./components/loading/LoadingScreen";
import Hero from "./components/hero/Hero";
import Marry from "./components/marry/Marry";
import Story from "./components/story/Story";
import Location from "./components/location/Location";
import RSVP from "./components/RSVP/RSVP";
import Gifts from "./components/Gifts/Gifts";
import Parallax from "./components/parallax/Parallax";
import Navbar from "./components/Navbar/Navbar";
import Seating from "./pages/Seating/Seating";
import Liedere from "./pages/Liedere/Liedere";
import Program from "./pages/Program/Program";
import Picture from "./pages/Picture/Picture";
import Thanks from "./pages/Thankyou/Thanks"; // Add this import

// 1. Explicitly import the large hero images here
import vra from "./assets/vra.jpeg";
import hero1 from "./assets/hero1.JPG";
import hero3 from "./assets/hero3.JPG";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const appRef = useRef(null);

    useEffect(() => {
        const startTime = Date.now();

        const checkAllLoaded = () => {
            if (!appRef.current) return;

            // Get standard images and iframes from the DOM
            const domImages = Array.from(
                appRef.current.querySelectorAll("img"),
            );
            const iframes = Array.from(
                appRef.current.querySelectorAll("iframe"),
            );

            // 2. Safely create Image objects from the explicitly imported Hero images
            const criticalImagePaths = [vra, hero1, hero3];
            const criticalImages = criticalImagePaths.map((src) => {
                const img = new Image();
                img.src = src;
                return img;
            });

            // Combine them all together
            const allElements = [...domImages, ...criticalImages, ...iframes];

            const revealSite = () => {
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
                // Check if all elements are loaded
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
