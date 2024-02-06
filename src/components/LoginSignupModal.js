import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import styles from "./LoginSignupModal.module.css";

const LoginSignupModal = ({ onClose }) => {
  return (
    <div className={styles.loginsignupmodal}>
      <div className={styles.header}>
        <div className={styles.headerChild} />
        <div className={styles.standardEngineering}>Standard Engineering</div>
      </div>
      <div className={styles.logIn}>Log in / Sign up</div>
      <div className={styles.loginwithphone}>
        <div className={styles.pleaseEnterYour}>
          Please enter your phone number :
        </div>
        <section className={styles.phonenumbersection}>
          <img className={styles.iranFlagIcon} alt="" src="/iranflag@2x.png" />
          <TextField
            className={styles.phonenumbersectionChild}
            color="warning"
            label="Phone"
            variant="outlined"
            type="tel"
            sx={{ "& .MuiInputBase-root": { height: "50px" }, width: "275px" }}
          />
        </section>
        <div className={styles.errorMassage}>
          <ul className={styles.errorMassage1}>
            <li>error massage</li>
          </ul>
        </div>
      </div>
      <button className={styles.logInWrapper}>
        <b className={styles.logIn1}>Log in</b>
      </button>
      <div className={styles.yourEntryMeansContainer}>
        <span>{`Your entry means acceptance of the `}</span>
        <span className={styles.terms}>terms</span>
        <span>{` and `}</span>
        <span className={styles.terms}>conditions of privacy</span>
        <span>.</span>
      </div>
      <div className={styles.anotherlogin}>
        <div className={styles.logindivaider}>
          <div className={styles.logindivaiderChild} />
          <div className={styles.logindivaiderItem} />
          <div className={styles.orLoginWith}>or login with</div>
        </div>
        <button className={styles.googleloginbutton}>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <b className={styles.signInWith}>Sign in with Google</b>
            <img className={styles.google1Icon} alt="" src="/google-1@2x.png" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
