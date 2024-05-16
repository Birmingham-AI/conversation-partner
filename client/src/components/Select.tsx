import clsx from "clsx";
import { type DetailedHTMLProps, type SelectHTMLAttributes } from "react";

export type SelectOption<T> = {
  display: string;
  value: T;
};

export type SelectProps<T> = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "onChange"
> & {
  options: SelectOption<T>[];
  label?: string;
  onChange?: (value: T) => void;
};

/**
 * Util to map values to select options if the display and value match.
 */
export const toSelectOptions = <T extends string>(
  items: T[]
): SelectOption<T>[] => items.map((value) => ({ value, display: value }));

export function Select<T extends string>({
  className,
  options,
  onChange,
  label,
  ...selectProps
}: SelectProps<T>) {
  return (
    <label className="form-control">
      {label ? (
        <div className="label pl-1 pb-1 p-0">
          <span className="label-text">{label}</span>
        </div>
      ) : null}

      <select
        {...selectProps}
        className={clsx("select select-bordered", className)}
        onChange={(e) => onChange?.(e.target.value as T)}
      >
        {options.map(({ value, display }) => (
          <option value={value} key={value}>
            {display}
          </option>
        ))}
      </select>
    </label>
  );
}
