import { type ConversationQuestion } from "@/features/generate-conversation";
import { type ConversationItem, type AnalyzeResponseInput } from "./types";

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

export const getAnalyzeTarget = (
  chatItems: ConversationItem[],
  targetIndex?: number
): AnalyzeResponseInput => {
  if (typeof targetIndex !== "number") {
    return { questionText: "", responseText: "" };
  }

  const questionText =
    chatItems.find(
      ({ questionIndex, type }) =>
        questionIndex === targetIndex && type === "question"
    )?.displayText ?? "";
  const responseText =
    chatItems.find(
      ({ questionIndex, type }) =>
        questionIndex === targetIndex && type === "answer"
    )?.displayText ?? "";

  return { questionText, responseText };
};

export const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));
