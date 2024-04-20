"use client";
import { useState } from "react";
import {
  type ConversationMode,
  useGeneratedConversationState,
} from "@/features/generate-conversation";
import { ChatBoxContainer, UserResponseInput } from "@/features/chatbox";
import { useAudioQueue } from "../hooks/useAudioQueue";
import { useManagedConversationState } from "../hooks/useManagedConversationState";
import { RecordResponse } from "../../speech/components/RecordResponse";
import { AudioContainer } from "../../speech/components/AudioContainer";
import { SpeechVisualizer } from "../../speech/components/SpeechVisualizer";
import { useRecordResponse } from "../../speech/hooks/useRecordUserInput";

export function ConversationWrapper() {
  const { variables } = useGeneratedConversationState();
  const [conversationMode, setConversationMode] = useState<ConversationMode>(
    variables?.conversationMode ?? "text"
  );

  const { mediaInputStream } = useRecordResponse();

  const { queueAudioForPlayback, isAudioPlaying, activeAudioItem } =
    useAudioQueue();
  const {
    submitResponse,
    chatHistory,
    isResponding,
    hasErrorSubmittingResponse,
  } = useManagedConversationState();

  const isTextMode = conversationMode === "text";

  return (
    <div className="flex-1 flex flex-col h-full">
      <SpeechVisualizer
        isTextMode={isTextMode}
        audioSrc={activeAudioItem}
        mediaInputStream={mediaInputStream}
      />
      <button
        onClick={() =>
          setConversationMode((current) =>
            current === "text" ? "speech" : "text"
          )
        }
      >
        toggle textmode
      </button>
      <div>{conversationMode}</div>
      <ChatBoxContainer
        isTextMode={isTextMode}
        onAudioPlay={queueAudioForPlayback}
        chatHistory={chatHistory}
        isResponding={isResponding}
        isAudioPlaying={isAudioPlaying}
      >
        <UserResponseInput
          onSubmit={submitResponse}
          isResponding={isResponding}
          hasResponseError={hasErrorSubmittingResponse}
        />
      </ChatBoxContainer>
      {/* <AudioContainer
        submitResponse={submitResponse}
        chatHistory={chatHistory}
        isResponding={isResponding}
        hasErrorSubmittingResponse={hasErrorSubmittingResponse}
      /> */}
    </div>
  );
}
