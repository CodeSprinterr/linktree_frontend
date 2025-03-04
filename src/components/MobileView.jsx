import styles from '../styles/mobileView.module.css';
import shareButton from '../assets/share.svg';
import logo from '../assets/logo-black.png';
import { useState, useContext, useEffect } from 'react';
import ToggleButtons from '../components/toggle';
import MobileLinks from '../components/mobileLink';
import { UserContext } from '../pages/dashboard';
import Toaster from '../components/toaster';

const MobileView = ({ bgColor = '#342B26', urlData, layout = 'Stack', button = null, buttonColor = null, fontColor = null, theme = null }) => {
  const { user, imageBase64 } = useContext(UserContext);
  const [activeButton, setActiveButton] = useState("link");
  const [themeColor, setThemeColor] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const filteredLinks = urlData?.filter(link => link.activeButton === activeButton) || [];

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${user?.username || "user"}`;
    navigator.clipboard.writeText(profileUrl)
      .then(() => setToast({ message: "Copied!", type: "success" }))
      .catch(err => {
        console.error("Error copying link:", err);
        setToast({ message: "Failed to copy", type: "error" });
      });
  };

  useEffect(() => {
    setThemeColor(themeColor || '#F3F3F1');
  }, [theme]);

  return (
    <div className={styles.mobileContainer}>
      {toast.message && <Toaster message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
      <div className={styles.mobileView} style={{ backgroundColor : theme}}>
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
              filteredLinks.map((link) => <MobileLinks key={link._id} link={link} button={button} buttonColor={buttonColor} fontColor={fontColor} />)
            ) : (
              <MobileLinks link={null} button={button} buttonColor={buttonColor} fontColor={fontColor} />
            )}

            {!urlData?.length && <MobileLinks link={null} second={true} button={button} buttonColor={buttonColor} fontColor={fontColor} />}
          </div>
        )}
        {layout != "Stack" && (
          <div className={`${styles.maxHeight} ${layout === 'Grid' ? styles.grid : layout === 'Carousel' ? styles.carousel : ''}`}
            styles={{ backgroundColor: 'transparent' }}
          >
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => <MobileLinks key={link._id} link={link} button={button} buttonColor={buttonColor} fontColor={fontColor} />)
            ) : (
              <MobileLinks link={null} button={button} buttonColor={buttonColor} fontColor={fontColor} />
            )}

            {!urlData?.length && <MobileLinks link={null} second={true} button={button} buttonColor={buttonColor} fontColor={fontColor} />}
          </div>
        )}
        <div className={styles.getConnectedDiv}>
          <div className={styles.getConnectedSection}>
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

  )
}

export default MobileView