"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaYoutube,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10 px-8 border-t border-gray-700">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Logo and Description */}
        <div className="space-y-8 max-w-sm">
          <h2 className="text-3xl font-bold">StepUpNow</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Empowering freshers with mentorship from those who’ve made it — real stories, real guidance, real results.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10" role="navigation" aria-label="Footer links">
          <nav aria-label="Explore">
            <h3 className="font-semibold mb-6 text-xl">Explore</h3>
            <ul className="space-y-3 text-base text-gray-300">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/mentors">Mentors</Link></li>
              <li><Link href="/mentorsignup">Become a Mentor</Link></li>
            </ul>
          </nav>
          <nav aria-label="Connect">
            <h3 className="font-semibold mb-6 text-xl">Connect</h3>
            <ul className="space-y-3 text-base text-gray-300">
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="mailto:support@stepupnow.in">Email Support</a></li>
              <li><Link href="/community">Community</Link></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h3 className="font-semibold mb-6 text-xl">Legal</h3>
            <ul className="space-y-3 text-base text-gray-300">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
            </ul>
          </nav>
        </div>

        {/* Social + Language */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 gap-6">
          <div className="flex flex-wrap gap-8 text-2xl text-gray-300" aria-label="Social Media">
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
            <a href="#" aria-label="YouTube" className="hover:text-white"><FaYoutube /></a>
            <a href="#" aria-label="GitHub" className="hover:text-white"><FaGithub /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-base">
            <FaGlobe />
            <span>English</span>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-base">
          &copy; {new Date().getFullYear()} StepUpNow. All rights reserved. <br />
          Built with ❤️ by <span className="text-white">Adarsh Dubey</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
