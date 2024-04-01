import express, { Request, Response } from "express";
import healthcheck from "./routes/healthcheck";
import generateConversation from "./routes/generateConversation";
import respondToUser from "./routes/respondToUser";
import analyzeUserResponse from "./routes/analyzeConversation";
import convertTextToAudio from "./routes/convertTextToAudio";
import convertAudioToText from "./routes/convertAudioToText";

// Config
const app = express();

app.use(express.json());

// Routes
app.use("/", healthcheck);
app.use("/", generateConversation);
app.use("/", respondToUser);
app.use("/", analyzeUserResponse);
app.use("/", convertTextToAudio);
app.use("/", convertAudioToText);

export default app;
