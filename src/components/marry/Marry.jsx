import React from "react";
import "./Marry.css";
import back1 from "../../assets/back.jpeg";
import back2 from "../../assets/back2.jpeg";

const Marry = () => {
    return (
        <div className="marry-section">
            <div className="marry-container">
                {/* Text Content */}
                <div className="marry-content">
                    <h3 className="pre-title">Ons Vier</h3>
                    <h2 className="main-title">Bruilof</h2>

                    {/* Updated Bible Verse Section */}
                    <div className="bible-quote-wrapper">
                        <p className="verse-text">
                            "Die liefde is geduldig, die liefde is vriendelik;
                            dit is nie afgunstig nie, is nie grootpraterig nie,
                            is nie verwaand nie. Dit handel nie onwelvoeglik
                            nie, soek nie sy eie belang nie, is nie liggeraak
                            nie, hou nie boek van die kwaad nie. Dit verbly nie
                            oor onreg nie, maar verheug hom oor die waarheid.
                            Dit bedek alles, glo alles, hoop alles, verdra
                            alles."
                        </p>
                        <div className="verse-divider"></div>
                        <p className="verse-reference">1 KORINTIËRS 13:4-7</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marry;
