import {
  type ComponentType,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";
import clsx from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ComponentType<HTMLAttributes<HTMLDivElement>>;
  label?: string;
};

export function Input({
  icon: Icon,
  className,
  disabled,
  label,
  ...inputProps
}: InputProps) {
  return (
    <label>
      <span className="label-text pl-1 pb-1">{label}</span>
      <div
        className={clsx(
          "input input-bordered flex items-center",
          disabled && "input-disabled",
          className
        )}
      >
        <input className="grow" disabled={disabled} {...inputProps} />
        {Icon ? <Icon /> : null}
      </div>
    </label>
  );
}
