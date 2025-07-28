"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Who are the mentors?",
    answer:
      "Mentors are students from IITs, NITs, and other top colleges who’ve cracked internships and placements recently. They guide you based on real experience.",
  },
  {
    question: "Is every session personalized?",
    answer:
      "Yes! Each session is 1-on-1 and tailored to your goals, doubts, and prep stage — no generic advice, only relevant strategies.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Each mentorship session is just ₹349. It’s affordable, direct, and practical — with the mentor receiving a fair share for their time.",
  },
  {
    question: "How do I join the community?",
    answer:
      "Click the 'Join the Community' button on the homepage. You’ll get access to a WhatsApp group with driven peers, resources, and real-time updates.",
  },
  {
    question: "What if I’m not satisfied with a session?",
    answer:
      "We take feedback seriously. If something goes wrong, contact us through the community and we’ll work to resolve the issue promptly.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-black border-t border-gray-700 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Got questions? We’ve answered the most common ones below.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-700 rounded-xl p-5 bg-gray-900/60"
            >
              <button
                className="w-full flex justify-between items-center text-left cursor-pointer"
                onClick={() => toggle(idx)}
              >
                <span className="text-xl font-medium text-white">{faq.question}</span>
                <span className="text-gray-400 text-3xl font-bold">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-gray-300 text-xl leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
