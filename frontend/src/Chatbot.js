import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "./chatbot.css";

const ChatbotContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px; /* Increased max-width */
  max-height: 500px; /* Increased max-height */
  margin: 20px auto;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;

  h2 {
    margin: 0;
  }

  .close-btn {
    cursor: pointer;
    color: #555;
  }
`;

const Chatbox = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;

  .chat {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;

    .material-symbols-outlined {
      margin-right: 10px;
    }

    p {
      margin: 0;
    }
  }

  .incoming .material-symbols-outlined {
    display: none;
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;

  textarea {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    resize: none;
  }
`;

const ChatButton = styled.span`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

const Chatbot = ({ onClose }) => {
  const [userMessage, setUserMessage] = useState("");
  const chatboxRef = useRef(null);
  const chatInputRef = useRef(null);

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent =
      className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };

  const generateResponse = async () => {
    const API_URL = "http://192.168.10.25:8000/chat/";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Query: "userMessage",
        }),
      });
      const data = await response.json();

      // Create a new li element for the incoming message
      const incomingChatLi = createChatLi(data.answer, "incoming");
  
      // Append the new incoming message to the chatbox
      chatboxRef.current.appendChild(incomingChatLi);
  
      // Scroll to the bottom of the chatbox
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    } catch (error) {
      // messageElement.classList.add("error");
      // messageElement.textContent = "Oops! Something went wrong. Please try again.";
    } finally {
      chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }
  };

  const handleChat = () => {

    userMessage = chatInputRef.value; // Get user entered message and remove extra whitespace
    if(!userMessage) return;
    console.log(userMessage)
    chatInputRef.current.value = "";
    chatInputRef.current.style.height = "auto";

    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatboxRef.current.appendChild(outgoingChatLi);
    chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);

    setTimeout(() => {
      //const incomingChatLi = createChatLi("thinking...", "incoming");
      //chatboxRef.current.appendChild(incomingChatLi);
      //chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
      generateResponse();
    }, 600);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
      }
    };

    chatInputRef.current.addEventListener("input", () => {
      chatInputRef.current.style.height = "auto";
      chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
    });
    chatInputRef.current.addEventListener("keydown", handleKeyPress);
  }, [userMessage]);

  return (
    <ChatbotContainer>
      <Header>
        <h2>Chatbot</h2>
        <span className="close-btn material-symbols-outlined" onClick={onClose}>
          close
        </span>
      </Header>
      <Chatbox ref={chatboxRef}></Chatbox>
      <ChatInput>
        <textarea ref={chatInputRef} placeholder="Enter a message..." spellCheck={false} required />
        <ChatButton onClick={handleChat}>send</ChatButton>
      </ChatInput>
    </ChatbotContainer>
  );
};

export default Chatbot;
