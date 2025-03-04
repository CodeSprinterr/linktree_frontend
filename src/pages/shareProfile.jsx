import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, updateClicks } from '../services';
import Toaster from '../components/toaster';
import profile from '../assets/profile.png';
import shareButton from '../assets/share.svg';
import ToggleButtons from '../components/toggle';
import MobileLinks from '../components/mobileLink';
import logo from '../assets/logo-black.png';
import styles from '../styles/mobileView.module.css';
import style1 from '../styles/shareProfile.module.css';
import { bufferToBase64 } from '../utils/imageutils';
const availableFonts = [
    { name: "DM Sans", style: { fontFamily: "'DM Sans', sans-serif" } },
    { name: "Roboto", style: { fontFamily: "'Roboto', sans-serif" } },
    { name: "Poppins", style: { fontFamily: "'Poppins', sans-serif" } },
    { name: "Lato", style: { fontFamily: "'Lato', sans-serif" } },
];

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [urlData, setUserData] = useState(null);
    const [bgColor, setBgColor] = useState('#342B26');
    const [activeButton, setActiveButton] = useState("link");
    const [toast, setToast] = useState({ message: "", type: "" });
    const [apperanceData, setApperanceData] = useState(null);
    const filteredLinks = urlData?.filter(link => link.activeButton === activeButton) || [];
    const [layout, setlayout] = useState("Stack");
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedButtonColor, setSelectedButtonColor] = useState(null);
    const [selectedButtonFontColor, setSelectedButtonFontColor] = useState(null);
    const [themeColor, setThemeColor] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, [username]);

    useEffect(() => {
        setlayout(apperanceData?.selectedLayout || layout);
        setSelectedButton(apperanceData?.selectedButton || selectedButton);
        setSelectedButtonColor(apperanceData?.selectedButtonColor || selectedButtonColor);
        setSelectedButtonFontColor(apperanceData?.selectedButtonFontColor || selectedButtonFontColor);
        setThemeColor(apperanceData?.selectedTheme || themeColor);

        console.log(layout, selectedButton, selectedButtonColor, selectedButtonFontColor, themeColor)
    }, [apperanceData]);

    
    const fetchUserData = async () => {
        try {
            const response = await getUser(username);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUser(data.user);
                setUserData(data.links);
                setBgColor(data.user.bannerColor)
                setApperanceData(data.appearance)
            } else {
                console.error("Error fetching user data:", response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleShareProfile = () => {
        const profileUrl = `${window.location.origin}/profile/${user?.username || "user"}`;
        navigator.clipboard.writeText(profileUrl)
            .then(() => setToast({ message: "Copied!", type: "success" }))
            .catch(err => {
                console.error("Error copying link:", err);
                setToast({ message: "Failed to copy", type: "error" });
            });
    };

    const handleShareApp = async () => {
        const profileUrl = `${window.location.origin}`;
        navigator.clipboard.writeText(profileUrl)
            .then(() => setToast({ message: "Copied!", type: "success" }))
            .catch(err => {
                console.error("Error copying link:", err);
                setToast({ message: "Failed to copy", type: "error" });
            });

        await updateClicks({
            username: user?.username,
            clickType: "CTA",
            buttonName: "Get Connected"
        });
    };

    const handleLinkClick = async (link) => {
        await updateClicks({
            username: user?.username,
            clickType: link.activeButton,
            buttonName: link.title
        });
    };

    const imageBase64 = useMemo(() => {
        return user?.image?.data
            ? `data:${user.image.contentType};base64,${bufferToBase64(user.image.data.data)}`
            : profile;
    }, [user]);

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className={style1.continer}>
            <div style={{ width: '360.96px', height: '94vh' }}>
                <div className={styles.mobileView + ' ' + style1.noBorder} style={{ backgroundColor : themeColor}}>
                    {toast.message && <Toaster message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
                    <div className={styles.mobileHeader} style={{ backgroundColor: bgColor }}>
                        <div className={styles.dpDiv}>
                            <img src={imageBase64} alt="img" />
                        </div>
                        <p>@{user?.username || "user"}</p>
                        <div className={styles.mobileShare} onClick={handleShareProfile}>
                            <img src={shareButton} alt="Share" className={styles.shareButton} />
                        </div>
                    </div>
                    <div className={styles.mobileToggle}>
                        <ToggleButtons firstButtonLabel="Link" secondButtonLabel="Shop" showImages={false} bgColor="#C9C9C9" activeButton={activeButton} setActiveButton={setActiveButton} />
                    </div>
                    {layout === "Stack" && (
                        <div className={`${styles.maxHeight} ${styles.mobileToggle}`}>
                            {filteredLinks.length > 0 ? (
                                filteredLinks.map((link) => <MobileLinks key={link._id} link={link} button={selectedButton} buttonColor={selectedButtonColor} fontColor={selectedButtonFontColor} onClick={() => handleLinkClick(link)}/>)
                            ) : (
                                <MobileLinks link={null} button={selectedButton} buttonColor={selectedButtonColor} fontColor={selectedButtonFontColor} />
                            )}

                            {!urlData?.length && <MobileLinks link={null} second={true} button={selectedButton} buttonColor={selectedButtonColor} fontColor={selectedButtonFontColor} />}
                        </div>
                    )}
                    {layout != "Stack" && (
                        <div className={`${styles.maxHeight} ${layout === 'Grid' ? styles.grid : layout === 'Carousel' ? styles.carousel : ''}`}
                            styles={{ backgroundColor: 'transparent' }}
                        >
                            {filteredLinks.length > 0 ? (
                                filteredLinks.map((link) => <MobileLinks key={link._id} link={link} button={selectedButton} buttonColor={selectedButtonColor} fontColor={selectedButtonFontColor} onClick={() => handleLinkClick(link)}/>)
                            ) : (
                                <MobileLinks link={null} button={selectedButton} buttonColor={selectedButtonColor} fontColor={selectedButtonFontColor} />
                            )}

                            {!urlData?.length && <MobileLinks link={null} second={true} button={selectedButton} buttonColor={selectedButtonColor} fontColor={selectedButtonFontColor} />}
                        </div>
                    )}
                    <div className={styles.getConnectedDiv}>
                        <div className={styles.getConnectedSection} onClick={handleShareApp}>
                            <label>Get Connected</label>
                        </div>
                    </div>
                    <div className={styles.footerImg}>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
