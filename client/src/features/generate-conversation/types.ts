export type GenerateConversationDTO = {
  name: string;
  skillLevel: string;
  language: string;
  age: number;
  interests: string;
};

export type ConversationQuestion = {
  questionInTargetLanguage: string;
  questionInEnglish: string;
  summary: string;
  userResponse: string;
  analysis: string;
};

export type GenerateConversationResponse = {
  summary: string;
  questions: ConversationQuestion[];
};
