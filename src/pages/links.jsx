//links.jsx
import styles from '../styles/links.module.css';
import MobileView from '../components/MobileView';
import ToggleButtons from '../components/toggle';
import Heading from '../components/heading';
import add from '../assets/add.png';
import logoSm from '../assets/logo-sm.svg';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../pages/dashboard';
import { uplodeDP, removeDP } from '../services';
import Modal from '../components/shopModal';
import { getUrls, saveDataPage1 } from '../services'
import Toaster from '../components/toaster';

const predefinedColors = ["#2D241F", "#FFFFFF", "#000000"];
const Links = () => {
  const { user, setUser, imageBase64, urlData, setUrlData, apperanceData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [bio, setBio] = useState(user?.bio || 'Bio');
  const [color, setColor] = useState("#000000");
  const [bannerColor, setBannerColor] = useState("#342B26");
  const [linksData, setLinksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("link");

  const [bgColor, setBgColor] = useState("#000000");
  const [fontColor, setFontColor] = useState("#888888");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState("Stack");
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonColor, setSelectedButtonColor] = useState(null);
  const [selectedButtonFontColor, setSelectedButtonFontColor] = useState("#000000");

  const [toast, setToast] = useState({ message: "", type: "" })

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file)
    }
  };

  const uploadImage = async (file) => {
    try {
      if (!file) return;

      setIsLoading(true);

      const formData = new FormData();
      formData.append('image', file);

      const response = await uplodeDP(formData);
      if (response.ok) {
        setToast({ message: "Upload Sucess", type: "success" });
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setToast({ message: "Image upload failed", type: "error" });
        console.error('Image upload failed');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setToast({ message: "Something Went Wrong", type: "error" });
      setIsLoading(false);
    }
  };

  const removeImage = async () => {
    try {
      setIsRemoving(true);
      const response = await removeDP();

      if (response.ok) {
        setToast({ message: "Remove Sucess", type: "success" });
        const updatedUser = await response.json();
        setUser(updatedUser.user);
      }else{
        setToast({ message: "Image remove failed", type: "error" });
      }

      setIsRemoving(false);
    } catch (error) {
      console.log(error);
      setToast({ message: "Something Went Wrong", type: "error" });
      setIsRemoving(false);
    }
  };

  useEffect(() => {
    setBio(user?.bio || 'Bio');
    setBannerColor(user?.bannerColor || "#342B26");
  }, [user]);

  const handleBioChange = (event) => {
    const updatedBio = event.target.value;
    if (updatedBio.length >= 0 && updatedBio.length <= 80) {
      setBio(updatedBio);
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setBannerColor(newColor);
  };

  const handleUpdateLink = (linkData) => {
    setLinksData([linkData]);
  };

  const fetchUrls = async () => {
    try {
      const response = await getUrls();
      if (response.ok) {
        const data = await response.json();
        setUrlData(data.links);
        setUser(data.user)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      bio,
      bannerColor,
      links: linksData,
    };

    const response = await saveDataPage1(updatedData);
    if (response.ok) {
      setToast({ message: "saved", type: "success" });
      setLinksData([]);
      await fetchUrls();
    } else {
      setToast({ message: "Error saving data", type: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <Heading />
      {toast.message && <Toaster message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
                
      <div className={styles.content}>
        <div className={styles.contentDiv1}>
          <MobileView
            bgColor={bannerColor || user?.bannerColor}
            urlData={urlData}
            layout={selectedLayout || apperanceData?.selectedLayout}
            button={selectedButton || apperanceData?.selectedButton}
            buttonColor={selectedButtonColor || apperanceData?.selectedButtonColor}
            fontColor={selectedButtonFontColor || apperanceData?.selectedButtonFontColor}
            theme={selectedTheme || apperanceData?.selectedTheme} />
        </div>
        <div className={styles.contentDiv2}>
          <div className={styles.profileDiv}>
            <h4>Profile</h4>

            <div className={styles.profileSection}>

              <div className={styles.ImgDiv}>
                <div className={styles.img}>
                  <img
                    src={imageBase64}
                    alt="Profile"
                    className={styles.profileImage}
                    onError={(e) => e.target.src = profile}
                  />

                </div>
                <div className={styles.optionsDiv}>
                  <div className={styles.oD1}>
                    <label htmlFor="image-upload">
                      <span>{isLoading ? 'Uploading...' : 'Pick an image'}</span>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className={styles.oD2} onClick={removeImage}>{isRemoving ? 'Removing...' : 'Remove'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className={styles.title}>
                  <p>Profile title</p>
                  <span>@{user?.username}</span>
                </div>
                <div className={styles.bioBox}>
                  <p>Bio</p>
                  <textarea
                    value={bio}
                    onChange={handleBioChange}
                    className={styles.bioInput}
                    maxLength={80}
                  />
                </div>
                <div className={styles.bioCounter}>
                  <span>{bio.length} / 80</span>
                </div>

              </div>

            </div>

            <div className={styles.addLinksSection}>
              <div className={styles.linksOptions}>
                <ToggleButtons activeButton={activeButton} setActiveButton={setActiveButton} />
              </div>

              <div className={styles.uploadButton} onClick={openModal}>
                <img src={add} alt="add" />
                <label>Add</label>
              </div>


            </div>

            {/* Modal Component */}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              activeButton={activeButton}
              onUpdateLink={handleUpdateLink}
            />

            <div className={styles.bannerDiv}>
              <h4>Banner</h4>
              <div className={styles.bannerSection}>
                <div className={styles.bannerHero} style={{ backgroundColor: bannerColor }}>
                  <div className={styles.bannerImg}>
                    <img src={imageBase64} alt="img" />
                  </div>
                  <div className={styles.usernameDiv}>
                    <span id='username'>@{user?.username}</span>
                    <div className={styles.usernameUrl}>
                      <span id='usernameUrl'><img src={logoSm} alt="logo" /></span>
                      <span id='usernameUrl'>/{user?.username}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.colorPicker}>
                  <p>Custom Background Color</p>
                  <div className={styles.colorOptions}>
                    {predefinedColors.map((c) => (
                      <button
                        key={c}
                        className={styles.colorCircle}
                        style={{ backgroundColor: c, border: c === "#FFFFFF" ? "1px solid #ccc" : "none" }}
                        onClick={() => handleColorChange(c)}
                      ></button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'start', gap: '15px' }}>
                    <div className={styles.colorPreview} style={{ backgroundColor: color }}></div>
                    <input
                      type="text"
                      className={styles.colorInput}
                      value={color}
                      onChange={(e) => handleColorChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.saveButton}>
              <button onClick={handleSave}>Save</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
