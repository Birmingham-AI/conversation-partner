export type Author = "bot" | "user";

export type ConversationItemType = "question" | "answer" | "info";

export type ConversationItem = {
  type: ConversationItemType;
  displayText: string;
  author: Author;
  timestamp: number;
  additionalText?: string;
  questionIndex?: number;
};

export type ResponseToUserAnswer = {
  questionInEnglish: string;
  questionInTargetLanguage: string;
};

export type AnalyzeResponseInput = {
  questionText: string;
  responseText: string;
};
