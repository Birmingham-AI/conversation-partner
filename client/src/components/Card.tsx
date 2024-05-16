import { type ReactNode } from "react";
import clsx from "clsx";

export type CardProps = {
  children: ReactNode;
  className?: string;
  cardTitle?: string;
};

export function Card({ children, className, cardTitle }: CardProps) {
  return (
    <div
      className={clsx(
        "card",
        className,
        "shadow-lg bg-base-100 border border-base-200"
      )}
    >
      <div className="card-body">
        {cardTitle ? <h2 className="card-title">{cardTitle}</h2> : null}
        {children}
      </div>
    </div>
  );
}
