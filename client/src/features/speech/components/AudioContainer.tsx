import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { type ResponseToUserAnswer } from "@/features/conversation";
import { RecordResponse } from "./RecordResponse";
import { useAudioToText } from "../hooks/useAudioToText";
import { useRecordingStreamVisualsEffect } from "../hooks/useRecordingStreamVisuals";
import { getAudioFromCache, visualizeAudioFile } from "../utils";

export type AudioContainerProps = {
  isTextMode: boolean;
  completeRecording: () => Promise<Blob>;
  isRecording: boolean;
  setIsTextMode: (isTextMode: boolean) => void;
  submitResponse: (response: string) => Promise<ResponseToUserAnswer>;
  isAudioPlaying: boolean;
  mediaInputStream?: MediaStream;
  activeAudioItem?: HTMLAudioElement;
};

export function AudioContainer({
  submitResponse,
  setIsTextMode,
  isTextMode,
  isRecording,
  isAudioPlaying,
  completeRecording,
  mediaInputStream,
}: AudioContainerProps) {
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: convertSpeechToText } = useAudioToText();

  useRecordingStreamVisualsEffect(canvasRef, isRecording, mediaInputStream);

  const handleSpeechResponse = async () => {
    try {
      setIsProcessingResponse(true);
      const blob = await completeRecording();
      const responseText = await convertSpeechToText(blob);
      const questionResponse = await submitResponse(responseText.text);
      const responseAudio = await getAudioFromCache(
        queryClient,
        questionResponse.questionInTargetLanguage
      );
      setIsProcessingResponse(false);
      if (responseAudio) {
        visualizeAudioFile(canvasRef.current, responseAudio, () =>
          setIsTextMode(true)
        );
      }
    } catch (error) {
      setIsProcessingResponse(false);
      setIsTextMode(true);
      console.error(error);
    }
  };

  const isRecordingDisabled = isProcessingResponse || !!isAudioPlaying;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={clsx(
          "absolute rounded-full left-1/2 2 mt-[30dvh] -translate-x-1/2 z-20 duration-300 transition-all",
          isTextMode ? "opacity-0" : "opacity-100",
          !isRecording ? "bg-accent" : "bg-secondary",
          isProcessingResponse
            ? "animate-pulse size-20 translate-y-1/2"
            : "size-44 md:size-56 lg:size-72"
        )}
      />
      <div className="w-full flex justify-end gap-3">
        {isRecording || isProcessingResponse ? (
          <RecordResponse
            onRecordEnd={handleSpeechResponse}
            isDisabled={isRecordingDisabled}
          />
        ) : null}
      </div>
    </>
  );
}
