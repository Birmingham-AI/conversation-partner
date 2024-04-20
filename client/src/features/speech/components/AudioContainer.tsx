import { type ConversationItem } from "@/features/conversation";
import { RecordResponse } from "./RecordResponse";
import { useAudioToText } from "../hooks/useAudioToText";
import { useRecordResponse } from "../hooks/useRecordUserInput";

export type AudioContainerProps = {
  submitResponse: (response: string) => void;
  chatHistory: ConversationItem[];
  isResponding: boolean;
  hasErrorSubmittingResponse: boolean;
  activeAudioItem?: HTMLAudioElement;
};

export function AudioContainer({
  submitResponse,
  chatHistory,
  isResponding,
  hasErrorSubmittingResponse,
  activeAudioItem,
}: AudioContainerProps) {
  const { beginRecording, completeRecording, isRecording } =
    useRecordResponse();

  const { mutate: convertSpeechToText, isPending: isProcessingSpeech } =
    useAudioToText({
      onSuccess: ({ text }) => submitResponse(text),
    });

  const isRecordingDisabled =
    isProcessingSpeech || isResponding || !!activeAudioItem;

  const handleRecordingEnd = async () => {
    const recordingBlob = await completeRecording();
    const test = global.window.URL.createObjectURL(recordingBlob);
    new Audio(test).play();
    convertSpeechToText(recordingBlob);
  };

  return (
    <RecordResponse
      onRecord={beginRecording}
      onRecordEnd={handleRecordingEnd}
      isDisabled={isRecordingDisabled}
      isRecording={isRecording}
    />
  );
}
