import { VscRobot } from "react-icons/vsc";

export function TypingIndicator() {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="rounded-full bg-accent p-2">
          <VscRobot className="text-accent-content text-2xl" />
        </div>
      </div>
      <div className="chat-bubble">
        <span className="loading loading-dots loading-md"></span>
      </div>
    </div>
  );
}
