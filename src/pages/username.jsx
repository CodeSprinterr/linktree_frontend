import styles from '../styles/login.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setuserName } from '../services'
import logo from '../assets/logo-group.svg'
import bussiness from '../assets/business.png';
import creative from '../assets/creative.png';
import books from '../assets/books.png';
import music from '../assets/music.png';
import fashion from '../assets/fashion.png';
import food from '../assets/food.png';
import gov from '../assets/gov.png';
import health from '../assets/health.png';
import heart from '../assets/heart.png';
import tech from '../assets/tech.png';
import travel from '../assets/travel.png';


const username = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const categories = [
    { name: "Business", icon: bussiness },
    { name: "Creative", icon: creative },
    { name: "Education", icon: books },
    { name: "Entertainment", icon: music },
    { name: "Fashion & Beauty", icon: fashion },
    { name: "Food & Beverage", icon: food },
    { name: "Government & Politics", icon: gov },
    { name: "Health & Wellness", icon: health },
    { name: "Non-Profit", icon: heart },
    { name: "Other", icon: heart },
    { name: "Tech", icon: tech },
    { name: "Travel & Tourism", icon: travel },
  ]

  const submitDetails = async (e) => {
    e.preventDefault()
    setError("");

    if (!username.trim() || !selectedCategory) {
      if (!username.trim()) {
        setError("Username is required.");
      } else {
        setError("Category is required")
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await setuserName({ username, category: selectedCategory });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        if (data.success) {
          navigate("/dashboard");
        }
        setError(data.message);
      }

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Spark Logo" style={{ width: "123px", height: "33px" }} />
        </div>
        <div className={styles.leftContainer}>
          <div className={styles.innerContainer}>
            <h1 style={{ fontSize: '40px', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.1' }}>Tell us about yourself</h1>
            <p style={{ fontSize: '16px', fontWeight: '400', lineHeight: '1.5', color: '#6E6E6E', marginTop: '10px' }}>For a personalized Spark experience</p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: "100%",
            }}>
              <input style={{
                padding: "15px",
                marginTop: "30px",
                borderRadius: "10px",
                backgroundColor: "#EFF0EC",
                border: "none",
                outline: "none",
                color: "#000000",
              }} type="text" placeholder="Tell us your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: "100%",
              marginTop: "30px"
            }}>
              <h4 style={{ fontWeight: '500' }}>Select one category that best describes your Linktree</h4>
              <div className={styles.categoryContainer}>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.selected : ''}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <img src={category.icon} alt={category.name} className={styles.categoryIcon} />
                    {category.name}
                  </button>
                ))}
              </div>

            </div>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            <button
              style={{
                marginTop: "20px",
                padding: "15px",
                width: "100%",
                borderRadius: "25px",
                backgroundColor: "#4DA263",
                border: "none",
                outline: "none",
                cursor: "pointer",
                opacity: 1,
                transition: "opacity 0.3s ease",
                color: "#FFFFFF"
              }}
              onClick={submitDetails}
            >
              {isLoading ? "Submitting..." : "Continue"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.imageContainer}></div>
      </div>
    </div>
  )
}

export default username