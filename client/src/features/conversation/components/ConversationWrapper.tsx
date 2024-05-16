"use client";
import { useState } from "react";
import { ChatBoxContainer } from "@/features/chatbox";
import { useAudioQueue } from "../hooks/useAudioQueue";
import { useManagedConversationState } from "../hooks/useManagedConversationState";
import { ResponseErrorAlert } from "./ResponseErrorAlert";
import { UserResponseWrapper } from "./UserResponseWrapper";
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

  return (
    <div className="flex-1 flex flex-col items-center h-full py-3 px-6 md:px-10 lg:px-16">
      {hasErrorSubmittingResponse ? <ResponseErrorAlert /> : null}
      <ChatBoxContainer
        isTextMode={isTextMode}
        onAudioPlay={queueAudioForPlayback}
        chatHistory={chatHistory}
        isResponding={isResponding}
        isAudioPlaying={isAudioPlaying}
      />
      <UserResponseWrapper
        isTextMode={isTextMode}
        setIsTextMode={setIsTextMode}
        submitResponseAsync={submitResponseAsync}
        hasConversationEnded={hasConversationEnded}
      >
        {(handleBeginRecording) => (
          <UserResponseInput
            onSubmit={submitResponse}
            onRecordBegin={handleBeginRecording}
            isAudioPlaying={isAudioPlaying}
            chatItemTotal={chatHistory.length}
            isResponding={isResponding}
          />
        )}
      </UserResponseWrapper>
    </div>
  );
}
