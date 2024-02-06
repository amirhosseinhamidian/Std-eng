import styles from "./LoginPage.module.css";

const LoginPage = ({ onClose }) => {
  return (
    <div className={styles.loginpage}>
      <div className={styles.loginsignupmodal}>
        <div className={styles.header}>
          <div className={styles.headerChild} />
          <div className={styles.standardEngineering}>Standard Engineering</div>
        </div>
        <div className={styles.loginwithcode}>
          <div className={styles.pleaseEnterThe}>
            Please enter the SMS code :
          </div>
          <input className={styles.codeinput} type="number" />
          <div className={styles.codetimer}>2:00</div>
          <div className={styles.tryagain}>
            <div className={styles.enterWithPassword}>Enter with password</div>
            <div className={styles.sendCodeAgain}>Send Code Again</div>
          </div>
          <button className={styles.loginbutton}>
            <b className={styles.logIn}>Log in</b>
          </button>
        </div>
        <div className={styles.loginwithpassword}>
          <div className={styles.pleaseEnterYour}>
            Please enter your Password :
          </div>
          <input className={styles.codeinput} type="password" />
          <button className={styles.loginbutton1}>
            <b className={styles.logIn}>Log in</b>
          </button>
          <div className={styles.anotherway}>
            <div className={styles.forgetYourPassword}>
              Forget your password
            </div>
            <div className={styles.loginWithSms}>Login with SMS</div>
          </div>
        </div>
        <div className={styles.loginmethod}>
          <div className={styles.logIn2}>Log in / Sign up</div>
          <div className={styles.loginwithphone}>
            <div className={styles.pleaseEnterYour1}>
              Please enter your phone number :
            </div>
            <section className={styles.phonenumbersection}>
              <img
                className={styles.iranFlagIcon}
                alt=""
                src="/iranflag@2x.png"
              />
              <input className={styles.phonenumbersectionChild} type="tel" />
            </section>
            <h6 className={styles.errorMassage}>error massage</h6>
          </div>
          <button className={styles.sendcodebutton}>
            <b className={styles.logIn}>Confirm</b>
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
                <img
                  className={styles.google1Icon}
                  alt=""
                  src="/google-1@2x.png"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
