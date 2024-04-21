import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/utils/fetchClient";

export const getAnalyzeResponseKey = (question?: string, response?: string) =>
  ["analyze-response", question, response].filter(Boolean);

export const useAnalyzeResponse = (
  questionInTargetLanguage?: string,
  userResponse?: string
) => {
  const result = useQuery<unknown, Error, { analysis: string }>({
    enabled: !!questionInTargetLanguage && !!userResponse,
    staleTime: Infinity,
    queryKey: getAnalyzeResponseKey(questionInTargetLanguage, userResponse),
    queryFn: async () => {
      const response = await fetchClient("/analyzeUserResponse", {
        method: "POST",
        body: JSON.stringify({
          dialogue: { questionInTargetLanguage, userResponse },
        }),
      });

      return response.json();
    },
  });

  return result;
};
