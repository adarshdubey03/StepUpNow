"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MentorSignup = () => {
    const router = useRouter();

    return (
        <section className="py-16 bg-black text-white border-t border-gray-700">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
                {/* Left: Text Content */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold">Become a Mentor on StepUpNow</h3>
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

                {/* Right: Visual with image */}
                <div className="w-full h-96 border border-gray-500 rounded-xl flex items-center justify-center bg-gray-900 overflow-hidden">
                    <img
                        src="/mentorbecome.jpg"
                        alt="Mentor illustration"
                        className="object-cover w-full h-full"
                    />
                </div>

            </div>
        </section>
    );
};

export default MentorSignup;
