import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "⚽️ EURO 2024 ⚽️",
  description: "Your favourite footballer's favourite football blog!",
  keywords: [
    "EURO 2024",
    "European Championship 2024",
    "Football EURO 2024",
    "EURO 2024 schedule",
    "EURO 2024 groups",
    "EURO 2024 team squads",
    "Poland EURO 2024",
    "Germany EURO 2024",
    "Spain EURO 2024",
    "France EURO 2024",
    "Italy EURO 2024",
    "EURO 2024 matches",
    "EURO 2024 results",
    "EURO 2024 fixtures",
    "EURO 2024 final",
    "EURO 2024 tickets",
    "EURO 2024 top scorers",
    "EURO 2024 stars",
    "EURO 2024 young talents",
    "EURO 2024 injuries",
    "EURO 2024 stadiums",
    "EURO 2024 host cities",
    "EURO 2024 venues",
    "EURO history",
    "EURO 2024 trivia",
    "EURO 2024 tactical analysis",
    "EURO 2024 comments and opinions"
  ].join(", "),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
