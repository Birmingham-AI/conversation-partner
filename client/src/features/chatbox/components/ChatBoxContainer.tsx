import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type RefObject,
} from "react";
import clsx from "clsx";
import { type ConversationItem } from "@/features/conversation";
import {
  AnalyzeResponseModal,
  openAnalyzeResponseModal,
  getAnalyzeTarget,
  type AnalyzeResponseInput,
} from "@/features/analyze-response";
import { BotChatBubble } from "./chat-bubble/BotChatBubble";
import { UserChatBubble } from "./chat-bubble/UserChatBubble";
import { TypingIndicator } from "./chat-bubble/TypingIndicator";
import { useChatboxSize } from "..";

export type ChatWindowProps = {
  isTextMode: boolean;
  isResponding: boolean;
  isAudioPlaying: boolean;
  responseContainerRef: RefObject<HTMLDivElement>;
  chatHistory: ConversationItem[];
  onAudioPlay: (audio: HTMLAudioElement) => void;
};

export function ChatBoxContainer({
  isTextMode,
  isResponding,
  isAudioPlaying,
  chatHistory,
  responseContainerRef,
  onAudioPlay,
}: ChatWindowProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const height = useChatboxSize({ responseContainerRef });
  const [analyzeTarget, setAnalyzeTarget] = useState<AnalyzeResponseInput>(
    getAnalyzeTarget(chatHistory)
  );

  const onAnalyzeResponse = useCallback(
    (answerIndex: number) => {
      setAnalyzeTarget(getAnalyzeTarget(chatHistory, answerIndex));
      openAnalyzeResponseModal();
    },
    [chatHistory]
  );

  // Each time a new item is added to the log, scroll to the bottom:
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory.length]);

  return (
    <div
      className={clsx(
        "w-full duration-200 transition-all flex flex-col gap-4 py-3 border border-base-300 rounded-md p-4 mb-4 overflow-auto z-10",
        isTextMode ? "opacity-100" : "opacity-0"
      )}
      style={{ height: `${height}px` }}
      ref={chatContainerRef}
    >
      {chatHistory.map((item) =>
        item.author === "bot" ? (
          <BotChatBubble
            key={item.timestamp}
            chatItem={item}
            onAudioPlay={onAudioPlay}
            isTextMode={isTextMode}
            isAudioPlaying={isAudioPlaying}
          />
        ) : (
          <UserChatBubble
            key={item.timestamp}
            chatItem={item}
            onAnalyzeResponse={onAnalyzeResponse}
          />
        )
      )}
      {isResponding ? <TypingIndicator /> : null}
      <AnalyzeResponseModal
        questionText={analyzeTarget.questionText}
        responseText={analyzeTarget.responseText}
      />
    </div>
  );
}
