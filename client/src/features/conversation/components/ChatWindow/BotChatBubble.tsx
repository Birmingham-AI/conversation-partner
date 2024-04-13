import { useState } from "react";
import { FaRobot, FaPlay } from "react-icons/fa";
import { Button } from "@/components/Button";
import { useTextToAudio } from "../../hooks/useTextToAudio";
import { type ConversationItem } from "../../types";

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
  const { data: audio, isError } = useTextToAudio(chatItem.displayText);

  const isAudioDisabled = !audio || isAudioPlaying || isError;
  const handleAudioPlay = () => audio && onAudioPlay(audio);

  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="rounded-full bg-accent p-2">
          <FaRobot className="text-accent-content text-2xl" />
        </div>
      </div>
      <div className="chat-header">
        Language Bot
        <time className="text-xs opacity-50 ml-1">
          {new Date(chatItem.timestamp).toLocaleTimeString()}
        </time>
      </div>
      <div className="chat-bubble">
        <span className="pr-1">
          <Button
            className="btn-xs btn-circle"
            disabled={isAudioDisabled}
            onClick={handleAudioPlay}
          >
            <FaPlay className="w-2 h-2" />
          </Button>
        </span>
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
