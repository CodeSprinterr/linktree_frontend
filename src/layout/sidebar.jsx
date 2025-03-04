import { Link, useNavigate} from 'react-router-dom';
import styles from '../styles/sidebar.module.css';
import logo from '../assets/dashboard_logo.svg';
import links from '../assets/links.svg';
import appearance from '../assets/apperance.svg';
import analytics from '../assets/analyatics.svg';
import settings from '../assets/setting.svg';
import { UserContext } from '../pages/dashboard';
import { useContext, useState } from 'react';
import logout from '../assets/logout.svg';


const Sidebar = ({ currentPath }) => {
    const { user, imageBase64 } = useContext(UserContext);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login"); 
    };
    const options = [
        { logo: links, name: 'Links', link: '/dashboard/links' },
        { logo: appearance, name: 'Appearance', link: '/dashboard/appearance' },
        { logo: analytics, name: 'Analytics', link: '/dashboard/analytics' },
        { logo: settings, name: 'Settings', link: '/dashboard/settings' }
    ];

    return (
        <div className={styles.sidebar}>
             <Link to="/" ><div className={styles.logoContainer}>
                
                    <img src={logo} alt="logo" className={styles.logo} />
                    <h2>Spark</h2>
                
            </div></Link>

            {/* Menu options */}
            <ul className={styles.menu}>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`${styles.option} ${currentPath === option.link ? styles.active : ''}`}
                    >
                        <Link to={option.link}>
                            <img src={option.logo} alt={option.name} className={styles.optionIcon} />
                            <span>{option.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={styles.profile} onClick={() => setShowLogout(!showLogout)}>
                <div><img src={imageBase64} alt="dp" className={styles.dp}/></div>
                
                {user ? (
                    <span>{user.firstName} {user.lastName}</span>
                ) : (
                    <span>Guest</span>
                )}

                {showLogout && (
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <img src={logout} alt="logout" />
                        <span>Sign out</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
