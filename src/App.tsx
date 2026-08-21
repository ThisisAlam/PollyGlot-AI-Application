import { useState } from "react";
import "./App.css";

import franceFlag from "./assets/fr-flag.png";
import spainFlag from "./assets/sp-flag.png";
import japanFlag from "./assets/jpn-flag.png";
import parrot from "./assets/parrot.png";

type Language = "French" | "Spanish" | "Japanese";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

export default function App() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("French");

  // Text currently being typed in the textarea
  const [message, setMessage] = useState("");

  // Chat history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "user",
      text: "How are you?",
    },
    {
      id: 2,
      role: "assistant",
      text: "Comment allez-vous?",
    },
  ]);

  const handleSend = () => {
    // Stop if textarea is empty
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    // Add the new message to the chat
    setMessages((previousMessages) => [
      ...previousMessages,
      newUserMessage,
    ]);

    // Clear textarea
    setMessage("");
  };

  return (
    <main className="app">
      <section className="translator">

        {/* Header */}
        <header className="header">
          <div className="header-content">

            <div className="logo-placeholder">
              <img
                src={parrot}
                alt="PollyGlot parrot"
                className="parrot-logo"
              />
            </div>

            <div>
              <h1>
                Polly<span>Glot</span>
              </h1>

              <p>Perfect Translation Every Time</p>
            </div>

          </div>
        </header>
        
        <div className="how-to-use">
          <div className="info-icon">i</div>
          <div className="how-to-use-divider"></div>
          <div className="how-to-use-content">
            <h2>How to use</h2>
            <p>
              Select the language you want me to translate into,
              type your text and hit send!
            </p>
          </div>
        </div>

        {/* Translator content */}
        <section className="chat-container">

          {/* Chat Area */}
          <div className="chat-area">
            {messages.map((chatMessage) => (
              <div
                key={chatMessage.id}
                className={
                  chatMessage.role === "user"
                    ? "chat-message user-chat"
                    : "chat-message ai-chat"
                }
              >
                {chatMessage.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="input-container">
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Type your message..."
            />

            <button
              className="send-button"
              onClick={handleSend}
            >
              ➤
            </button>
          </div>

          {/* Language Selector */}
          <div className="language-selector">
            <button
              className={
                selectedLanguage === "French"
                  ? "language-button selected"
                  : "language-button"
              }
              onClick={() =>
                setSelectedLanguage("French")
              }
            >
              <img
                src={franceFlag}
                alt="French"
              />
            </button>

            <button
              className={
                selectedLanguage === "Spanish"
                  ? "language-button selected"
                  : "language-button"
              }
              onClick={() =>
                setSelectedLanguage("Spanish")
              }
            >
              <img
                src={spainFlag}
                alt="Spanish"
              />
            </button>

            <button
              className={
                selectedLanguage === "Japanese"
                  ? "language-button selected"
                  : "language-button"
              }
              onClick={() =>
                setSelectedLanguage("Japanese")
              }
            >
              <img
                src={japanFlag}
                alt="Japanese"
              />
            </button>

          </div>

          <p className="selected-language">
            Translating to:{" "}
            <strong>{selectedLanguage}</strong>
          </p>

        </section>

      </section>
    </main>
  );
}