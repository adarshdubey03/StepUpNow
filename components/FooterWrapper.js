"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooter =
    pathname === "/login" ||
    pathname === "/Signup" ||
    pathname.startsWith("/dashboard"); // ✅ Hides on dashboard and its subroutes

  if (hideFooter) return null;

  return <Footer />;
}
