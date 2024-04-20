import { FaUser } from "react-icons/fa";
import { type ConversationItem } from "@/features/conversation";

export type BotChatBubbleProps = {
  chatItem: ConversationItem;
  onAnalyzeResponse: (questionIndex: number) => void;
};

export function UserChatBubble({
  chatItem,
  onAnalyzeResponse,
}: BotChatBubbleProps) {
  const handleAnalyzeResponse = () =>
    typeof chatItem.questionIndex === "number" &&
    onAnalyzeResponse(chatItem.questionIndex);

  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="rounded-full bg-secondary p-2">
          <FaUser className="text-secondary-content text-2xl" />
        </div>
      </div>
      <div className="chat-header">
        You
        <time className="text-xs opacity-50 ml-1">
          {new Date(chatItem.timestamp).toLocaleTimeString()}
        </time>
      </div>
      <div className="chat-bubble">{chatItem.displayText}</div>
      <div
        role="button"
        onClick={handleAnalyzeResponse}
        className="chat-footer opacity-50 italic hover:opacity-35"
      >
        How did I do?
      </div>
    </div>
  );
}
