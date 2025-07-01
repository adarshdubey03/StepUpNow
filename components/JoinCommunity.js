"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const JoinCommunity = () => {
    const router = useRouter();

    return (
        <div>
            <section id="join" className="py-16 bg-black text-white border-t border-gray-700">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

                    {/* Left: Text Content */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white">Join the Community</h3>
                        <p className="text-gray-300 text-lg max-w-md">
                            Step into a curated group of driven students just like you — all aiming for top internships and placements.
                            Stay inspired by what your peers are learning, building, and achieving, and get real-time updates on how students
                            from IITs, NITs, and other top institutes are making progress.
                        </p>
                        <button
                            onClick={() => router.push('/JoinPage')}
                            className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition text-lg font-medium inline-block cursor-pointer"
                        >
                            Join the Community
                        </button>
                    </div>

                    <div className="w-full h-96 border border-gray-500 rounded-xl flex items-center justify-center bg-gray-900">
                        <span className="text-gray-400">[ Image Placeholder ]</span>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default JoinCommunity;
