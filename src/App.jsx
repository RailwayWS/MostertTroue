import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Hero from "./components/hero/Hero";
import Marry from "./components/marry/Marry";
import Story from "./components/story/Story";
import Location from "./components/location/Location";
import RSVP from "./components/RSVP/RSVP";
import Parallax from "./components/parallax/Parallax";

function App() {
    return (
        <LanguageProvider>
            <div className="App">
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
