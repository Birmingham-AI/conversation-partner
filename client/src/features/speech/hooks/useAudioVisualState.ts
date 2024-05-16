import { useState, type RefObject } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseToUserAnswer } from "@/features/conversation";
import { visualizeAudioFile, getAudioFromCache } from "../utils";
import { useRecordResponse } from "./useRecordUserInput";
import { useAudioToText } from "./useAudioToText";

export const useAudioVisualState = ({
  visualizationTarget,
  handleSubmit,
  onAudioEnded,
  onError,
}: {
  visualizationTarget: RefObject<HTMLCanvasElement>;
  handleSubmit: (response: string) => Promise<ResponseToUserAnswer>;
  onAudioEnded?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: convertSpeechToText } = useAudioToText();

  const { beginRecording, completeRecording, isRecording, mediaInputStream } =
    useRecordResponse();

  const handleSpeechSubmission = async () => {
    try {
      setIsProcessingResponse(true);
      const blob = await completeRecording();
      const responseText = await convertSpeechToText(blob);
      const questionResponse = await handleSubmit(responseText.text);
      const responseAudio = await getAudioFromCache(
        queryClient,
        questionResponse.questionInTargetLanguage
      );
      setIsProcessingResponse(false);
      setIsBotSpeaking(true);
      if (responseAudio) {
        visualizeAudioFile(visualizationTarget.current, responseAudio, () => {
          setIsBotSpeaking(false);
          onAudioEnded?.();
        });
      }
    } catch (error) {
      setIsProcessingResponse(false);
      setIsBotSpeaking(false);
      onError?.(error);
      console.error(error);
    }
  };

  return {
    isRecording,
    isProcessingResponse,
    isBotSpeaking,
    mediaInputStream,
    beginRecording,
    handleSpeechSubmission,
  };
};
