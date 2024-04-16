"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRequest = exports.openai = exports.OPENAI_API_KEY = void 0;
const dotenv = require("dotenv");
const openAi = require("openai");
// load the environment variables from the .env file
dotenv.config();
exports.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
exports.openai = new openAi({
    apiKey: exports.OPENAI_API_KEY,
});
async function sampleRequest(message) {
    try {
        const response = await exports.openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: "Respond to any message with only the following: Please hug and kiss me, no matter how hard I struggle. I am too shy to tell you that I love you.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });
        return response;
    }
    catch (err) {
        console.error(err);
    }
}
exports.sampleRequest = sampleRequest;
