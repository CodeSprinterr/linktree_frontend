import styles from '../styles/mobileLink.module.css';
import yt from '../assets/yt.png';
import fb from '../assets/fb.png';
import { useState, useEffect } from 'react';
const MobileLink = ({ link = null, second = false, onClick = () => { }, button = null, buttonColor = null, fontColor = null }) => {
    const [bgColor, setBgColor] = useState(null);
    const [textColor, setTextColor] = useState(null);
    const handleClick = async (e) => {
        e.preventDefault();
        await onClick(link);
        window.open(link.url, "_blank");
    };
    useEffect(() => {
        setBgColor(buttonColor || '#C9C9C9');
        setTextColor(fontColor || '#000000');
    }, [buttonColor, fontColor]);
    
    if (!link || second) {
        return (
            <div className={styles.mobileLinkDiv} style={{backgroundColor : bgColor}}>
                <a href="#" className={styles.mobileLink}>
                    <div className={styles.mobileLinkImgDiv}>
                        <img src={second ? fb : yt} alt="Default" />
                    </div>
                    <p className={styles.mobielText}>{second ? 'Facebook Account' : 'Latest YouTube Video'}</p>
                </a>
            </div>
        );
    }

    return (
        <div className={styles[button] || styles.mobileLinkDiv} style={{backgroundColor : bgColor}}>
            <a href={link.url} onClick={handleClick} target="_blank" rel="noopener noreferrer" className={styles.mobileLink}>
                <div className={styles.mobileLinkImgDiv}>
                    <img src={link.applications?.[0] || yt} alt={link.title} className={styles.mobileLinkImg} />
                </div>
                <p className={styles.mobielText}  style={{color: textColor }}>{link.title}</p>
            </a>
        </div>
    );


}

export default MobileLink;
