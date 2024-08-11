import styles from "./LoginPage.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginRequest, useVerifyRequest } from "../services/apiService";
import LoadingModal from "../components/ui/LoadingModal";

const LoginPage = () => {
  const TIMER_CODE_DURATION = 120; // based on seconds

  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [phoenErrorMessage, setPhoneErrorMessage] = useState('');
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(true);
  const [showConfirmationCodeInput, setShowConfirmationCodeInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showCodeTimer, setShowCodeTimer] = useState(false);
  const [showAnotherCodeMessage, setShowAnotherCodeMessage] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_CODE_DURATION);
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginResponse, setLoginResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const timerIntervalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { afterLoginPath } = location.state || {};

  const loginRequest = useLoginRequest();
  const verifyRequest = useVerifyRequest();

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("after:    ",afterLoginPath)
    navigate(afterLoginPath.afterLoginPath, { replace: true });
  };

  const handlePhoneInputChange = (event) => {
    setPhoneInputValue(event.target.value);
    setPhoneErrorMessage('');
  };

  const handleConfirm = async () => {
    if ((phoneInputValue.startsWith('09') && phoneInputValue.length === 11) ||
        (phoneInputValue.startsWith('98') && phoneInputValue.length === 12) ||
        (phoneInputValue.startsWith('+98') && phoneInputValue.length === 13)) {
      
      setPhoneErrorMessage('');
      setShowPhoneNumberInput(false);
      setShowConfirmationCodeInput(true);

      let formattedPhone = '';
      if (phoneInputValue.startsWith('09')) {
        formattedPhone = '98' + phoneInputValue.slice(1);
      } else if (phoneInputValue.startsWith('+98')) {
        formattedPhone = phoneInputValue.slice(1);
      } else {
        formattedPhone = phoneInputValue;
      }

      try {
        const data = await loginRequest.mutateAsync(formattedPhone);
        setLoginResponse(data);
      } catch (error) {
        console.error('Error Login:', error);
      }
    } else {
      setPhoneErrorMessage('Invalid phone number');
    }
  };

  const getMaxInputLength = () => {
    if (phoneInputValue.startsWith('09')) {
      return 11;
    } else if (phoneInputValue.startsWith('98')) {
      return 12;
    } else if (phoneInputValue.startsWith('+98')) {
      return 13;
    } else {
      return 11;
    }
  };

  useEffect(() => {
    if (showConfirmationCodeInput) {
      setShowCodeTimer(true);
      setShowAnotherCodeMessage(false);
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
    code = code.replace(/\D/g, '');
    code = code.slice(0, 5);
    setConfirmationCode(code);
    setCodeErrorMessage('');
  };

  const handleLoginWithCode = async () => {
    if (confirmationCode.length !== 5) {
      setCodeErrorMessage('Verification code must be exactly 5 characters');
      return;
    }
    try {
      setIsLoading(true);
      const data = await verifyRequest.mutateAsync({ hash: loginResponse.verification.hash, code: confirmationCode });
      setIsLoading(false);
      handleLogin();
    } catch (error) {
      setIsLoading(false);
      console.error("Code Response Error:", error);
    }
  }

  const handleConfirmCodeInputKeydown = (event) => {
    // confirm code with press enter
    if(event.which === 13) {
      handleLoginWithCode()
    }
  }

  // Remove the conditional return to avoid changing hooks order
  return (
    <div className={styles.loginpage}>
      <div className={styles.loginsignupmodal}>
        <div className={styles.header}>
          <div className={styles.headerChild} />
          <div className={styles.standardEngineering}>Standard Engineering</div>
        </div>
        {isLoggedIn ? (
          <LoadingModal /> // Show loading modal or any other component while logging in
        ) : (
          <>
            {showConfirmationCodeInput && (
              <div className={styles.loginwithcode}>
                <div className={styles.confirmationCode}>
                  {isLoading && <LoadingModal />}
                  <div className={styles.pleaseEnterThe}>
                    Please enter the SMS code :
                  </div>
                </div>
                {codeErrorMessage && <h6 className={styles.codeErrorMassage}>{codeErrorMessage}</h6>}
                <input className={styles.codeinput}
                       type="number"
                       value={confirmationCode}
                       onChange={handleChangeConfirmationCode}
                       autoFocus
                       onKeyDown={handleConfirmCodeInputKeydown}
                />
                {showCodeTimer && (
                  <div className={styles.codetimer}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                )}
                {showAnotherCodeMessage && (
                  <div className={styles.tryagain}>
                    <a className={styles.sendCodeAgain} onClick={handleSendCodeAgainClick}>Send Code Again</a>
                  </div>
                )}
                <button className={styles.sendcodebutton} onClick={handleLoginWithCode}>
                  <b className={styles.logIn}>Login</b>
                </button>
              </div>
            )}
            {showPasswordInput && (
              <div className={styles.loginwithpassword}>
                <div className={styles.pleaseEnterYour}>
                  Please enter your Password :
                </div>
                <input className={styles.codeinput} type="password" autoFocus />
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
                           autoFocus
                           onKeyDown={(event) => event.key === 'Enter' && handleConfirm()}
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
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
