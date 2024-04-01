"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_1 = require("../../core/conversation");
const router = express_1.default.Router();
exports.default = router.post("/generateConversation", async (req, res) => {
    //   Inputs from the request
    const name = req.body.name;
    const skillLevel = req.body.skillLevel;
    const language = req.body.language;
    const age = req.body.age;
    const interests = req.body.interests;
    console.log(`💬 Request for new ${language} conversation for ${name} whose skill level is: ${skillLevel}`);
    //   We'll validate them first
    if (!name || !skillLevel || !language || !age || !interests) {
        res.json({ error: "You must include name, skillLevel, language, age, and interests fields" });
    }
    // New conversation
    const conversation = await (0, conversation_1.generateConversation)(name, skillLevel, language, age, interests);
    // Return it
    console.log(`✅ Conversation created`);
    res.json(conversation);
});
