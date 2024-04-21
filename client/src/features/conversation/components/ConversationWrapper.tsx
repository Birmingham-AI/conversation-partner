"use client";
import { useState } from "react";
import { ChatBoxContainer, UserResponseInput } from "@/features/chatbox";
import { AudioContainer } from "@/features/speech";
import { useAudioQueue } from "../hooks/useAudioQueue";
import { useManagedConversationState } from "../hooks/useManagedConversationState";

export function ConversationWrapper() {
  const [isTextMode, setIsTextMode] = useState(true);
  const { queueAudioForPlayback, isAudioPlaying } = useAudioQueue();
  const {
    submitResponse,
    submitResponseAsync,
    chatHistory,
    isResponding,
    hasErrorSubmittingResponse,
  } = useManagedConversationState();

  return (
    <div className="flex-1 flex flex-col h-full">
      <button onClick={() => setIsTextMode((current) => !current)}>
        toggle textmode
      </button>
      <div>{isTextMode ? "text" : "speech"}</div>
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
      <button onClick={() => submitResponseAsync("testertime")}>test</button>
      <AudioContainer
        isTextMode={isTextMode}
        setIsTextMode={setIsTextMode}
        submitResponse={submitResponseAsync}
        chatHistory={chatHistory}
        isResponding={isResponding}
        isAudioPlaying={isAudioPlaying}
        hasErrorSubmittingResponse={hasErrorSubmittingResponse}
      />
    </div>
  );
}
