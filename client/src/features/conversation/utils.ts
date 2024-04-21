import { type ConversationQuestion } from "@/features/generate-conversation";
import {
  type ConversationItem,
  type AnalyzeResponseInput,
  ConversationItemType,
} from "./types";

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

  const findItem = (itemType: ConversationItemType) =>
    chatItems.find(
      ({ questionIndex, type }) =>
        questionIndex === targetIndex && type === itemType
    )?.displayText ?? "";

  const questionText = findItem("question");
  const responseText = findItem("answer");

  return { questionText, responseText };
};

export const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));
