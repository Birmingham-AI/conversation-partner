import { type ConversationQuestion } from "@/features/generate-conversation";
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

export const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));
