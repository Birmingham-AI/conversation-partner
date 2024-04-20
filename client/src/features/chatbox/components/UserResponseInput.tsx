import { useState, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export type UserResponseInputProps = {
  onSubmit: (response: string) => void;
  isResponding: boolean;
  hasResponseError: boolean;
};

export function UserResponseInput({
  onSubmit,
  isResponding,
  hasResponseError,
}: UserResponseInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input && !isResponding) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form className="flex gap-2 w-full items-center" onSubmit={handleSubmit}>
      <Input
        wrapperClassName="flex-grow"
        disabled={isResponding}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button className="btn-primary" type="submit" disabled={isResponding}>
        <FiSend className="text-2xl" />
      </Button>
    </form>
  );
}
