import express, { Request, Response } from "express";
import { convertTextToAudio } from "../../core/speech";

const router = express.Router();

export default router.post("/convertTextToAudio", async (req: Request, res: Response) => {
  // Inputs from the request
  const text = req.body.text;

  console.log(`🎤 Got a request to convert text to audio`);

  // We'll validate them first
  if (!text) {
    res.json({ error: "You must include the text you wish to have converted to audio as the `text` property" });
    return;
  }

  // New conversation
  const response = await convertTextToAudio(text);

  // Set the headers
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", "attachment; filename=audio.mp3");

  // Send the buffer as a stream
  res.send(response);

  console.log(`✅ Sent mp3 for ${text}`);
});
