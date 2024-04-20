import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetchClient } from "@/utils/fetchClient";

export const useAudioToText = (
  queryOpts: UseMutationOptions<{ text: string }, Error, Blob> = {}
) => {
  const results = useMutation<{ text: string }, Error, Blob>({
    ...queryOpts,
    mutationKey: ["speech-to-text"],
    mutationFn: async (blob) => {
      const file = new File([blob], `${new Date().valueOf()}.mp3`);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetchClient("/convertAudioToText", {
        method: "POST",
        body: formData,
        headers: {},
      });

      return response.json();
    },
  });

  return results;
};
