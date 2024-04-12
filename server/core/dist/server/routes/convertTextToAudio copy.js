"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const speech_1 = require("../../core/speech");
const router = express_1.default.Router();
exports.default = router.get("/convertTextToAudio", async (req, res) => {
    // Inputs from the request
    const text = req.body.text;
    console.log(`🎤 Got a request to convert text to audio`);
    // We'll validate them first
    if (!text) {
        res.json({ error: "You must include the text you wish to have converted to audio as the `text` property" });
        return;
    }
    // New conversation
    const response = await (0, speech_1.convertTextToAudio)(text);
    // Set the headers
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", "attachment; filename=audio.mp3");
    // Send the buffer as a stream
    res.send(response);
    console.log(`✅ Sent mp3 for ${text}`);
});
