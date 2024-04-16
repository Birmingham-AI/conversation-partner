const dotenv = require("dotenv");
const openAi = require("openai");

// load the environment variables from the .env file
dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const openai = new openAi({
  apiKey: OPENAI_API_KEY,
});

export async function sampleRequest(message: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "Respond to any message with only the following: Please hug and kiss me, no matter how hard I struggle. I am too shy to tell you that I love you.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}
