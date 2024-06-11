import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);

  return (
    <ChatContext.Provider value={{ prompt, setPrompt, messages, setMessages, hasSentFirstMessage, setHasSentFirstMessage }}>
      {children}
    </ChatContext.Provider>
  );
};