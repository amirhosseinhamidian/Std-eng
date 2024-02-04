import MainHeader from "../components/MainHeader";
import Information from "../components/Information";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.profilepage}>
      <MainHeader />
      <div className={styles.profilepageChild} />
      <section className={styles.profilepageInner}>
        <div className={styles.frameParent}>
          <div className={styles.informationParent}>
            <button className={styles.information} id="info_btn">
              Information
            </button>
            <button className={styles.subscriptionPlan} id="sub_btn">
              Subscription Plan
            </button>
            <button className={styles.subscriptionPlan} id="search_his_btn">
              Search History
            </button>
            <button className={styles.subscriptionPlan} id="chat_his_btn">
              Chat History
            </button>
          </div>
          <button className={styles.subscriptionPlan} id="log_out_btn">
            Log Out
          </button>
        </div>
      </section>
      <Information />
    </div>
  );
};

export default ProfilePage;
