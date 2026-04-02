import React, { useState, useEffect, useRef } from "react";
import { ref as dbRef, push, onValue } from "firebase/database";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../firebase";
import { useLanguage } from "../../context/LanguageContext";
import "./Picture.css";
import Navbar from "../../components/Navbar/PageNavbar";

const Picture = () => {
    const [photos, setPhotos] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [totalToUpload, setTotalToUpload] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [lightbox, setLightbox] = useState(null);
    const fileInputRef = useRef(null);
    const { lang } = useLanguage();

    const t = {
        title: lang === "af" ? "Fotos" : "Photos",
        subtitle:
            lang === "af"
                ? "Deel jou foto's van die dag met ons"
                : "Share your photos from the day with us",
        uploadTitle:
            lang === "af" ? "Laai jou foto's op" : "Upload your photos",
        dragText:
            lang === "af"
                ? "Sleep foto's hierheen of klik om te kies"
                : "Drag photos here or click to browse",
        maxNote:
            lang === "af"
                ? "Laai asseblief nie meer as 10 foto's op nie"
                : "Please upload no more than 10 photos",
        uploading: lang === "af" ? "Besig om op te laai..." : "Uploading...",
        uploadProgress:
            lang === "af"
                ? `${uploadCount} van ${totalToUpload} opgelaai`
                : `${uploadCount} of ${totalToUpload} uploaded`,
        gallery: lang === "af" ? "Galery" : "Gallery",
        noPhotos:
            lang === "af"
                ? "Nog geen foto's opgelaai nie"
                : "No photos uploaded yet",
        browse: lang === "af" ? "Kies Foto's" : "Choose Photos",
    };

    // Listen for photos in Realtime DB
    useEffect(() => {
        const photosRef = dbRef(db, "wedding-photos");
        const unsub = onValue(photosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.values(data).sort(
                    (a, b) => (b.timestamp || 0) - (a.timestamp || 0),
                );
                setPhotos(arr);
            } else {
                setPhotos([]);
            }
        });

        return () => unsub();
    }, []);

    const handleFiles = async (files) => {
        if (!files || files.length === 0) return;

        const validFiles = Array.from(files).filter((f) =>
            f.type.startsWith("image/"),
        );

        if (validFiles.length === 0) return;

        setUploading(true);
        setUploadCount(0);
        setTotalToUpload(validFiles.length);

        for (const file of validFiles) {
            try {
                const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name}`;
                const fileRef = storageRef(
                    storage,
                    `wedding-photos/${filename}`,
                );

                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);

                await push(dbRef(db, "wedding-photos"), {
                    url,
                    filename,
                    timestamp: Date.now(),
                });

                setUploadCount((prev) => prev + 1);
            } catch (err) {
                console.error("Upload error:", err);
            }
        }

        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    return (
        <>
            <Navbar />
            <div className="picture-page">
                <div className="picture-header">
                    <h1 className="picture-title">{t.title}</h1>
                    <p className="picture-subtitle">{t.subtitle}</p>
                </div>

                {/* Upload Section */}
                <div className="upload-section">
                    <div
                        className={`drop-zone ${dragActive ? "drag-active" : ""} ${uploading ? "uploading" : ""}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() =>
                            !uploading && fileInputRef.current?.click()
                        }
                    >
                        {uploading ? (
                            <div className="upload-progress">
                                <div className="upload-spinner"></div>
                                <span className="upload-status">
                                    {t.uploadProgress}
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="drop-icon">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <p className="drop-text">{t.dragText}</p>
                                <button
                                    className="browse-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                >
                                    {t.browse}
                                </button>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="file-input-hidden"
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                    </div>
                    <p className="max-note">{t.maxNote}</p>
                </div>

                {/* Gallery */}
                <div className="gallery-section">
                    <h2 className="gallery-title">{t.gallery}</h2>
                    {photos.length === 0 ? (
                        <p className="no-photos">{t.noPhotos}</p>
                    ) : (
                        <div className="photo-grid">
                            {photos.map((photo, i) => (
                                <div
                                    key={i}
                                    className="photo-item"
                                    onClick={() => setLightbox(photo.url)}
                                >
                                    <img
                                        src={photo.url}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Lightbox */}
                {lightbox && (
                    <div
                        className="lightbox-overlay"
                        onClick={() => setLightbox(null)}
                    >
                        <button
                            className="lightbox-close"
                            onClick={() => setLightbox(null)}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <img
                            src={lightbox}
                            alt=""
                            className="lightbox-image"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Picture;
