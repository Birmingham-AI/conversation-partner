import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "@/utils/fetchClient";
import {
  type GenerateConversationDTO,
  type GenerateConversationResponse,
} from "../types";

export const getGenerateConversationKey = () => ["generate-conversation"];

/**
 * useMutation wrapper that takes the user's initial values and begins the conversation loop.
 */
export const useGenerateConversation = () => {
  const router = useRouter();
  const result = useMutation<
    GenerateConversationResponse,
    Error,
    GenerateConversationDTO
  >({
    mutationKey: getGenerateConversationKey(),
    gcTime: Infinity,
    mutationFn: async (conversationInit) => {
      const response = await fetchClient("/generateConversation", {
        method: "POST",
        body: JSON.stringify(conversationInit),
      });

      return response.json();
    },
    onSuccess: () => router.push("/conversation"),
  });

  return result;
};
