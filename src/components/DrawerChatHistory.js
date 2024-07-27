import { useEffect } from "react";
import styles from "./DrawerChatHistory.module.css";

const DrawerChatHistory = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className={styles.drawer} data-animate-on-scroll>
      <ol className={styles.homeParent}>
        <a className={styles.home} muted>
          Home
        </a>
        <b className={styles.search}>Search</b>
        <b className={styles.search}>Standards</b>
        <b className={styles.search}>About us</b>
        <b className={styles.search}>Profile</b>
      </ol>
    </div>
  );
};

export default DrawerChatHistory;
