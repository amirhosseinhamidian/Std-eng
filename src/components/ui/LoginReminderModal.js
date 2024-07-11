import React, { useEffect, useState } from 'react';
import {CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Styles from "./LoginReminderModal.module.css"

const LoginReminderModal = (afterLoginPath) => {
  const [countdownTimer, setCountdownTimer] = useState(5)
  const navigate = useNavigate();
  const [progress, setProgress] = useState(100);

  // Close the modal and redirect to login page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/loginpage', { state: { afterLoginPath: afterLoginPath } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (countdownTimer > 0) {
      const timer = setInterval(() => {
        setCountdownTimer(prevTime => prevTime - 1);
        setProgress((prevProgress) => prevProgress - 20); // Decrease by 20 for each second (100/5)
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }
  }, [countdownTimer]);

  return (
    <div className={Styles.modalcontainer}>
      <div className={Styles.modalcontent}>
        <div className={Styles.progressbar}>
          <CircularProgress 
            className={Styles.circularProgress}
            variant="determinate"
            value={progress} // Set progress value dynamically
            size={80} // Adjust the size of the circular progress
            thickness={5} // Adjust the thickness of the circular progress
            
         />
        <h3 className={Styles.timer}>{countdownTimer}</h3>
        </div>
        <b className={Styles.loginRequired}>Login required</b>
        <p className={Styles.messagetext}>You will be automatically redirected to the login page.</p>
        {/* <button className={Styles.loginBtn}>
          <p className={Styles.loginBtnText}>Login/Signup</p>
        </button> */}
      </div>
    </div>
  );
};

export default LoginReminderModal;