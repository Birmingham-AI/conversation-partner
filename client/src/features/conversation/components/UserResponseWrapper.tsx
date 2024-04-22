import { type ReactNode, useRef } from "react";
import Link from "next/link";
import {
  useAudioVisualState,
  AudioVisualizer,
  CompleteRecording,
} from "@/features/speech";
import { ResponseToUserAnswer } from "../types";

export type UserResponseWrapperProps = {
  children: (handleBeginRecording: () => void) => ReactNode;
  isTextMode: boolean;
  hasConversationEnded: boolean;
  setIsTextMode: (value: boolean) => void;
  submitResponseAsync: (response: string) => Promise<ResponseToUserAnswer>;
};

export function UserResponseWrapper({
  isTextMode,
  hasConversationEnded,
  setIsTextMode,
  submitResponseAsync,
  children,
}: UserResponseWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    beginRecording,
    handleSpeechSubmission,
    isProcessingResponse,
    isBotSpeaking,
    isRecording,
    mediaInputStream,
  } = useAudioVisualState({
    visualizationTarget: canvasRef,
    handleSubmit: submitResponseAsync,
    onAudioEnded: () => setIsTextMode(true),
    onError: () => setIsTextMode(true),
  });

  const handleBeginRecording = () => {
    beginRecording();
    setIsTextMode(false);
  };

  if (hasConversationEnded) {
    return (
      <Link href="/" className="btn btn-outline btn-primary btn-block">
        Start a new conversation
      </Link>
    );
  }

  return (
    <>
      <AudioVisualizer
        isTextMode={isTextMode}
        canvasRef={canvasRef}
        mediaStream={mediaInputStream}
        isProcessingResponse={isProcessingResponse}
        isRecording={isRecording}
      />
      <div className="w-full">
        {isRecording || isProcessingResponse || isBotSpeaking ? (
          <CompleteRecording
            onRecordEnd={handleSpeechSubmission}
            isDisabled={isProcessingResponse || isBotSpeaking}
          />
        ) : (
          children(handleBeginRecording)
        )}
      </div>
    </>
  );
}
