import { type ConversationQuestion } from "../GenerateConversation";
import { type ConversationItem } from "./types";

export const questionToChatItem = (
  question: ConversationQuestion,
  questionIndex: number
): ConversationItem => ({
  type: "question",
  author: "bot",
  timestamp: Date.now(),
  questionIndex,
  displayText: question.questionInTargetLanguage,
  additionalText: question.questionInEnglish,
});
