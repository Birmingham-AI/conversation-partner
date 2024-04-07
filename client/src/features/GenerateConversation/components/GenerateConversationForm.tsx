"use client";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TextArea } from "@/components/TextArea";
import { useGenerateConversation } from "../hooks/useGenerateConverstation";
import { type GenerateConversationDTO } from "../types";
import { ConversationFormError } from "./ConversationFormError";

const formFieldConfig = [
  { key: "name", label: "Name", type: "text", placeholder: undefined },
  { key: "age", label: "Age", type: "number", placeholder: undefined },
  { key: "language", label: "Language", type: "text", placeholder: undefined },
  {
    key: "skillLevel",
    label: "Skill Level",
    type: "text",
    placeholder: "Beginner, Advanced, etc",
  },
] as const;

export function GenerateConversationForm() {
  const { mutate, isError, isPending } = useGenerateConversation();
  const formInputRef = useRef<any>({});

  const updateHandler =
    (key: keyof GenerateConversationDTO) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formInputRef.current[key] =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;
    };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(formInputRef.current as GenerateConversationDTO);
  };

  return (
    <Card className="transition-all duration-300">
      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        {formFieldConfig.map(({ key, label, type, placeholder }) => (
          <Input
            key={key}
            label={label}
            type={type}
            required
            disabled={isPending}
            placeholder={placeholder}
            onChange={updateHandler(key)}
          />
        ))}
        <TextArea
          rows={3}
          placeholder="Anything you'd like to talk about"
          className="resize-none"
          label="Interests"
          disabled={isPending}
          required
          onChange={updateHandler("interests")}
        />
        <Button className="btn-primary" type="submit" loading={isPending}>
          Get Started
        </Button>
      </form>
      <ConversationFormError isError={isError} />
    </Card>
  );
}
