import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./liedere.css";
import Navbar from "../../components/Navbar/PageNavbar";

const songs = [
    {
        id: 1,
        title: {
            af: "Lied 290 — Ek wat vergeet en afgedwaal het",
            en: "Hymn 290 — I who forgot and wandered away",
        },
        verses: [
            {
                af: `Ek wat vergeet en afgedwaal het,
ver van U af in sonde se nag,
na my het U steeds omgesien, Heer,
liefdevol vir my bly wag.`,
                en: `I who forgot and wandered away,
far from You in sin's dark night,
You kept watching over me, Lord,
lovingly waiting with Your light.`,
            },
            {
                af: `En toe ek weer die pad huis toe vind,
het U my met oop arms verwag,
nooit het U my ooit opgegee nie,
liefdevol vir my bly wag.`,
                en: `And when I found the path home again,
You waited with open embrace,
never did You give up on me,
lovingly waiting with Your grace.`,
            },
        ],
    },
    {
        id: 2,
        title: {
            af: "Lied 470 — Prys die Heer met blye galme",
            en: "Hymn 470 — Praise the Lord with joyful song",
        },
        verses: [
            {
                af: `Prys die Heer met blye galme,
juig tot eer van Hom wat leef;
prys Hom, prys Hom, sing Hom psalme,
Hom wat ons die lewe gee.`,
                en: `Praise the Lord with joyful singing,
rejoice in honour of the Living One;
praise Him, praise Him, sing Him psalms,
Him who gives us life begun.`,
            },
            {
                af: `Hy wat in die hemel woon daar,
Sien op ons in liefde neer;
Hy wat oor die wêreld heers daar,
Hy bly ewig, ewig Heer.`,
                en: `He who dwells in heaven above,
looks on us with love so true;
He who reigns over all the world,
remains forever Lord anew.`,
            },
        ],
    },
    {
        id: 3,
        title: {
            af: "Lied 284 — Loof die Here, al wat lewe",
            en: "Hymn 284 — Praise the Lord, all that lives",
        },
        verses: [
            {
                af: `Loof die Here, al wat lewe,
loof Hom selfs in donker nag;
prys Hom vir sy groot genade,
prys Hom vir sy wondre mag.`,
                en: `Praise the Lord, all that lives,
praise Him even in darkest night;
praise Him for His great mercy,
praise Him for His wondrous might.`,
            },
            {
                af: `In die môre, in die aand,
in ons lief en in ons leed,
in die vreugde, in die hartseer,
is dit Hy wat ons steeds lei.`,
                en: `In the morning, in the evening,
in our joy and in our pain,
in our gladness, in our sorrow,
it is He who leads again.`,
            },
        ],
    },
    {
        id: 4,
        title: {
            af: "Lied 533 — Stille nag, heilige nag",
            en: "Hymn 533 — Silent night, holy night",
        },
        verses: [
            {
                af: `Stille nag, heilige nag!
Alles slaap, eensaam wag
net die heilige ouderpaar,
wat die kindjie met goudkleur haar
koester in hemelvreê,
koester in hemelvreê.`,
                en: `Silent night, holy night!
All is calm, all is bright
round yon virgin mother and child,
holy infant so tender and mild,
sleep in heavenly peace,
sleep in heavenly peace.`,
            },
            {
                af: `Stille nag, heilige nag!
Herders hou hul eers wag,
toe klink dit van ver en naby,
engelesang oor die veld so bly:
Christus die Redder is daar!
Christus die Redder is daar!`,
                en: `Silent night, holy night!
Shepherds quake at the sight,
glories stream from heaven afar,
heavenly hosts sing alleluia;
Christ the Saviour is born!
Christ the Saviour is born!`,
            },
        ],
    },
    {
        id: 5,
        title: {
            af: "Lied 154 — Heilig, heilig, heilig",
            en: "Hymn 154 — Holy, holy, holy",
        },
        verses: [
            {
                af: `Heilig, heilig, heilig, Heer God Almagtig!
Vroeg in die môre klink ons lofsang, Heer, vir U.
Heilig, heilig, heilig, liefdevol en magtig,
Drie-enig God wat ewig heers.`,
                en: `Holy, holy, holy, Lord God Almighty!
Early in the morning our song shall rise to Thee.
Holy, holy, holy, merciful and mighty,
God in three Persons, blessed Trinity.`,
            },
            {
                af: `Heilig, heilig, heilig, duisternis verberg U,
oog van die sondaar kan u heerlikheid nie sien.
U alleen is heilig, niemand naas U waardig,
volmaak in krag en liefde rein.`,
                en: `Holy, holy, holy, though the darkness hide Thee,
though the eye of sinful man Thy glory may not see.
Only Thou art holy, there is none beside Thee,
perfect in pow'r, in love and purity.`,
            },
        ],
    },
];

const Liedere = () => {
    const { lang } = useLanguage();

    const t = {
        title: lang === "af" ? "Liedere" : "Songs",
        subtitle:
            lang === "af"
                ? "Die liedere wat ons in die kerk gaan sing"
                : "The songs we will sing in church",
        verse: lang === "af" ? "Vers" : "Verse",
    };

    return (
        <>
            <Navbar />
            <div className="liedere-page">
                <div className="liedere-header">
                    <h1 className="liedere-title">{t.title}</h1>
                    <p className="liedere-subtitle">{t.subtitle}</p>
                </div>

                <div className="songs-list">
                    {songs.map((song) => (
                        <div key={song.id} className="song-card">
                            <h2 className="song-title">{song.title[lang]}</h2>
                            <div className="song-verses">
                                {song.verses.map((verse, i) => (
                                    <div key={i} className="verse-block">
                                        <span className="verse-number">
                                            {t.verse} {i + 1}
                                        </span>
                                        <pre className="verse-text">
                                            {verse[lang]}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Liedere;
