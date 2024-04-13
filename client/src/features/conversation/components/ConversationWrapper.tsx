"use client";
import { useState } from "react";
import {
  type ConversationMode,
  useGeneratedConversationState,
} from "@/features/GenerateConversation";
import { useAudioQueue } from "../hooks/useAudioQueue";
import { useManagedConversationState } from "../hooks/useManagedConversationState";
import { ChatWindowContainer } from "./ChatWindow/ChatWindowContainer";
import { UserResponseInput } from "./ChatWindow/UserResponseInput";

export function ConversationWrapper() {
  const { variables } = useGeneratedConversationState();
  const [conversationMode, setConversationMode] = useState<ConversationMode>(
    variables?.conversationMode ?? "text"
  );

  const { queueAudioForPlayback, isAudioPlaying } = useAudioQueue();
  const {
    submitResponse,
    chatHistory,
    isResponding,
    hasErrorSubmittingResponse,
  } = useManagedConversationState();

  const isTextMode = conversationMode === "text";

  return (
    <div className="flex-1 flex flex-col h-full">
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
      <ChatWindowContainer
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
      </ChatWindowContainer>
    </div>
  );
}
