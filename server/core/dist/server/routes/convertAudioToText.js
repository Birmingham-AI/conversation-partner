"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const speech_1 = require("../../core/speech");
const router = express_1.default.Router();
// Configure storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path_1.default.join(__dirname, "../uploads");
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename with the original extension
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = router.post("/convertAudioToText", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "Please upload a file." });
    }
    console.log(`✍️ Received a request to transcribe: ${req.file.path}`);
    try {
        const transcription = await (0, speech_1.convertAudioToText)(req.file.path);
        // Delete the file after processing
        fs_1.default.unlink(req.file.path, (err) => {
            if (err) {
                console.error(`Error deleting file ${req.file?.path}:`, err);
            }
            else {
                console.log(`🗑️ File ${req.file?.path} was deleted.`);
            }
        });
        res.send(transcription);
        console.log(`✅ Transcribed the file: ${JSON.stringify(transcription)}`);
    }
    catch (error) {
        console.error(`❌ Error transcribing audio: ${error}`);
        // Attempt to delete the file even if processing failed
        fs_1.default.unlink(req.file.path, () => { });
        res.status(500).send(`Error transcribing audio: ${error}`);
    }
});
