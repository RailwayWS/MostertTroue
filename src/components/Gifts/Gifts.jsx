import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Gifts.css";

const Gifts = () => {
    const sectionRef = useScrollReveal({ threshold: 0.15 });
    const { lang } = useLanguage();

    const t = {
        title: { af: "Geskenke", en: "Gifts" },
        message: {
            af: "Jou teenwoordigheid is vir ons die grootste geskenk! As jy ons egter met iets wil bederf om ons nuwe lewe in te rig, sal 'n finansiële bydrae of 'n koopbewys van die onderstaande winkels opreg waardeer word.",
            en: "Your company is the only gift we need! If you wish to spoil us as we set up our new life together, a financial contribution or a voucher from the stores below would be greatly appreciated.",
        },
        bankingTitle: { af: "Bankbesonderhede", en: "Banking Details" },
        bank: { af: "Bank", en: "Bank" },
        accName: { af: "Rekening Naam", en: "Account Name" },
        accNum: { af: "Rekeningnommer", en: "Account Number" },
        branch: { af: "Takkode", en: "Branch Code" },
        ref: { af: "Verwysing", en: "Reference" },
        refText: {
            af: "Jou Naam  + Mostert Troue",
            en: "Your Name  + Mostert Wedding",
        },
    };

    const stores = [
        "Takealot",
        "Makro",
        "Woolworths",
        "Mr Price Home",
        "Sheet Street",
    ];

    return (
        <section className="gifts-section" id="geskenke" ref={sectionRef}>
            <div className="gifts-container reveal reveal-fade-up">
                <div className="gifts-frame">
                    <h2 className="gifts-title">{t.title[lang]}</h2>

                    <div className="title-divider">
                        <span className="diamond-icon">❖</span>
                    </div>

                    <p className="gifts-message">{t.message[lang]}</p>

                    <div className="stores-grid">
                        {stores.map((store, index) => (
                            <div key={index} className="store-tag">
                                {store}
                            </div>
                        ))}
                    </div>

                    <div className="banking-details">
                        <h3 className="banking-title">
                            {t.bankingTitle[lang]}
                        </h3>
                        <p className="banking-info">
                            <strong>{t.bank[lang]}:</strong> Absa <br />
                            <strong>{t.accName[lang]}:</strong> Jacob Johannes
                            Mostert <br />
                            <strong>{t.accNum[lang]}:</strong> 4107019469 <br />
                            <strong>{t.branch[lang]}:</strong> 632005 <br />
                            <strong>{t.ref[lang]}:</strong> {t.refText[lang]}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gifts;
