import styles from "./LoginPage.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate  } from "react-router-dom";

const LoginPage = () => {
  const TIMER_CODE_DURATION = 10;

  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [phoenErrorMessage, setPhoneErrorMessage] = useState('');
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(true);
  const [showConfirmationCodeInput, setShowConfirmationCodeInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showCodeTimer, setShowCodeTimer] = useState(false);
  const [showAnotherCodeMessage, setShowAnotherCodeMessage] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_CODE_DURATION);
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState("")

  const timerIntervalRef = useRef(null);
  const navigate = useNavigate();

  const handlePhoneInputChange = (event) => {
    setPhoneInputValue(event.target.value);
    setPhoneErrorMessage('');
  };

  const handleConfirm = () => {
    if (phoneInputValue.startsWith('09') && phoneInputValue.length === 11) {
      // Valid 09-starting number
      setPhoneErrorMessage('')
      setShowPhoneNumberInput(false);
      setShowConfirmationCodeInput(true);
    } else if (phoneInputValue.startsWith('+98') && phoneInputValue.length === 13) {
      // Valid +98-starting number
      setPhoneErrorMessage('')
      setShowPhoneNumberInput(false);
      setShowConfirmationCodeInput(true);
    }  else {
      // Invalid number
      setPhoneErrorMessage('Invalid phone number');
    }
  };

  const getMaxInputLength = () => {
    if (phoneInputValue.startsWith('09')) {
      return 11;
    } else if (phoneInputValue.startsWith('+98')) {
      return 13;
    } else {
      return 11;
    }
  };

  useEffect(() => {
    if (showConfirmationCodeInput) {
      setShowCodeTimer(true)
      setShowAnotherCodeMessage(false)
      // Start the timer when confirmation code input is shown
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timerIntervalRef.current);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Clear timer interval if confirmation code input is hidden
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [showConfirmationCodeInput]);

  useEffect(() => {
    if (timeRemaining === 0) {
      clearInterval(timerIntervalRef.current);
      setShowCodeTimer(false);
      setShowAnotherCodeMessage(true);
    }
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const handleSendCodeAgainClick = () => {
    clearInterval(timerIntervalRef.current);
    setShowCodeTimer(true);
    setShowAnotherCodeMessage(false);
    setTimeRemaining(TIMER_CODE_DURATION);

    // Start the timer again
    timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
            if (prevTime === 0) {
                clearInterval(timerIntervalRef.current);
                setShowTimeoutMessage(true);
                return prevTime;
            }
            return prevTime - 1;
        });
    }, 1000);
  }

  const handleChangeConfirmationCode = (event) => {
    let code = event.target.value;
    // Ensure code contains only digits
    code = code.replace(/\D/g, '');
    // Ensure code does not exceed 5 digits
    code = code.slice(0, 5);
    setConfirmationCode(code);
    setCodeErrorMessage('');
  };

  const handleLoginWithCode = () => {
    if (confirmationCode.length !== 5) {
      setCodeErrorMessage('Verification code must be exactly 5 characters');
      return; // Exit function early if code is invalid
    }  
    navigate('./profilepage')
  }
  

  return (
    <div className={styles.loginpage}>
      <div className={styles.loginsignupmodal}>
        <div className={styles.header}>
          <div className={styles.headerChild} />
          <div className={styles.standardEngineering}>Standard Engineering</div>
        </div>
        {showConfirmationCodeInput && (<div className={styles.loginwithcode}>
          <div className={styles.pleaseEnterThe}>
            Please enter the SMS code :
          </div>
          {codeErrorMessage && <h6 className={styles.codeErrorMassage}>{codeErrorMessage}</h6>}
          <input className={styles.codeinput} 
                 type="number"
                 value={confirmationCode}
                 onChange={handleChangeConfirmationCode}
                 />
          {showCodeTimer && (
            <div className={styles.codetimer}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
          )}
          {showAnotherCodeMessage && (
            <div className={styles.tryagain}>
            <a className={styles.enterWithPassword}>Enter with password</a>
            <a className={styles.sendCodeAgain} onClick={handleSendCodeAgainClick}>Send Code Again</a>
          </div>
          )}
          <button className={styles.loginbutton} onClick={handleLoginWithCode}>
            <b className={styles.logIn}>Log in</b>
          </button>
        </div>
        )}
        {showPasswordInput && (
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
        )}
        
        {showPhoneNumberInput && (
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
              <input className={styles.phonenumbersectionChild} 
              type="tel" 
              value={phoneInputValue}
              onChange={handlePhoneInputChange}
              maxLength={getMaxInputLength()}
              />
            </section>
            {phoenErrorMessage && <h6 className={styles.errorMassage}>{phoenErrorMessage}</h6>}
          </div>
          <button className={styles.sendcodebutton} onClick={handleConfirm}>
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
        )}
      </div>
    </div>
  );
};

export default LoginPage;
