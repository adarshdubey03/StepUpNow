"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const JoinCommunity = () => {
    const router = useRouter();

    return (
        <section id="join" className="py-16 bg-black text-white border-t border-gray-700 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Heading for mobile */}
                <h3 className="text-3xl font-bold text-white text-center mb-10 md:hidden">
                    Join the Community
                </h3>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">

                    {/* IMAGE */}
                    <div className="w-full h-80 md:h-96 relative border border-gray-500 rounded-xl bg-gray-900 overflow-hidden">
                        <Image
                            src="/joingroup.jpg"
                            alt="Join the Community"
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* TEXT */}
                    <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
                        {/* Heading for desktop */}
                        <h3 className="hidden md:block text-3xl font-bold text-white">
                            Join the Community
                        </h3>
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
                </div>
            </div>
        </section>
    );
}

export default JoinCommunity;
