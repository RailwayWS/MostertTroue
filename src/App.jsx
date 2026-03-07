import React, { useState, useEffect, useRef } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingScreen from "./components/loading/LoadingScreen";
import Hero from "./components/hero/Hero";
import Marry from "./components/marry/Marry";
import Story from "./components/story/Story";
import Location from "./components/location/Location";
import RSVP from "./components/RSVP/RSVP";
import Parallax from "./components/parallax/Parallax";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const appRef = useRef(null);

    useEffect(() => {
        const checkAllLoaded = () => {
            if (!appRef.current) return;

            const images = Array.from(appRef.current.querySelectorAll("img"));
            const iframes = Array.from(
                appRef.current.querySelectorAll("iframe")
            );

            const allElements = [...images, ...iframes];

            // If nothing to wait for, reveal immediately
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
                    el.addEventListener("error", onLoad); // Don't block on errors
                }
            });

            // Already all loaded
            if (loaded >= total) {
                revealSite();
            }

            // Safety timeout — don't block forever (8 seconds max)
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
            }, 600); // Match CSS transition duration
        };

        // Small delay to allow DOM to render
        const timer = setTimeout(checkAllLoaded, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LanguageProvider>
            {isLoading && (
                <div className={`loading-screen${fadeOut ? " fade-out" : ""}`}>
                    <LoadingScreen />
                </div>
            )}
            <div className="App" ref={appRef}>
                <Hero />
                <Marry />
                <Story />
                <Parallax />
                <Location />
                <RSVP />
            </div>
        </LanguageProvider>
    );
}

export default App;
