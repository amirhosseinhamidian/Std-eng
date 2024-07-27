import React, { useState } from 'react'
import styles from './Home.module.css'
import Header from '../components/Header'
import { useNavigate  } from "react-router-dom";
import { isUserLogin } from '../services/authService';
import LoginReminderModal from '../components/ui/LoginReminderModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [goToLoginPage, setGoToLoginPage] = useState(false);
  const searchClickHandle = () => {
    navigate('/searchpage')
  }
  const chatClickHandle = () => {
    if (isUserLogin()) {
      navigate('/chatbotpage')
    } else {
      setGoToLoginPage(true)
    }
  }
  return (
    <div>
      {goToLoginPage && <LoginReminderModal />}
      <Header />
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Welcome To<br/>STANDARD ENGINEERING</h1> 
          <p>Explore, Search, and Chat with GPT-4o Your AI Companion for Documents and Engineering Standards</p>
          <div className={styles.buttons}>
            <button className={styles.startChatBtn} onClick={chatClickHandle}>Start Chat</button>
            <button className={styles.searchBtn} onClick={searchClickHandle}>Search</button>
          </div>       
        </div>
        <div className={styles.bgHolder}>
          <img src='/hero.svg' alt='Engineering Illustration'/>
        </div>
      </section>
    </div>
  )
}

export default HomePage
