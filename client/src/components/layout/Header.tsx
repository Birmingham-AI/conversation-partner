import Link from "next/link";

export function Header() {
  return (
    <header
      className="w-full bg-base-200 p-4 font-semibold text-base md:text-lg whitespace-nowrap"
      id="header"
    >
      <Link href="/">AI Language Partner</Link>
    </header>
  );
}
