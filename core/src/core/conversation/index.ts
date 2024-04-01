import { generateConversation } from "./generateConversation";
import { respondToUser, updateQuestion, updateUserResponse } from "./respondToUser";
import { analyzeResponse, updateAnalysis } from "./analyzeResponse";
import { conversation } from "./samples/spanishIntermediate";

type QuestionObject = {
  questionInTargetLanguage: string;
  questionInEnglish: string;
  summary: string;
  userResponse: string;
  analysis: string;
};

type ConversationArray = {
  summary: string;
  questions: QuestionObject[];
};

export {
  generateConversation,
  respondToUser,
  conversation,
  QuestionObject,
  ConversationArray,
  updateQuestion,
  updateUserResponse,
  analyzeResponse,
  updateAnalysis,
};
