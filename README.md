# 🦜 PollyGlot AI Translator

PollyGlot is a small AI-powered translation application built with **React, TypeScript, Vite, Node.js, Express, and the OpenAI API**.

The application allows users to enter a message, choose a target language, and receive an AI-generated translation in a chat-style interface.

## ✨ Features

* AI-powered text translation
* Chat-style user and AI messages
* Translate into:

  * 🇫🇷 French
  * 🇪🇸 Spanish
  * 🇯🇵 Japanese
* Automatic scrolling to the newest message
* Clear chat functionality
* Loading state while translation is being generated
* Responsive user interface
* Secure OpenAI API integration through an Express backend
* Environment-variable based API configuration

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Backend

* Node.js
* Express.js
* OpenAI API
* dotenv
* CORS

## 🧠 How It Works

1. The user enters a message.
2. The user selects French, Spanish, or Japanese.
3. React sends the text and selected language to the Express backend.
4. The backend sends the request to the OpenAI API.
5. OpenAI generates the translated text.
6. The translated response is returned to React.
7. The result appears as an AI message in the conversation.

```text
User
  ↓
React Frontend
  ↓
Express API
  ↓
OpenAI
  ↓
Express API
  ↓
React Chat Interface
```

## 📁 Project Structure

```text
PollyGlot-AI-Application/
│
├── src/
│   ├── assets/
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Running the Project

Clone the repository:

```bash
git clone <repository-url>
cd PollyGlot-AI-Application
```

Install the frontend dependencies:

```bash
npm install
```

Install the backend dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_AI_MODEL=your_model_name
```

Do not commit your `.env` file or API key to GitHub.

Start the backend server:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:3001
```

Open another terminal, return to the project root, and start the frontend:

```bash
npm run dev
```

The Vite application will normally run at:

```text
http://localhost:5173
```

## 🔐 API Key Security

The OpenAI API key is stored only on the backend.

The React frontend never communicates directly with OpenAI and does not expose the API key to the browser.

## 🎯 What I Practiced

This project helped me practice:

* React state management
* TypeScript types
* Rendering dynamic chat messages
* Working with arrays of objects in React state
* Async API requests
* OpenAI API integration
* Building an Express backend
* Environment variables
* Frontend/backend communication
* Loading states
* Automatic chat scrolling
* Responsive UI design

## 🔮 Possible Future Improvements

* Add more languages
* Add language auto-detection
* Add copy-to-clipboard functionality
* Add translation history
* Add improved error handling
* Add animated typing/loading indicators
* Deploy the frontend and backend

## 📄 License

This project is built for learning and portfolio purposes.
