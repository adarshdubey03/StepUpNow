"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // If on login or signup, hide buttons
  const hideButtons = pathname === "/login" || pathname === "/Signup";

  return (
    <div>
      <header className="w-full bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-3xl font-extrabold tracking-tight text-white hover:text-gray-300 transition duration-200">
            StepUpNow
          </Link>

          {!hideButtons && (
            <nav className="space-x-6 text-sm font-medium flex items-center">
              <Link href="/" className="text-gray-300 hover:text-white transition duration-200">
                Home
              </Link>

              {status === "loading" ? (
                <span className="text-gray-400">Loading...</span>
              ) : session?.user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transform transition duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/mentors"
                    className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transform transition duration-200"
                  >
                    Book a Session
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/Signup"
                    className="text-gray-300 hover:text-white transition duration-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transform transition duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
