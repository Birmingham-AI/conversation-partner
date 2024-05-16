import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/utils/fetchClient";

export const getTextoToAudioKey = (text?: string) =>
  ["text-to-audio", text].filter(Boolean);

export const useTextToAudio = (text?: string) => {
  const result = useQuery({
    enabled: !!text,
    staleTime: Infinity,
    queryKey: getTextoToAudioKey(text),
    queryFn: async () => {
      const response = await fetchClient("/convertTextToAudio", {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      const blob = await response.blob();
      const audioSrc = window.URL.createObjectURL(blob);

      return new Audio(audioSrc);
    },
  });

  return result;
};
