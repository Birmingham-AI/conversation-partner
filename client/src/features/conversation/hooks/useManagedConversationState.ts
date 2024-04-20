import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "@/utils/fetchClient";
import {
  type ConversationQuestion,
  useGeneratedConversationState,
} from "@/features/GenerateConversation";
import { type ConversationItem, type ResponseToUserAnswer } from "../types";
import { questionToChatItem } from "../utils";

/**
 * Hook to manage the conversation state, history, and dispatch feedback events.
 */
export const useManagedConversationState = () => {
  const { data: generatedConversation } = useGeneratedConversationState();
  const { questions = [] } = generatedConversation ?? {};

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<ConversationItem[]>(
    questions.at(0) ? [questionToChatItem(questions[0], 0)] : []
  );

  const {
    mutate: submitResponse,
    isError: hasErrorSubmittingResponse,
    isPending: isResponding,
  } = useMutation<ResponseToUserAnswer, Error, string>({
    mutationKey: ["answer-question", activeQuestionIndex],
    mutationFn: async (userResponse) => {
      const previousQuestion = questions[activeQuestionIndex];
      const nextQuestion = questions[activeQuestionIndex + 1];

      const response = await fetchClient("/respondToUser", {
        method: "POST",
        body: JSON.stringify({
          userResponse,
          previousQuestion,
          nextQuestion,
        }),
      });

      return response.json();
    },
    onMutate: (userResponse) => {
      setChatHistory((history) => [
        ...history,
        {
          type: "answer",
          author: "user",
          timestamp: Date.now(),
          questionIndex: activeQuestionIndex,
          displayText: userResponse,
        },
      ]);
    },
    onSuccess: (questionResponse) => {
      const nextQuestionIndex = activeQuestionIndex + 1;
      const nextQuestion = questionToChatItem(
        questionResponse as ConversationQuestion,
        nextQuestionIndex
      );

      setChatHistory((history) => [...history, nextQuestion]);
      setActiveQuestionIndex(nextQuestionIndex);
    },
  });

  return {
    submitResponse,
    hasErrorSubmittingResponse,
    isResponding,
    chatHistory,
    hasConversationEnded: activeQuestionIndex >= questions.length - 1,
  };
};
