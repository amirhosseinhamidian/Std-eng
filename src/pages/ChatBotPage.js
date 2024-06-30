import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styles from "./ChatBotPage.module.css"
import Header from "../components/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const ChatBotPage = () => {
    const { prompt, setPrompt, messages, setMessages, hasSentFirstMessage, setHasSentFirstMessage } = useChat();
    const textbox = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const inputText = queryParams.get('query');

    const handleChatWithPdfClick = (botMessage, userQuestion) => {
        navigate("./standarddetailpage", {
            state: { botMessage, userQuestion }
        })
      }

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
      }, [messages]);

    function adjustHeight() {
        textbox.current.style.height = "inherit";
        textbox.current.style.height = `${textbox.current.scrollHeight}px`;
      }
    
    useLayoutEffect(adjustHeight, []);
    
    function handleKeyDown(e) {
        adjustHeight();
    }

    const generateRandomTitle = () => {
        const words = [
            "The", "Quick", "Brown", "Fox", "Jumps", "Over", "The", "Lazy", "Dog",
            "Lorem", "Ipsum", "Dolor", "Sit", "Amet", "Consectetur", "Adipiscing", "Elit"
        ];
    
        let title = "";
        for (let i = 0; i < 65; i++) {
            title += words[Math.floor(Math.random() * words.length)] + " ";
        }
        return title.trim(); // Trim to remove extra space at the end
    };
    
    const generatePublisherAbbreviation = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let abbreviation = "";
        for (let i = 0; i < 4; i++) {
            abbreviation += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return abbreviation;
    };
    

    const sendMessage = (text) => {
        const newMessages = [...messages, { text , role: 'user' }];
        setMessages(newMessages);
        setPrompt('');
    
        // Simulate bot reply after 1 second
        setTimeout(() => {
          const title = generateRandomTitle();
          const publisher = generatePublisherAbbreviation();
          const botReply = 'This is a mock response from the bot.';
          const newBotMessages = [...newMessages, { text: botReply, role: 'bot' , title: title, publisher:publisher}];
          setMessages(newBotMessages);
        }, 500);
    };

    useEffect(() => {
        
        if (inputText && !hasSentFirstMessage) {
          setPrompt(inputText) 
          sendMessage(inputText);
          setHasSentFirstMessage(true);
        }
      }, [inputText, hasSentFirstMessage, setPrompt]); 

    return (
        <div className={styles.continar}>
            <Header />
            <div className={styles.background}>
                {/* <div className={styles.sidebar}>

                </div> */}
                <div className={styles.mainContinar}>
                    <div className={styles.messages}>
                        {messages.map((message, index) => (
                        <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.user : styles.systemMessage}`}>
                            {message.role === 'user' ? (
                            <div className={styles.profileIcon}>
                                <img className={styles.profileImage} src='/frame-32@2x.png'/>
                            </div>
                            ) : (
                            <div className={styles.logo}>
                                <img src="/iranflag@2x.png" alt="System Logo" className={styles.logoImage} />
                            </div>
                            )}
                            <div className={styles.messageContinar}>
                                <div className={styles.messageText}>{message.text}</div>
                                {message.role !== 'user' && (
                                    <div className={styles.pdfContinar}>
                                        <img className={styles.pdfImg} src='/PDF_icon.png' alt="PDF Icon" />
                                        <div className={styles.pdfTextsContainr}>
                                            <div className={styles.pdfTitle}>{message.title}</div>
                                            <div className={styles.pdfPublisher}>publisher: {message.publisher}</div>
                                        </div>
                                        <button className={styles.buttonChat} 
                                                onClick={() => handleChatWithPdfClick(message, messages[index - 1])}>
                                                Chat
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.inputContainer}>
                        <textarea
                            ref={textbox}
                            className={styles.input}
                            placeholder="Ask your question (max 1,000 characters)"
                            type="text"
                            value={prompt}
                            rows={1}
                            style={{ maxHeight: '160px' }}
                            onChange={(e) => {
                                setPrompt(e.target.value);
                                handleKeyDown(e);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.shiftKey) {
                                    setPrompt(prompt + '\n');
                                    e.preventDefault(); // Prevent the default behavior of the Enter key
                                } else if (e.key === 'Enter' && !e.shiftKey && prompt.trim() !== '') {
                                    e.preventDefault(); // Prevent the default behavior of the Enter key
                                    sendMessage(prompt);
                                }
                            }}
                        />
                        <img className={styles.sendIcon} alt="send" src="/send.svg" onClick={() => sendMessage(prompt)} />
                    </div>
                </div>
            </div>
            {/* <img src='/sidebar.svg' alt='sidebar' width="28px"/> */}
        </div>
    );
}

export default ChatBotPage;