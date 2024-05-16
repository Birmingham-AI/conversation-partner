import { type TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function TextArea({
  label,
  className,
  ...textAreaProps
}: TextAreaProps) {
  return (
    <label className="form-control">
      {label ? (
        <div className="label pl-1 pb-1 p-0">
          <span className="label-text">{label}</span>
        </div>
      ) : null}
      <textarea
        className={clsx("textarea textarea-bordered", className)}
        {...textAreaProps}
      />
    </label>
  );
}
