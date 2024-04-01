"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_1 = require("../../core/conversation");
const router = express_1.default.Router();
exports.default = router.post("/respondToUser", async (req, res) => {
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
    const response = await (0, conversation_1.respondToUser)(previousQuestion, userResponse, nextQuestion);
    console.log(`✅ Updated the next question: ${nextQuestion}`);
    return res.json(response);
});
