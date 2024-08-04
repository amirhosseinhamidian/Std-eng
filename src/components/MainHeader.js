import { useState, useMemo, useCallback } from "react";
import Drawer from "./Drawer";
import { useNavigate  } from "react-router-dom";
import PortalDrawer from "./PortalDrawer";
import styles from "./MainHeader.module.css";
import {getAccessToken} from "../services/authService"

const MainHeader = ({ naveFlex, naveAlignSelf }) => {
  const navingStyle = useMemo(() => {
    return {
      flex: naveFlex,
      alignSelf: naveAlignSelf,
    };
  }, [naveFlex, naveAlignSelf]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);
  const navigate = useNavigate();
  const profileClickHandle = () => {
    if (getAccessToken()) {
      navigate('/profilepage')
    } else {
      navigate('/loginpage')
    }
  }

  const searchClickHandle = () => {
    navigate('/searchpage')
  }

  const homeClickHandle = () => {
    navigate('/')
  }

  return (
    <>
      <nav className={styles.naving} style={navingStyle}>
        <div className={styles.nave}>
          <div className={styles.logoName} onClick={homeClickHandle}>
            <img className={styles.logoNameChild} alt="" src="/logo.png" />
            <b className={styles.standardEngineering}>standard engineering</b>
          </div>
          <div className={styles.frameParent}>
            <button className={styles.priceWrapper} id="pirceBtn">
              <b className={styles.price}>Price</b>
            </button>
            <div className={styles.headerMenu}>
              <nav className={styles.links}>
                <a className={styles.home} onClick={homeClickHandle}>
                  Home
                </a>
                <b className={styles.home} onClick={searchClickHandle}>Search / Chat AI</b>
                <b className={styles.search}>Standards</b>
                <b className={styles.search}>About us</b>
                <a className={styles.home} onClick={profileClickHandle}>Profile</a>
              </nav>
              <button className={styles.image7} onClick={openDrawer} />
            </div>
          </div>
        </div>
      </nav>
      {isDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeDrawer}
        >
          <Drawer onClose={closeDrawer} />
        </PortalDrawer>
      )}
    </>
  );
};

export default MainHeader;
