import linkstyles from '../styles/links.module.css';
import styles from '../styles/apperance.module.css';
import MobileView from '../components/MobileView';
import { useContext, useEffect, useState } from 'react';
import { updateApperance  } from '../services'
import { UserContext } from '../pages/dashboard';
import Heading from '../components/heading';
import { getApperance  } from '../services'
import Toaster from '../components/toaster';

const availableFonts = [
  { name: "DM Sans", style: { fontFamily: "'DM Sans', sans-serif" } },
  { name: "Roboto", style: { fontFamily: "'Roboto', sans-serif" } },
  { name: "Poppins", style: { fontFamily: "'Poppins', sans-serif" } },
  { name: "Lato", style: { fontFamily: "'Lato', sans-serif" } },
];
const themes = [
  { name: "Air Snow", color: "#ffffff", textColor: "#000000" },
  { name: "Air Grey", color: "#d3d3d3", textColor: "#ffffff" },
  { name: "Air Smoke", color: "#3a3a3a", textColor: "#ffffff" },
  { name: "Air Black", color: "#000000", textColor: "#3a3a3a" },
  { name: "Mineral Blue", color: "#d6f1ff", textColor: "#a1c4d6" },
  { name: "Mineral Green", color: "#e6f8e0", textColor: "#c1deb5" },
  { name: "Mineral Orange", color: "#fdeedf", textColor: "#e0bfa0" },
];

const appearance = () => {
  const { user, urlData, apperanceData, setApperanceData } = useContext(UserContext);
  const [bgColor, setBgColor] = useState("#000000");
  const [fontColor, setFontColor] = useState("#888888");
  const [color, setColor] = useState("#ffffff");
  const [selectedFont, setSelectedFont] = useState(availableFonts[0]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState("Stack");
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonColor, setSelectedButtonColor] = useState(null);
  const [selectedButtonFontColor, setSelectedButtonFontColor] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "" })

  const handleFontSelect = (font) => {
    setSelectedFont(font);
  };
  
  const handleBGColorChange = (newColor) => {
    setBgColor(newColor);
    setSelectedButtonColor(newColor)
  };
  const handleFontColorChange = (newColor) => {
    setFontColor(newColor);
    setSelectedButtonFontColor(newColor);
  };
  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
  };

  const handleButtonChange = (button) => {
    setSelectedButton(button);
  };

  
  const handleSave = async () => {
    const appearanceData = {
      bgColor: bgColor,
      fontColor: fontColor,
      color: color,
      selectedFont: selectedFont.name,
      selectedTheme: selectedTheme,
      selectedLayout: selectedLayout,
      selectedButton: selectedButton,
      selectedButtonColor: selectedButtonColor,
      selectedButtonFontColor: selectedButtonFontColor,
      urlData: urlData,
    };
    try {
      const response = await updateApperance(appearanceData);
      if (response.ok) {
        setToast({ message: "Upload Sucess", type: "success" });
        await fetchApperance();
      } else {
        setToast({ message: "Image upload failed", type: "error" });
      }
    } catch (error) {
      setToast({ message: error , type: "error" });
      console.error('Error:', error);
    }
  };

  const fetchApperance = async () => {
    try {
      const response = await getApperance(); 
      if (response.ok) {
        const data = await response.json();
        setApperanceData(data.appearance);
      }
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className={linkstyles.container}>
      <Heading />
      {toast.message && <Toaster message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
                
      <div className={styles.content}>
        <div className={styles.contentDiv1}>
          <MobileView 
            bgColor={user?.bannerColor }
            urlData={urlData} 
            layout={selectedLayout || apperanceData?.selectedLayout } 
            button={selectedButton || apperanceData?.selectedButton } 
            buttonColor={selectedButtonColor || apperanceData?.selectedButtonColor} 
            fontColor={selectedButtonFontColor || apperanceData?.selectedButtonFontColor} 
            theme={selectedTheme || apperanceData?.selectedTheme }/>
        </div>
        <div className={styles.contentDiv2}>
          <div className={styles.profileDiv}>
            <h4>Layout</h4>

            <div className={styles.layoutSection}>
              <div className={styles.layoutSections} onClick={() => handleLayoutChange("Stack")}>
                <div className={styles.stack}>
                  <p className={styles.stackStrip}></p>
                  <p className={styles.stackStrip}></p>
                  <p className={styles.stackStrip}></p>
                </div>
                <p>Stack</p>
              </div>
              <div className={styles.layoutSections}  onClick={() => handleLayoutChange("Grid")}>
                <div className={styles.grid}>
                  <div>
                    <div className={styles.gridBox}></div>
                    <div className={styles.gridBox}></div>
                    <div className={styles.gridBox}></div>
                    <div className={styles.gridBox}></div>
                  </div>
                </div>
                <p>Grid</p>
              </div>
              <div className={styles.layoutSections} onClick={() => handleLayoutChange("Carousel")}>
                <div className={styles.carousel}>
                  <div className={styles.stripContainer}>
                    <div className={styles.stripLarge}></div>
                    <div className={styles.stripSmall}></div>
                  </div>
                </div>
                <p>Carousel</p>
              </div>
            </div>
          </div>

          <div className={styles.profileDiv}>
            <h4>Button</h4>

            <div className={styles.buttonsdiv}>
              <div className={styles.buttonsSection}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '10px' }}>
                  <h3>Fill</h3>
                  <div className={styles.buttonFill} >
                    <button className={styles.fillButton} onClick={() => handleButtonChange("fillButton1")}></button>
                    <button className={styles.fillButton + ' ' + styles.br} onClick={() => handleButtonChange("fillButton2")}></button>
                    <div className={styles.fillButton3 + ' ' + styles.br2} onClick={() => handleButtonChange("fillButton3")}>
                      <button></button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '10px' }}>
                  <h3>Outline</h3>
                  <div className={styles.buttonOutline}>
                    <button className={styles.outlineButton} onClick={() => handleButtonChange("outlineButton1")}></button>
                    <button className={styles.outlineButton + ' ' + styles.br} onClick={() => handleButtonChange("outlineButton2")}></button>
                    <button className={styles.outlineButton + ' ' + styles.br2} onClick={() => handleButtonChange("outlineButton3")}></button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '10px' }}>
                  <h3>Hard Shadow</h3>
                  <div className={styles.buttonHardShadow}>
                    <div className={styles.hardShadowContainer}>
                      <div className={styles.hardShadowbox}></div>
                      <div className={styles.hardShadowboxOverlay}></div>
                    </div>
                    <div className={styles.hardShadowContainer}>
                      <div className={styles.hardShadowbox + ' ' + styles.br}></div>
                      <div className={styles.hardShadowboxOverlay + ' ' + styles.br}></div>
                    </div>
                    <div className={styles.hardShadowContainer}>
                      <div className={styles.hardShadowbox + ' ' + styles.br2}></div>
                      <div className={styles.hardShadowboxOverlay + ' ' + styles.br2}></div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '10px' }}>
                  <h3>Soft Shadow</h3>
                  <div className={styles.buttonSoftShadow}>
                    <div className={styles.softShadowBox} onClick={() => handleButtonChange("softShadowBox1")}></div>
                    <div className={styles.softShadowBox + ' ' + styles.br} onClick={() => handleButtonChange("softShadowBox2")}></div>
                    <div className={styles.softShadowBox + ' ' + styles.br2} onClick={() => handleButtonChange("softShadowBox3")}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '10px' }}>
                  <h3 style={{ fontWeight: '700' }}>Button Color</h3>
                  <div style={{ display: 'flex', justifyContent: 'start', gap: '15px', borderRadius: '10px' }}>
                    <div className={linkstyles.colorPreview} style={{ backgroundColor: bgColor }}></div>
                    <div className={styles.colorInput}>
                      <label>Button Color</label>
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => handleBGColorChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '10px' }}>
                  <h3 style={{ fontWeight: '700' }}>Button font Color</h3>
                  <div style={{ display: 'flex', justifyContent: 'start', gap: '15px', borderRadius: '10px' }}>
                    <div className={linkstyles.colorPreview} style={{ backgroundColor: fontColor }}></div>
                    <div className={styles.colorInput}>
                      <label>Button font Color</label>
                      <input
                        type="text"
                        value={fontColor}
                        onChange={(e) => handleFontColorChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className={styles.fontDiv}>
            <h4>Fonts</h4>

            <div className={styles.fontsDiv}>
              <div className={styles.buttonsSection}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h3 style={{ fontWeight: '700' }}>Font</h3>

                  <div className={styles.selectedFont} style={{ fontFamily: selectedFont.style.fontFamily }}>
                    <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: selectedFont.style.fontFamily }}>Aa</span>
                      {selectedFont.name}
                    </span>
                  </div>


                  {/* Font Selection Grid */}
                  <div className={styles.fontSection}>
                    {availableFonts.map((font, index) => (
                      <div
                        key={index}
                        className={styles.fontOption}
                        style={{
                          ...font.style,
                          border: font.name === selectedFont.name ? "2px solid black" : "1px solid #ddd",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleFontSelect(font)}
                      >
                        Aa
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', gap: '2px' }}>
                  <h3 style={{ fontWeight: '700' }}>Color</h3>
                  <div style={{ display: 'flex', justifyContent: 'start', gap: '15px', borderRadius: '10px' }}>
                    <div className={linkstyles.colorPreview} style={{ backgroundColor: color }}></div>
                    <div className={styles.colorInput}>
                      <label>Color</label>
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.theamDiv}>
            <h4>Themes</h4>
            <div className={styles.themeGrid}>
              {themes.map((theme, index) => (
                <div
                  key={index}
                  className={`${styles.themeContainer} ${selectedTheme === theme.name ? styles.selectedTheme : ""}`}
                  onClick={() => setSelectedTheme(theme.color)}
                >
                  <div
                    className={styles.themeCard}
                    style={{ backgroundColor: theme.color, color: theme.textColor, border: selectedTheme === theme.name ? "2px solid #29A263" : "0.5px solid #FAFAF9" }}
                  >
                    <div className={styles.themeBars}>
                      <div className={styles.bar}></div>
                      <div className={styles.bar}></div>
                      <div className={styles.bar}></div>
                    </div>
                  </div>
                  <p>{theme.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.saveButton}>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default appearance