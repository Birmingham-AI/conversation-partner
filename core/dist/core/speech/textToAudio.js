"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTextToAudio = void 0;
const openAi_1 = require("../config/openAi");
async function convertTextToAudio(text) {
    try {
        const mp3 = await openAi_1.openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return buffer;
    }
    catch (err) {
        throw new Error(`Issue creating recording for text: ${err}`);
    }
}
exports.convertTextToAudio = convertTextToAudio;
