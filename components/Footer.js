"use client";
import React from "react";
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
          <h1 className="text-3xl font-bold">StepUpNow</h1>
          <p className="text-gray-200 mb-16 text-lg leading-relaxed">
            India's first community-based mentorship platform that connects freshers with placed seniors to help them step up with guidance, confidence, and clarity.
          </p>
        </div>

        {/* Footer Columns (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="font-semibold mb-6 text-xl">Explore</h4>
            <ul className="space-y-3 text-base text-gray-300">
              <li><a href="/">Home</a></li>
              <li><a href="/mentors">Mentors</a></li>
              <li><a href="/mentorsignup">Become a Mentor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-xl">Connect</h4>
            <ul className="space-y-3 text-base text-gray-300">
              <li><a href="/contact">Contact</a></li>
              <li><a href="mailto:support@stepupnow.in">Email Support</a></li>
              <li><a href="/community">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-xl">Legal</h4>
            <ul className="space-y-3 text-base text-gray-300">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons + Language */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 gap-6">
          <div className="flex flex-wrap gap-10 text-2xl text-gray-300">
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-medium">
          &copy; {new Date().getFullYear()} StepUpNow. All rights reserved. <br />
          Built with ❤️ by <span className="text-white font-lg">Adarsh Dubey</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
