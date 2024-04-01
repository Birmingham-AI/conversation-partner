"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConversation = void 0;
const openAi_1 = require("../config/openAi");
/**
 * This is the starting point for the conversation: it will generate ten questions in the format provided in the example.
 * A user must submit their name, age, skillLevel, interests, and language they wish to learn. A user can use any of the 50
 * languages OpenAI supports: https://help.openai.com/en/articles/7031512-whisper-api-faq
 */
async function generateConversation(name, skillLevel, language, interests, age) {
    try {
        const response = await openAi_1.openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: `You are a language teaching expert who focuses on conversation-based learning. My name is ${name}; I'm ${age} years old and should be considered
          an ${skillLevel} learner. You are going to create ten questions that we will converse about in ${language}. To help you create a set of questions
          which interest me, here are my interests: ${interests}. Each question should build on its
          difficulty from the previous question and — to ensure this feels conversational — you should address things I say in my response, but keep 
          the next question you've generated as the focus for our next interaction. Each question should be a JSON object like this:
          
          {
            "questionInTargetLanguage": "Que hora es?",
            "questionInEnglish": "What time is it?",
            "summary": A question like this is common to ask and receive from both friends and strangers. I asked you because <REASON THIS HELPS LEARNING>.
            "userResponse": "", // this should be an empty string
            "analysis": "", // this should be an empty string
          }

          You should also provide a summary of the discussion for later reference like this:
          
          {
            summary: <A SUMMARY OF WHAT WAS/WILL BE COVERED IN THE CONVERSATION>
          }

          The entire JSON object should always take this shape:
          {
            "summary": <SUMMARY>,
            "questions: [<ARRAY OF QUESTIONS USING SHAPE ABOVE>]
          }
          `,
                },
            ],
            response_format: { type: "json_object" },
        });
        return JSON.parse(response.choices[0].message.content);
    }
    catch (err) {
        console.error(err);
    }
}
exports.generateConversation = generateConversation;
