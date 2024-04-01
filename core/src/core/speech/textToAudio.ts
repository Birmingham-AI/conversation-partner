import { openai } from "../config/openAi";

export async function convertTextToAudio(text: string): Promise<any> {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  } catch (err) {
    throw new Error(`Issue creating recording for text: ${err}`);
  }
}
