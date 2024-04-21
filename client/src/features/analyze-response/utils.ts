import {
  type ConversationItem,
  type ConversationItemType,
} from "@/features/conversation";
import { type AnalyzeResponseInput } from "./types";

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
