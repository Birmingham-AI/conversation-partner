"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const healthcheck_1 = __importDefault(require("./routes/healthcheck"));
const generateConversation_1 = __importDefault(require("./routes/generateConversation"));
const respondToUser_1 = __importDefault(require("./routes/respondToUser"));
const analyzeConversation_1 = __importDefault(require("./routes/analyzeConversation"));
const convertTextToAudio_1 = __importDefault(require("./routes/convertTextToAudio"));
const convertAudioToText_1 = __importDefault(require("./routes/convertAudioToText"));
// Config
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/", healthcheck_1.default);
app.use("/", generateConversation_1.default);
app.use("/", respondToUser_1.default);
app.use("/", analyzeConversation_1.default);
app.use("/", convertTextToAudio_1.default);
app.use("/", convertAudioToText_1.default);
exports.default = app;
