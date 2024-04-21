import {
  type ResponseToUserAnswer,
  type ConversationItem,
} from "@/features/conversation";
import { RecordResponse } from "./RecordResponse";
import { useAudioToText } from "../hooks/useAudioToText";
import { useRecordResponse } from "../hooks/useRecordUserInput";
import { SpeechVisualizer } from "./SpeechVisualizer";

export type AudioContainerProps = {
  isTextMode: boolean;
  setIsTextMode: (isTextMode: boolean) => void;
  submitResponse: (response: string) => Promise<ResponseToUserAnswer>;
  isAudioPlaying: boolean;
  chatHistory: ConversationItem[];
  isResponding: boolean;
  hasErrorSubmittingResponse: boolean;
  activeAudioItem?: HTMLAudioElement;
};

export function AudioContainer({
  submitResponse,
  setIsTextMode,
  isTextMode,
  chatHistory,
  isResponding,
  hasErrorSubmittingResponse,
  isAudioPlaying,
}: AudioContainerProps) {
  const { beginRecording, completeRecording, isRecording, mediaInputStream } =
    useRecordResponse();

  const { mutateAsync: convertSpeechToText, isPending: isProcessingSpeech } =
    useAudioToText();

  const handleSpeechResponse = async () => {
    try {
      const blob = await completeRecording();
      const responseText = await convertSpeechToText(blob);
      const questionResponse = await submitResponse(responseText.text);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecordingDisabled =
    isProcessingSpeech || isResponding || !!isAudioPlaying || isRecording;

  return (
    <>
      <SpeechVisualizer
        mediaInputStream={mediaInputStream}
        isRecording={isRecording}
        isTextMode={isTextMode}
      />
      <RecordResponse
        onRecord={() => {
          setIsTextMode(false);
          beginRecording();
        }}
        onRecordEnd={async () => {
          await handleSpeechResponse();
          setIsTextMode(true);
        }}
        isDisabled={isRecordingDisabled}
        isRecording={isRecording}
      />
    </>
  );
}
