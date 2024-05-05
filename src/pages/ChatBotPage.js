import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styles from "./ChatBotPage.module.css"
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

const ChatBotPage = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const textbox = useRef(null);
    const navigate = useNavigate();

    const handleChatWithPdfClick = (botMessage, userQuestion) => {
        console.log("botMessage", botMessage)
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
    

    const sendMessage = () => {
        const newMessages = [...messages, { text: input, role: 'user' }];
        setMessages(newMessages);
        setInput('');
    
        // Simulate bot reply after 1 second
        setTimeout(() => {
          const title = generateRandomTitle();
          const publisher = generatePublisherAbbreviation();
          const botReply = 'This is a mock response from the bot.';
          const newBotMessages = [...newMessages, { text: botReply, role: 'bot' , title: title, publisher:publisher}];
          console.log(publisher)
          setMessages(newBotMessages);
        }, 500);
    };

    return (
        <div className={styles.continar}>
            <Header />
            <div className={styles.background}>
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
                                            Chat with PDF
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
                            value={input}
                            rows={1}
                            style={{ maxHeight: '160px' }}
                            onChange={(e) => {
                                setInput(e.target.value);
                                handleKeyDown(e);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.shiftKey) {
                                    setInput(input + '\n');
                                    e.preventDefault(); // Prevent the default behavior of the Enter key
                                } else if (e.key === 'Enter' && !e.shiftKey && input.trim() !== '') {
                                    e.preventDefault(); // Prevent the default behavior of the Enter key
                                    sendMessage();
                                }
                            }}
                        />
                        <img className={styles.sendIcon} alt="send" src="/send.svg" onClick={sendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBotPage;