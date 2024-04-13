"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useGeneratedConversationState } from "@/features/GenerateConversation/hooks/useGeneratedConversationState";
import { ConversationWrapper } from "@/features/conversation/components/ConversationWrapper";
// import { useTextToAudio } from "@/features/ChatWindow/hooks/useTextToAudio";

export default function ConversationPage() {
  const router = useRouter();
  const { data: conversation } = useGeneratedConversationState();
  // const { data } = useTextToAudio("hey there, how's it going?");

  // If the user hasn't generated a conversation yet, send them back to the home page:
  useLayoutEffect(
    function checkForConversation() {
      if (!conversation) {
        router.push("/");
      }
      console.log(conversation);
    },
    [conversation, router]
  );

  return <ConversationWrapper />;
}
