import React from "react";
import chatbotIcon from "../assets/chatBotIcon.webp";
import './chatbotHeader.scss';

const ChatbotHeader = () => {
  return (
    <div className="chatbot-header">
      <img src={chatbotIcon} alt="Chatbot" className="chatbot-icon"/>
      <div className="title">LSEG Chatbot</div>
    </div>
  );
};

export default ChatbotHeader;
