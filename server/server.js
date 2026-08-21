import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL : process.env.OPENAI_AI_URL,
});

app.post("/translate", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({
        error: "Text and language are required.",
      });
    }
    
    const response = await openai.responses.create({
      model: process.env.OPENAI_AI_MODEL,
      instructions: `
        You are a translation assistant.
        Translate the user's text into ${language}.
        Return only the translated text.
        Do not explain the translation.
        Do not add quotation marks.
      `,
      input: text,
    });
    
    res.json({
      translation: response.output_text,
    });
  
} catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Translation failed.",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});