"use client";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Select, toSelectOptions } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { useGenerateConversation } from "../hooks/useGenerateConverstation";
import { type GenerateConversationDTO } from "../types";
import { ConversationFormError } from "./ConversationFormError";

const formFieldConfig = [
  { key: "name", label: "Name", type: "text" },
  { key: "age", label: "Age", type: "number" },
  { key: "language", label: "Language", type: "text" },
] as const;

const skillLevelOptions = toSelectOptions([
  "",
  "Beginner",
  "Intermediate",
  "Advanced",
]);

export function GenerateConversationForm() {
  const { mutate, isError, isPending } = useGenerateConversation();
  const formInputRef = useRef<any>({ conversationMode: "text" });

  const updateHandler =
    (key: keyof GenerateConversationDTO) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formInputRef.current[key] =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;
    };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formInputRef.current);
    mutate(formInputRef.current as GenerateConversationDTO);
  };

  return (
    <Card>
      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        {formFieldConfig.map(({ key, label, type }) => (
          <Input
            key={key}
            label={label}
            type={type}
            required
            disabled={isPending}
            onChange={updateHandler(key)}
          />
        ))}
        <Select
          required
          disabled={isPending}
          label="Skill Level"
          options={skillLevelOptions}
          onChange={(value) => (formInputRef.current.skillLevel = value)}
        />
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
