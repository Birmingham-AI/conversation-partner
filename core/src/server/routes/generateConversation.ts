import express, { Request, Response } from "express";
import { generateConversation } from "../../core/conversation";

const router = express.Router();

export default router.post("/generateConversation", async (req: Request, res: Response) => {
  //   Inputs from the request
  const name = req.body.name;
  const skillLevel = req.body.skillLevel;
  const language = req.body.language;
  const age = req.body.age;
  const interests = req.body.interests;

  console.log(`💬 Request for new ${language} conversation for ${name} whose skill level is: ${skillLevel}`);

  //   We'll validate them first
  if (!name || !skillLevel || !language || !age || !interests) {
    res.json({ error: "You must include name, skillLevel, language, age, and interests fields" });
  }

  // New conversation
  const conversation = await generateConversation(name, skillLevel, language, age, interests);

  // Return it
  console.log(`✅ Conversation created`);
  res.json(conversation);
});
