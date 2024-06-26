import { useState, useRef, useEffect, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa6";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export type UserResponseInputProps = {
  onSubmit: (response: string) => void;
  onRecordBegin: () => void;
  isResponding: boolean;
  isAudioPlaying: boolean;
  chatItemTotal: number;
};

export function UserResponseInput({
  onSubmit,
  onRecordBegin,
  isResponding,
  isAudioPlaying,
  chatItemTotal,
}: UserResponseInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = isResponding || isAudioPlaying;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input && !isResponding) {
      onSubmit(input);
      setInput("");
    }
  };

  // Everytime a response is provided, focus the input field:
  useEffect(() => {
    inputRef.current?.focus();
  }, [chatItemTotal]);

  return (
    <form
      className="flex gap-2 w-full items-center flex-col sm:flex-row"
      onSubmit={handleSubmit}
    >
      <Input
        ref={inputRef}
        wrapperClassName="flex-grow w-full"
        disabled={isResponding}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button
        className="btn-primary btn-block sm:max-w-fit"
        type="submit"
        disabled={isDisabled || !input}
        aria-label="submit text response"
      >
        <FiSend className="text-2xl" />
      </Button>
      <Button
        className="btn-success btn-block sm:max-w-fit"
        disabled={isDisabled}
        aria-label="speak response"
        onClick={onRecordBegin}
      >
        <FaMicrophone className="text-2xl" />
      </Button>
    </form>
  );
}
