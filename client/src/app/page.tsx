import { GenerateConversationForm } from "@/features/GenerateConversation/components/GenerateConversationForm";

export default function Home() {
  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-md">
        <GenerateConversationForm />
      </div>
    </div>
  );
}
