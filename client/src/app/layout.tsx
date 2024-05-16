import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/utils/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Conversation Partner",
  description: "Practice a new language with an AI partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "bg-base-300 flex flex-col justify-center items-center min-h-dvh"
        )}
      >
        <Header />
        <main className="flex-grow flex flex-col w-full max-w-screen-xl bg-base-100">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
