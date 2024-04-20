import { useState } from "react";
import { type ConversationItem } from "@/features/conversation";
import { BotChatAudioAvatar } from "./BotChatAudioAvatar";

export type BotChatBubbleProps = {
  chatItem: ConversationItem;
  isTextMode: boolean;
  onAudioPlay: (audio: HTMLAudioElement) => void;
  isAudioPlaying: boolean;
};

export function BotChatBubble({
  chatItem,
  onAudioPlay,
  isAudioPlaying,
}: BotChatBubbleProps) {
  const [isShowingTranslation, setIsShowingTranslation] = useState(false);

  return (
    <div className="chat chat-start group">
      <BotChatAudioAvatar
        onAudioPlay={onAudioPlay}
        isAudioPlaying={isAudioPlaying}
        audioText={chatItem.displayText}
      />
      <div className="chat-header">
        Language Bot
        <time className="text-xs opacity-50 ml-1">
          {new Date(chatItem.timestamp).toLocaleTimeString()}
        </time>
      </div>
      <div className="chat-bubble">
        {isShowingTranslation ? chatItem.additionalText : chatItem.displayText}
      </div>
      <div
        role="button"
        className="chat-footer opacity-50 italic hover:opacity-35"
        onClick={() => setIsShowingTranslation((current) => !current)}
      >
        {`${isShowingTranslation ? "Hide" : "Show"} translation`}
      </div>
    </div>
  );
}
