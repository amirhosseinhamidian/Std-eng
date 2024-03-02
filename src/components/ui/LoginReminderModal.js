import React, { useEffect, useState } from 'react';
import {CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Styles from "./LoginReminderModal.module.css"

const LoginReminderModal = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(100);

  // Close the modal and redirect to login page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/loginpage');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        // Decrease progress by 20% every second (5 seconds total)
        return prevProgress - 20;
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={Styles.modalcontainer}>
      <div className={Styles.modalcontent}>
        <div className={Styles.progressbar}>
          <CircularProgress 
            variant="determinate"
            value={progress} // Set progress value dynamically
            size={80} // Adjust the size of the circular progress
            thickness={5} // Adjust the thickness of the circular progress
            aria-autocomplete='both'
         />
        </div>
        <p className={Styles.messagetext}>You need to log in to your user account to use this feature.</p>
      </div>
    </div>
  );
};

export default LoginReminderModal;