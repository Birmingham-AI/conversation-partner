import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { convertAudioToText } from "../../core/speech";

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with the original extension
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default router.post("/convertAudioToText", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ error: "Please upload a file." });
  }

  console.log(`✍️ Received a request to transcribe: ${req.file.path}`);

  try {
    const transcription = await convertAudioToText(req.file.path);

    // Delete the file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(`Error deleting file ${req.file?.path}:`, err);
      } else {
        console.log(`🗑️ File ${req.file?.path} was deleted.`);
      }
    });

    res.send(transcription);
    console.log(`✅ Transcribed the file: ${JSON.stringify(transcription)}`);
  } catch (error) {
    console.error(`❌ Error transcribing audio: ${error}`);
    // Attempt to delete the file even if processing failed
    fs.unlink(req.file.path, () => {});
    res.status(500).send(`Error transcribing audio: ${error}`);
  }
});
