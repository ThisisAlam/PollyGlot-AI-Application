import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// checkEnvironment
if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing from .env");
}
if (!process.env.OPENAI_AI_MODEL) {
    throw new Error("OPENAI_AI_MODEL is missing from .env");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

app.post("/translate", async (req, res) => {
    try {
        const { text, language } = req.body;

        if (
            typeof text !== "string" ||
            typeof language !== "string" ||
            !text.trim() ||
            !language.trim()
        ) {
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
            input: text.trim(),
        });

        res.json({
            translation: response.output_text,
        });

    } catch (error) {
        console.error("Translation error:", error);
        res.status(500).json({
            error: "Translation failed.",
        });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});