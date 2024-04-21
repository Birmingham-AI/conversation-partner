import {
  type DetailedHTMLProps,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
  children?: ReactNode;
};

export function Button({
  className,
  children,
  loading,
  ...buttonProps
}: ButtonProps) {
  return (
    <button className={clsx("btn", className)} type="button" {...buttonProps}>
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        children
      )}
    </button>
  );
}
