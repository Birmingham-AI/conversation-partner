"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConversation = void 0;
const openAi_1 = require("../config/openAi");
async function generateConversation(name, skillLevel, language) {
    try {
        const response = await openAi_1.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a language teaching expert who focuses on conversation-based learning. My name is ${name} and should be considered
          an ${skillLevel} learner. You are going to create ten questions that we will converse about in ${language}. Each question should build on its
          difficulty from the previous question and — to ensure this feels conversational — you should address things I say in my response, but keep 
          the next question you've generated as the focus for our next interaction. Each question should be a JSON object like this:
          
          {
            "questionInTargetLanguage": "Que hora es?",
            "questionInEnglish": "What time is it?",
            "summary": A question like this is common to ask and receive from both friends and strangers. I asked you because <REASON THIS HELPS LEARNING>.
            "userResponse": "", // this should be an empty string
            "analysis": "", // this should be an empty string
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
