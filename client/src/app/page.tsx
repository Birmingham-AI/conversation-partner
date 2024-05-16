import { GenerateConversationForm } from "@/features/generate-conversation";

export default function Home() {
  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-md px-3">
        <GenerateConversationForm />
      </div>
    </div>
  );
}
