import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import LayoutWithConditionalFooter from "@/components/LayoutWithConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StepUpNow",
  description: "India’s most peer-driven career community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <LayoutWithConditionalFooter>{children}</LayoutWithConditionalFooter>
        </SessionWrapper>
      </body>
    </html>
  );
}
