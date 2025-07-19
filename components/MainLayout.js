"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FooterWrapper from "./FooterWrapper";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const hideFooter = pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <div className="h-16" />
      {children}
      {!hideFooter && <FooterWrapper />}
    </>
  );
}
