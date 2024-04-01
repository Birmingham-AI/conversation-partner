"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_1 = require("../../core/conversation");
const router = express_1.default.Router();
exports.default = router.get("/analyzeUserResponse", async (req, res) => {
    //   Inputs from the request
    const dialogue = req.body.dialogue;
    console.log(`🏫 Got a request to analyze a user's response`);
    //   We'll validate them first
    if (!dialogue) {
        res.json({ error: "You must include the dialogue you wish to analyze" });
    }
    // New conversation
    const response = await (0, conversation_1.analyzeResponse)(dialogue);
    console.log(`✅ Analyzed user's response`);
    return res.json({ analysis: response });
});
