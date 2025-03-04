import { Link } from "react-router-dom";
import styles from '../styles/landingPage.module.css'
import largeLogo from '../assets/landing_page_logo.png'
import logo from '../assets/logo.svg'
import hemburger from '../assets/hemburger.svg'
import anlytics from '../assets/anlytics1.png'
import hero2 from '../assets/hero2.svg'
import media from '../assets/media.svg'
import flower from '../assets/flower.svg'

import ServiceGrid from '../components/services'
import Footer from '../components/footer'

const landingPage = () => {

  const testimonials = [
    {
      id: 1,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "gray",
    },
    {
      id: 2,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "white",
    },
    {
      id: 3,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "white",
    },
    {
      id: 4,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "gray",
    },
  ]
  return (
    <>
      <div className={styles.outerDiv}>

        <div className={styles.outerDiv1}>
          <div className={styles.headerDiv}>
            <div className={styles.imgDiv}>
              <img src={largeLogo} alt="logo" border="0" className={styles.img} />
              <img src={logo} alt="logo" className={styles.mobileLogo} />
            </div>
            <Link to="/register">
              <button className={styles.signUpButton}>Sign up free</button>
            </Link>
            <img src={hemburger} alt="hemburger" className={styles.mobileLogo} />
          </div>
        </div>

        <div className={styles.heroSection}>
          <div className={styles.textContianer}>
            <h3 className={styles.heroText}>
              The easiest place to update and share your Connection
            </h3>
            <div style={{ marginRight: '145px', marginTop: '20px' }}>
              <p style={{ fontSize: '20px', fontWeight: '500', lineHeight: '30px' }}>Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!</p>
            </div>
            <button className={styles.signUpButton} style={{ marginTop: '30px' }}>Get your free Spark</button>

          </div>
          <div className={styles.imageContianer}>
            <img src={anlytics} alt="anlytics" className={styles.heroImage} />
          </div>
        </div>

        <div className={styles.heroSection2 + " " + styles.outerDiv1}>
          <div className={styles.imageCont}>
            <div style={{ padding: '40px' }}>
              <img src={hero2} alt="cards" className={styles.cardsImg} />
            </div>
            <div className={styles.hero2Text}>
              Sell products and collect payments.Its monetization made simple.
            </div>
          </div>
          <div className={styles.textCont}>
            <h4>Analyze your audience and keep your followers engaged</h4>
            <p>Track your engagement over time, monitor revenue and learn whats converting your audience. Make informed udpated on the fly to keep them coming back. </p>
          </div>
        </div>

        <div className={styles.heroSection2 + " " + styles.outerDiv1}>

          <div className={styles.textCont}>
            <h4>Share limitless content in limitless ways</h4>
            <p style={{ lineHeight: '30px' }}>Connect your content in all its form and help followers find more of what they're looing for. Your TikToks, Tweet, YouTube videos, music, artices, recipes, podcasts and more...It all comes together in one powerful place</p>
          </div>
          <div className={styles.imageCont} style={{ backgroundColor: '#C6C6C6' }}>
            <div className={styles.socialCard}>
              <img src={media} alt="cards" />
            </div>
            <div className={styles.hero2Text} style={{ color: '#FFFFFF' }}>
              Share your content in limitless ways on your Spark
            </div>
          </div>
        </div>

        <div className={styles.outerDiv1 + " " + styles.customerDiv}>
          <div className={styles.customer1}>
            <h3>Here's what our <span style={{ color: '#1DA35E' }}>customer</span> has to says</h3>
            <button>Read Customer Stories</button>
          </div>
          <div className={styles.customer2}>
            <img src={flower} alt="icon" />
            <p> [short description goes in here] loerm ipsum is a placehodler text to demonstrate</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#F9F9F9" }}>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`${styles.testimonialCard} ${styles[testimonial.variant]}`}>
                <h2>{testimonial.title}</h2>
                <p>{testimonial.content}</p>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}></div>
                  <div className={styles.authorDetails}>
                    <div className={styles.authorName}>{testimonial.author}</div>
                    <div className={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.outerDiv1}>
          <ServiceGrid />
        </div>
        <div style={{ padding : '5px 60px', backgroundColor: '#F9F9F9' }}>
          <Footer styles={{ paddingBottom: '0px;'}}/>
        </div>
  

      </div>
    </>
  )
}

export default landingPage