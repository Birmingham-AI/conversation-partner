import express, { Request, Response } from "express";
import { respondToUser } from "../../core/conversation";

const router = express.Router();

export default router.post("/respondToUser", async (req: Request, res: Response) => {
  //   Inputs from the request
  const previousQuestion = req.body.previousQuestion.questionInTargetLanguage;
  const userResponse = req.body.userResponse;
  const nextQuestion = req.body.nextQuestion.questionInTargetLanguage;

  console.log(`🤖 Generating a response to ${previousQuestion}`);

  //   We'll validate them first
  if (!previousQuestion || !userResponse || !nextQuestion) {
    res.json({ error: "You must include previousQuestion, userResponse, and nextQuestion fields" });
  }

  // New conversation
  const response = await respondToUser(previousQuestion, userResponse, nextQuestion);

  console.log(`✅ Updated the next question: ${nextQuestion}`);

  return res.json(response);
});
