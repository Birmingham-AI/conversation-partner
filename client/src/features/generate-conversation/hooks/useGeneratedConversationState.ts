import { useMutationState } from "@tanstack/react-query";
import { getGenerateConversationKey } from "./useGenerateConverstation";
import {
  GenerateConversationDTO,
  type GenerateConversationResponse,
} from "../types";

/**
 * A hook to retrieve the latest conversation generated based off the user's inputs.
 */
export const useGeneratedConversationState = () => {
  const generateConversationresult = useMutationState({
    filters: { mutationKey: getGenerateConversationKey() },
  });

  const { data, variables } = generateConversationresult?.at(-1) ?? {};

  return { data, variables } as {
    data: GenerateConversationResponse | undefined;
    variables: GenerateConversationDTO | undefined;
  };
};
