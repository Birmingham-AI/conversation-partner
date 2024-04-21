"use client";
import { useState } from "react";
import { ChatBoxContainer } from "@/features/chatbox";
import { AudioContainer, useRecordResponse } from "@/features/speech";
import { useAudioQueue } from "../hooks/useAudioQueue";
import { useManagedConversationState } from "../hooks/useManagedConversationState";
import { ResponseErrorAlert } from "./ResponseErrorAlert";
import { UserResponseInput } from "./UserResponseInput";

export function ConversationWrapper() {
  const [isTextMode, setIsTextMode] = useState(true);
  const { queueAudioForPlayback, isAudioPlaying } = useAudioQueue();
  const {
    submitResponse,
    submitResponseAsync,
    chatHistory,
    isResponding,
    hasErrorSubmittingResponse,
    hasConversationEnded,
  } = useManagedConversationState();

  const { beginRecording, completeRecording, isRecording, mediaInputStream } =
    useRecordResponse();

  const handleBeginRecording = () => {
    beginRecording();
    setIsTextMode(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center h-full py-3 px-6 md:px-10 lg:px-16">
      {hasErrorSubmittingResponse ? <ResponseErrorAlert /> : null}
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
          isAudioPlaying={isAudioPlaying}
          onRecordBegin={handleBeginRecording}
          hasConversationEnded={hasConversationEnded}
          chatItemTotal={chatHistory.length}
        />
      </ChatBoxContainer>
      <AudioContainer
        completeRecording={completeRecording}
        submitResponse={submitResponseAsync}
        setIsTextMode={setIsTextMode}
        isRecording={isRecording}
        isTextMode={isTextMode}
        isAudioPlaying={isAudioPlaying}
        mediaInputStream={mediaInputStream}
      />
    </div>
  );
}
