import express from "express";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// הגדרת המשתנים וה־OpenAI
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// משתנה לשמירה על כל השיחה
let chatHistory = [];

router.post("/", async (req, res, next) => {
  try {
    const userMessage = req.body.message;

    // הוספת ההודעה של המשתמש לשיחה
    chatHistory.push({ role: "user", content: userMessage });

    // קריאה ל־OpenAI עם כל ההיסטוריה של השיחה
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });

    // הוספת תגובת הבוט לשיחה
    const botMessage = chatCompletion.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: botMessage });

    // שליחת התגובה
    res.json({ reply: botMessage });
  } catch (err) {
    next(err);
  }
});

export default router;
