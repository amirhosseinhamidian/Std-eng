import { useState, useCallback } from "react";
import { useNavigate  } from "react-router-dom";
import Drawer from "./Drawer";
import PortalDrawer from "./PortalDrawer";
import styles from "./Header.module.css";
import {getAccessToken} from "../services/authService"

const Header = () => {
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
      navigate('./profilepage')
    } else {
      navigate('./loginpage')
    }
  }

  return (
    <>
      <div className={styles.naving}>
        <div className={styles.nave}>
          <div className={styles.logoName}>
            <img className={styles.logoNameChild} alt="" src="/ellipse-1.svg" />
            <b className={styles.standardEngineering}>standard engineering</b>
          </div>
          <div className={styles.frameParent}>
            <button className={styles.priceWrapper} id="pirceBtn">
              <b className={styles.price}>Price</b>
            </button>
            <div className={styles.headerMenu}>
              <nav className={styles.links}>
                <a className={styles.home} muted>
                  Home
                </a>
                <b className={styles.search}>Search</b>
                <b className={styles.search}>Standards</b>
                <b className={styles.search}>About us</b>
                <a className={styles.home} onClick={profileClickHandle}>Profile</a>
              </nav>
              <button className={styles.image7} onClick={openDrawer} />
            </div>
          </div>
        </div>
      </div>
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

export default Header;
