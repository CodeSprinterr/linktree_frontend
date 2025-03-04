import { useState, useRef, useEffect } from 'react';
import styles from '../styles/toggleButtons.module.css';

import shopBlack from '../assets/blackshop.svg'; // Default black logo
import shopWhite from '../assets/whiteShop.png'; // White logo for active state

const ToggleButtons = ({ 
    firstButtonLabel = "Add Link", 
    secondButtonLabel = "Add Shop", 
    showImages = true,  
    bgColor = "", 
    activeButton = 'link', 
    setActiveButton 
}) => {
    const linkRef = useRef(null);
    const shopRef = useRef(null);
    const [sliderStyle, setSliderStyle] = useState({ opacity: 0 });

    useEffect(() => {
        if (linkRef.current && shopRef.current) {
            updateSliderStyle(activeButton);
        }
    }, [activeButton]);

    const handleClick = (button) => {
        setActiveButton(button);
    };

    const updateSliderStyle = (button) => {
        const activeRef = button === 'link' ? linkRef.current : shopRef.current;
        if (activeRef) {
            setSliderStyle({
                width: `${activeRef.offsetWidth}px`,
                left: `${activeRef.offsetLeft}px`,
                opacity: 1,
                height: '100%', 
            });
        }
    };

    return (
        <div className={styles.toggleContainer} style={{ backgroundColor: bgColor }}>
            <button
                ref={linkRef}
                className={`${styles.toggleButton} ${activeButton === 'link' ? styles.active : ''}`}
                style={showImages ? { fontSize: '14px' } : { fontSize: '30px' }}
                onClick={() => handleClick('link')}
            >
                {showImages && (
                    <span>
                        <img src={activeButton === 'link' ? shopWhite : shopBlack} alt="Link" />
                    </span>
                )}
                <label>{firstButtonLabel}</label>
            </button>
            <button
                ref={shopRef}
                className={`${styles.toggleButton} ${activeButton === 'shop' ? styles.active : ''}`}
                style={showImages ? { fontSize: '14px' } : { fontSize: '30px' }}
                onClick={() => handleClick('shop')}
            >
                {showImages && (
                    <span>
                        <img src={activeButton === 'shop' ? shopWhite : shopBlack} alt="Shop" />
                    </span>
                )}
                <label>{secondButtonLabel}</label>
            </button>

            <div className={styles.slider} style={sliderStyle} />
        </div>
    );
};

export default ToggleButtons;
