"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const hideButtons = pathname === "/login" || pathname === "/Signup";

  return (
    <header className="w-full bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800 shadow-lg z-50 fixed top-0 left-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white hover:text-gray-300 transition"
        >
          StepUpNow
        </Link>

        {!hideButtons && (
          <>
            {/* Desktop */}
            <nav className="hidden md:flex space-x-6 text-sm font-medium items-center">
              <Link href="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              {status === "loading" ? (
                <span className="text-gray-400">Loading...</span>
              ) : session?.user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/mentors"
                    className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition"
                  >
                    Book a Session
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/Signup"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile */}
            <div className="md:hidden flex items-center space-x-2">
              {session?.user && (
                <>
                  <Link
                    href="/mentors"
                    className="inline-block bg-white text-black font-semibold px-3 py-1.5 text-sm rounded-md shadow-md hover:bg-gray-100 hover:scale-105 transition"
                  >
                    Book Session
                  </Link>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-7 h-7" />}
                  </button>
                </>
              )}
              {!session?.user && (
                <>
                  <Link
                    href="/Signup"
                    className="text-gray-300 text-sm hover:text-white transition"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="inline-block bg-white text-black font-semibold px-3 py-1.5 text-sm rounded-md shadow-md hover:bg-gray-100 hover:scale-105 transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Slide down full screen under navbar */}
      {menuOpen && session?.user && (
        <div
          className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-black bg-opacity-95 flex flex-col items-start pl-4 pt-6 space-y-6 text-2xl sm:text-3xl font-bold text-gray-300 z-40 animate-fadeScale"
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-white transition"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-white transition"
          >
            Dashboard
          </Link>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeScale {
          animation: fadeScale 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
