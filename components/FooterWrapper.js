"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const hideFooter = pathname === "/login" || pathname === "/Signup";

  if (hideFooter) return null;

  return <Footer />;
}
