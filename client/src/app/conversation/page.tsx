"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useGeneratedConversationState } from "@/features/generate-conversation";
import { ConversationWrapper } from "@/features/conversation";

export default function ConversationPage() {
  const router = useRouter();
  const conversation = useGeneratedConversationState();

  // If the user hasn't generated a conversation yet, send them back to the home page:
  useLayoutEffect(() => {
    if (!conversation) {
      router.push("/");
    }
  }, [conversation, router]);

  return <ConversationWrapper />;
}
