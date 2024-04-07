import clsx from "clsx";

export type ConversationFormErrorProps = {
  isError: boolean;
  errorMessage?: string;
};

export function ConversationFormError({
  isError,
  errorMessage = "Sorry, something went wrong. Ensure all answers are provided and try again.",
}: ConversationFormErrorProps) {
  return (
    <p
      className={clsx(
        "text-error transition-all duration-300",
        isError ? "opacity-100 h-full" : "opacity-0 h-0"
      )}
    >
      {errorMessage}
    </p>
  );
}
