import {
  forwardRef,
  type ComponentType,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";
import clsx from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ComponentType<HTMLAttributes<HTMLDivElement>>;
  label?: string;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { icon: Icon, className, disabled, label, wrapperClassName, ...inputProps },
  ref
) {
  return (
    <label className={wrapperClassName}>
      {label ? <span className="label-text pl-1 pb-1">{label}</span> : null}
      <div
        className={clsx(
          "input input-bordered flex items-center",
          disabled && "input-disabled",
          className
        )}
      >
        <input className="grow" disabled={disabled} {...inputProps} ref={ref} />
        {Icon ? <Icon /> : null}
      </div>
    </label>
  );
});

Input.displayName = "Input";
