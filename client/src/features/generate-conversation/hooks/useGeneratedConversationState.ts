import { useMutationState } from "@tanstack/react-query";
import { type GenerateConversationResponse } from "../types";
import { getGenerateConversationKey } from "./useGenerateConverstation";

/**
 * A hook to retrieve the latest conversation generated based off the user's inputs.
 */
export const useGeneratedConversationState = () => {
  const generateConversationresult = useMutationState({
    filters: { mutationKey: getGenerateConversationKey() },
  });

  const { data } = generateConversationresult?.at(-1) ?? {};

  return data as GenerateConversationResponse | undefined;
};
