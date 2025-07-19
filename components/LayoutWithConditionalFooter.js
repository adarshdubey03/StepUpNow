"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function LayoutWithConditionalFooter({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <div className="h-16" />
      {children}
      {!isDashboard && <FooterWrapper />}
    </>
  );
}
