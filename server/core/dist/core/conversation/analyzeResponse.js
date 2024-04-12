"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnalysis = exports.analyzeResponse = void 0;
const openAi_1 = require("../config/openAi");
/**
 * This function allows us to analyze a user's response. It takes the QuestionObject that contains the bot's question
 * in addition to the user's response. It will let us know if the user "passed" or "failed" the question and provide
 * feedback on how to improve.
 */
async function analyzeResponse(dialogue) {
    try {
        const response = await openAi_1.openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: `You are a language teaching expert who focuses on conversation-based learning and is conversing with me. In our most recent dialogue,
          you said, "${dialogue.questionInTargetLanguage}" and I responded with, "${dialogue.userResponse}. Analyze my response and provide me with either
          a passing or failing grade for how I responded. If my response is failing, respond with how I can improve.`,
                },
            ],
        });
        return response.choices[0].message.content;
    }
    catch (err) {
        console.error(err);
    }
}
exports.analyzeResponse = analyzeResponse;
/**
 * This simply updates the QuestionObject with the new analysis.
 */
function updateAnalysis(dialogue, analysis) {
    try {
        dialogue.analysis = analysis;
        return true;
    }
    catch (err) {
        throw new Error(`Issue updating analysis: ${err}`);
    }
}
exports.updateAnalysis = updateAnalysis;
