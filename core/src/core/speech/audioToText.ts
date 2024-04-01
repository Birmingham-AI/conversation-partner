import { openai } from "../config/openAi";
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

/**
 * This function takes in a file a file path to temp storage and sends it to GPT. It's then
 * processed into a transcription and the text is sent back, then returned to
 * the client.
 */
export async function convertAudioToText(filePath: string): Promise<any> {
  const file = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  const form = new FormData();
  form.append("model", "whisper-1");
  form.append("file", file, filename);
  try {
    const text = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });
    return text;
  } catch (err) {
    throw new Error(`Issue creating transcription: ${err}`);
  }
}
