import React from 'react';
import Lottie from 'lottie-react';
import Styles from './LoadingModal.module.css'
import loadingAnimation from '../../assets/Animation - 1709044290746.json'; // Import your Lottie animation JSON file

const LoadingModal = () => {
  return (
    <div className={Styles.loadingModal}>
      <div className={Styles.modalContent}>
        <Lottie animationData={loadingAnimation} /> {/* Render the Lottie animation */}
      </div>
    </div>
  );
};

export default LoadingModal;