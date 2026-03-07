import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
    return (
        <div className="loading-content">
            <div className="loading-ornament">❖</div>
            <h1 className="loading-names">L & J</h1>
            <div className="loading-bar-track">
                <div className="loading-bar-fill"></div>
            </div>
            <p className="loading-text">Laai tans...</p>
        </div>
    );
};

export default LoadingScreen;
