import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [firstText, setFirstText] = useState('');

  const clearChats = () => {
    setPrompt('')
    setMessages([])
    setFirstText('')
  }
  

  return (
    <ChatContext.Provider value={{ prompt, setPrompt, messages, setMessages, firstText, setFirstText, clearChats }}>
      {children}
    </ChatContext.Provider>
  );
};