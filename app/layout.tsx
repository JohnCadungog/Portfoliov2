import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Cadungog — Engineer, Designer, Automation",
  description:
    "Portfolio of John Cadungog: software engineer, graphic and UI/UX designer, and automation builder from Cebu, Philippines.",
};

export const viewport: Viewport = {
  themeColor: "#2B3BE5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
