import { useState, useMemo, useCallback } from "react";
import Drawer from "./Drawer";
import PortalDrawer from "./PortalDrawer";
import styles from "./MainHeader.module.css";

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

  return (
    <>
      <nav className={styles.naving} style={navingStyle}>
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
                <b className={styles.search}>Profile</b>
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
