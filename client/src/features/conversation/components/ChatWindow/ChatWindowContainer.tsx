import { useRef, useEffect, type ReactNode } from "react";
import clsx from "clsx";
import { Card } from "@/components/Card";
import { BotChatBubble } from "./BotChatBubble";
import { UserChatBubble } from "./UserChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import {
  AnalyzeResponseModal,
  openAnalyzeResponseModal,
} from "../AnalyzeResponseModal/AnalyzeResponseModal";
import { type ConversationItem } from "../../types";

export type ChatWindowProps = {
  children: ReactNode;
  isTextMode: boolean;
  isResponding: boolean;
  isAudioPlaying: boolean;
  chatHistory: ConversationItem[];
  onAudioPlay: (audio: HTMLAudioElement) => void;
};

export function ChatWindowContainer({
  children,
  isTextMode,
  isResponding,
  isAudioPlaying,
  chatHistory,
  onAudioPlay,
}: ChatWindowProps) {
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // Each time a new item is added to the log, scroll to the bottom:
  useEffect(() => {
    chatHistoryRef.current?.scrollTo({
      top: chatHistoryRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory.length]);

  return (
    <div
      className={clsx(
        "w-full p-6 duration-200 transition-all flex flex-col gap-4 h-full flex-grow",
        isTextMode ? "opacity-100" : "opacity-0 h-0"
      )}
    >
      <div
        className="overflow-y-auto h-[70dvh] w-full border border-base-300 rounded-md p-4"
        ref={chatHistoryRef}
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
            <UserChatBubble key={item.timestamp} chatItem={item} />
          )
        )}
        {isResponding ? <TypingIndicator /> : null}
      </div>
      {children}
      <button onClick={openAnalyzeResponseModal}>hey</button>
      <AnalyzeResponseModal />
    </div>
  );
}
