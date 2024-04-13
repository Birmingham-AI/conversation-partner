import { FaUser } from "react-icons/fa";
import { type ConversationItem } from "../../types";

export type BotChatBubbleProps = {
  chatItem: ConversationItem;
};

export function UserChatBubble({ chatItem }: BotChatBubbleProps) {
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
        className="chat-footer opacity-50 italic hover:opacity-35"
      >
        How did I do?
      </div>
    </div>
  );
}
