"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MentorSignup = () => {
    const router = useRouter();

    return (
        <section className="py-16 bg-black text-white border-t border-gray-700">
            <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 items-center px-6">

                {/* Heading only visible on mobile */}
                <div className="md:hidden text-center mb-4">
                    <h3 className="text-3xl font-bold">Become a Mentor on StepUpNow</h3>
                </div>

                {/* Right: Image */}
                <div className="w-full h-80 md:h-96 border border-gray-500 rounded-xl flex items-center justify-center bg-gray-900 overflow-hidden">
                    <img
                        src="/mentorbecome.jpg"
                        alt="Mentor illustration"
                        className="object-cover w-full h-full rounded-xl"
                    />
                </div>

                {/* Left: Text Content */}
                <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
                    {/* Heading only on desktop */}
                    <h3 className="hidden md:block text-3xl font-bold">
                        Become a Mentor on StepUpNow
                    </h3>
                    <p className="text-gray-300 text-lg max-w-md">
                        Share your knowledge and real-world experiences with students aiming for top internships and placements.
                        Help them navigate their careers, grow their confidence, and make smarter choices — all while getting rewarded for your time.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.push("/mentorsignup")}
                        className="bg-white cursor-pointer text-black px-6 py-3 rounded-md hover:bg-gray-200 transition text-lg font-medium"
                    >
                        Join as a Mentor
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MentorSignup;
