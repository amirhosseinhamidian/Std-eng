import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styles from "./Chat.module.css";
import ChunkButton from './ChunkButton';

function Chat({ botMessage, userQuestion }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  const textbox = useRef(null);
  const clearChat = () => {
    setMessages([]);
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(false);
    }
  };

  function adjustHeight() {
    textbox.current.style.height = "inherit";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleKeyDown(e) {
    adjustHeight();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userQuestion !== null && userQuestion !== undefined) {
      const newMessages = [...messages, { text: userQuestion.text, role: 'user' }];
      setMessages(newMessages);
    }
  }, [userQuestion]);

  useEffect(() => {
    if (botMessage !== null && botMessage !== undefined) {
      const newMessages = [...messages, { text: botMessage.text, role: 'bot' }];
      setMessages(newMessages);
    }
  }, [botMessage]);

  const sendMessage = () => {
    const newMessages = [...messages, { text: input, role: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot reply after 1 second
    setTimeout(() => {
      const numChunks = Math.floor(Math.random() * 3) + 1; // Random number of chunks (between 1 and 3)
      const botChunks = [];
      for (let i = 0; i < numChunks; i++) {
        const pageNumber = Math.floor(Math.random() * 10) + 1; // Random page number (between 1 and 10)
        const fromLine = Math.floor(Math.random() * 50) + 1; // Random from line (between 1 and 50)
        const toLine = fromLine + Math.floor(Math.random() * 10) + 1; // Random to line (between fromLine and fromLine + 10)
        botChunks.push({ pageNumber, fromLine, toLine });
      }
      const botReply = 'This is a mock response from the bot.';
      const newBotMessages = [...newMessages, { text: botReply, role: 'bot', context: botChunks }];
      setMessages(newBotMessages);
    }, 500);
  };
  
  return (
    <div className={styles.chatContainer}>
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
              {message.context && message.context.map((chunk, idx) => (
              <ChunkButton key={idx} pageNumber={chunk.pageNumber} fromLine={chunk.fromLine} toLine={chunk.toLine} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <hr className={styles.divider}/>
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
              handleKeyDown(e)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                setInput(input + '\n');
                e.preventDefault(); // Prevent the default behavior of the Enter key
                 // Add a newline character to the input
              } else if (e.key === 'Enter' && !e.shiftKey && input.trim() !== '') {
                e.preventDefault(); // Prevent the default behavior of the Enter key
                sendMessage();
              }
            }}
          />
          <img className={styles.sendIcon} alt="send" src="/send.svg" onClick={sendMessage}/>
      </div>
    </div>
  );
}

export default Chat;
