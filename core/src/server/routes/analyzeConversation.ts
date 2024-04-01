import express, { Request, Response } from "express";
import { analyzeResponse } from "../../core/conversation";

const router = express.Router();

export default router.get("/analyzeUserResponse", async (req: Request, res: Response) => {
  //   Inputs from the request
  const dialogue = req.body.dialogue;

  console.log(`🏫 Got a request to analyze a user's response`);

  //   We'll validate them first
  if (!dialogue) {
    res.json({ error: "You must include the dialogue you wish to analyze" });
  }

  // New conversation
  const response = await analyzeResponse(dialogue);

  console.log(`✅ Analyzed user's response`);

  return res.json({ analysis: response });
});
