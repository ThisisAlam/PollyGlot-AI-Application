import { useEffect, useRef, useState } from "react";

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
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("French");

  // Text currently being typed in the textarea
  const [message, setMessage] = useState("");

  // Chat history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "user",
      text: "(Hint) How are you?",
    },
    {
      id: 2,
      role: "assistant",
      text: "(Hint) Comment allez-vous?",
    },
  ]);

  // loading state:
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        text: "Translate with me",
      },
    ]);
  };

  // loading state:
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    // Stop if textarea is empty
    if (!message.trim()) return;
    const userText = message;
    const newUserMessage: Message = {
      id: Date.now(),
      role: "user",
      text: userText,
    };

    // Add the new message to the chat
    setMessages((previousMessages) => [
      ...previousMessages,
      newUserMessage,
    ]);

    // Clear textarea
    setMessage("");
    setIsLoading(true);

    try {
      // Fetching local-host
      const response = await fetch(
        "http://localhost:3001/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userText,
            language: selectedLanguage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Translation request failed.");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: data.translation,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: "Sorry, I couldn't translate that.",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        errorMessage,
      ]);

    } finally {
      setIsLoading(false);
    }

  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

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

          <div className="chat-header">
            <span>Conversation</span>

            <button
              className="clear-chat-button"
              onClick={clearChat}
              disabled={messages.length === 0}
              type="button"
            >
              Clear chat
            </button>
          </div>

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

            {isLoading && (
              <div className="chat-message ai-chat loading-message">
                Translating...
              </div>
            )
            }
            <div ref={chatEndRef} />
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
              disabled={isLoading}
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