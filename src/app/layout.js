import { Inter, Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"]
});

export const metadata = {
  title: "Sarvan — Next.js Systems Architect & Full-Stack Engineer",
  description: "High-performance portfolio built with Next.js App Router, Server Actions, WebGPU Compute, and AST Security Auditing.",
  openGraph: {
    title: "Sarvan — Next.js Systems Architect",
    description: "High-performance Next.js App Router architecture and system showcase.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
