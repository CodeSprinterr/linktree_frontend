import { useState, useEffect, createContext, useMemo   } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../layout/sidebar';
import styles from '../styles/dashboard.module.css';
import { fetchUser, getUrls, getApperance } from '../services'
import { bufferToBase64 } from '../utils/imageutils';
import profile from '../assets/profile.png';
import Navbar from '../components/navbar';

export const UserContext = createContext(null);

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [urlData, setUrlData] = useState(null);
  const [apperanceData, setApperanceData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getUser();
    fetchUrls();
    fetchApperance();
  }, []);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/links");
    }
  }, [location.pathname, navigate]);

  const getUser = async () => {
    try {
      const response = await fetchUser(); 
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error(error); 
    }
  };

  const imageBase64 = useMemo(() => {
    return user?.image?.data
      ? `data:${user.image.contentType};base64,${bufferToBase64(user.image.data.data)}`
      : profile; 
  }, [user]);

  
  const fetchUrls = async () => {
    try {
      const response = await getUrls();
      if (response.ok) {
        const data = await response.json();
        setUrlData(data.links);
      }
    } catch (error) {
      console.error(error);
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
    <UserContext.Provider value={{ user, setUser, imageBase64, urlData, setUrlData, apperanceData, setApperanceData }}>
      <div className={styles.dashboard}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <Sidebar currentPath={location.pathname} user={user} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Dashboard;
