"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAudioToText = void 0;
const openAi_1 = require("../config/openAi");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
/**
 * This function takes in a file a file path to temp storage and sends it to GPT. It's then
 * processed into a transcription and the text is sent back, then returned to
 * the client.
 */
async function convertAudioToText(filePath) {
    const file = fs.createReadStream(filePath);
    const filename = path.basename(filePath);
    const form = new FormData();
    form.append("model", "whisper-1");
    form.append("file", file, filename);
    try {
        const text = await openAi_1.openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
        });
        return text;
    }
    catch (err) {
        throw new Error(`Issue creating transcription: ${err}`);
    }
}
exports.convertAudioToText = convertAudioToText;
