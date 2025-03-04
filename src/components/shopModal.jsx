//shopModal.jsx
import { useState, useEffect } from 'react';
import styles from '../styles/modal.module.css';
import ToggleButtons from '../components/toggle';
import insta from '../assets/insta.png';
import fb from '../assets/fb.png';
import x from '../assets/x.png';
import yt from '../assets/yt.png';
import amazon from '../assets/amazon.png';
import flipkart from '../assets/flipkart.png';
import zomato from '../assets/zomato.jpeg';
import swiggy from '../assets/swiggy.png';

const ShopModal = ({ isOpen, onClose, activeButton: initialActiveButton, onUpdateLink }) => {
    if (!isOpen) return null;

    const [activeButton, setActiveButton] = useState(initialActiveButton || 'link');
    const [selectedApp, setSelectedApp] = useState(null);
    const [linkTitle, setLinkTitle] = useState("");
    const [linkUrl, setLinkUrl] = useState("");

    const handleAppSelect = (appSrc) => {
        setSelectedApp(appSrc === selectedApp ? null : appSrc);
    };
    
    const links = [
        { src: insta, alt: "Instagram" },
        { src: fb, alt: "Facebook" },
        { src: yt, alt: "YouTube" },
        { src: x, alt: "X" }
    ];

    const shops = [
        { src: amazon, alt: "Amazon" },
        { src: flipkart, alt: "Flipkart" },
        { src: zomato, alt: "Zomato" },
        { src: swiggy, alt: "swiggy" }
    ];

    const dataSet = activeButton === 'shop' ? shops : links;

    useEffect(() => {
        // Send updated data to Links.jsx whenever user enters something
        onUpdateLink({
            title: linkTitle,
            url: linkUrl,
            applications: selectedApp ? [selectedApp] : [],
            type: activeButton,
        });
    }, [linkTitle, linkUrl, selectedApp, activeButton]);


    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
                <div className={styles.linksOptions}>
                    <ToggleButtons activeButton={activeButton} setActiveButton={setActiveButton} />
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.appContainer}>
                        <h3>Enter URL</h3>
                        <div className={styles.inputBox}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="Link Title"
                                    value={linkTitle}
                                    onChange={(e) => setLinkTitle(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="Link Url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {activeButton && (
                        <>
                            <hr />
                            <div className={styles.appContainer}>
                                <label>Applications</label>
                                <div className={styles.apps}>
                                    {dataSet.map((app, index) => (
                                        <div
                                            className={`${styles.iconContainer} ${selectedApp === app.src ? styles.selectedApp : ""}`}
                                            onClick={() => handleAppSelect(app.src)}
                                            key={index}
                                        >
                                            <div className={styles.appButton}>
                                                <img src={app.src} alt={app.alt} />
                                            </div>
                                            <p>{app.alt}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopModal;
