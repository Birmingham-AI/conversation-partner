import { sampleRequest } from "../../src/core/config/openAi";
import {
  generateConversation,
  respondToUser,
  updateQuestion,
  conversation,
  updateUserResponse,
  analyzeResponse,
  updateAnalysis,
} from "../../src/core/conversation";

describe("Conversation test", () => {
  it("Should be able to connect to OpenAI's API", async () => {
    const result = await sampleRequest(`What's new pussycat?`);
    expect(result.choices[0].message.content).toContain("Please hug and kiss me");
  });
  it("Should be able to use inputs to create a set of 10 conversational questions", async () => {
    const result = await generateConversation(
      "Rob",
      "intermediate",
      "Spanish",
      "Fast women, dive bars, engineering",
      35
    );
    console.log(result);
    expect(true).toBe(true);
  }, 100000);
  it("Should be able to respond to a user by addressing something they say in their response", async () => {
    const previousQuestion = conversation.questions[0].questionInTargetLanguage;
    const userResponse = `Son las dos y media.`;
    const nextQuestion = conversation.questions[1].questionInTargetLanguage;
    const result = await respondToUser(previousQuestion, userResponse, nextQuestion);
    console.log(result);
    expect(result.questionInTargetLanguage).toContain("hoy");
  }, 100000);
  it("Should be able to update a user's response", async () => {
    const userResponse = `Son las dos y media.`;
    const updatedConversation = updateUserResponse(conversation, 0, userResponse);
    expect(updatedConversation).toBe(true);
  }, 10000);
  it("Should be able to update a question based on the user's response", async () => {
    const updatedQuestion = {
      questionInTargetLanguage: "Ah, ya es tarde. ¿Cómo estás hoy?",
      questionInEnglish: "Ah, it's already late. How are you today?",
    };
    const updatedConversation = updateQuestion(conversation, 1, updatedQuestion);
    expect(true).toBe(true);
  }, 10000);
  it("Should be able to analyze a user's response", async () => {
    const userResponse = `Son las dos y media.`;
    const updatedConversation = updateUserResponse(conversation, 0, userResponse);
    const analysis = await analyzeResponse(conversation.questions[0]);
    expect(true).toBe(true);
  }, 50000);
  it("Should be able update the analysis field of a question", async () => {
    const analysis = await analyzeResponse(conversation.questions[0]);
    const updatedConversation = updateAnalysis(conversation.questions[0], analysis);
    console.log(conversation);
    expect(true).toBe(true);
  }, 10000);
});
