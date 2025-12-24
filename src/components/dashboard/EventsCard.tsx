"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function EventsCard() {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => router.push('/student/events')}
            className="h-full rounded-[2.5rem] border border-latte-medium bg-[#efe7df]/70 backdrop-blur-md p-10 shadow-xl shadow-coffee-900/[0.05] flex flex-col justify-between group cursor-pointer transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-2xl relative overflow-hidden"
        >
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/20 group-hover:bg-white/10 transition-colors" />

            {/* Decorative Dot Pattern Overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
                <div className="grid grid-cols-4 gap-3">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-coffee-900 group-hover:bg-[#f5efe6] transition-colors" />
                    ))}
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm font-sans">
                        🎭
                    </div>
                    <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                        Life at Dorm
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Events & Clubs</h3>
                <p className="text-sm text-mocha/80 group-hover:text-[#f5efe6]/80 font-medium leading-relaxed mb-6 font-sans transition-colors">
                    What’s happening on campus? Join the buzz, discover workshops, and clubs.
                </p>

                {/* Featured "Poster" Card */}
                <div className="relative group/poster">
                    <div className="p-4 rounded-2xl bg-white/40 group-hover:bg-white/10 text-[#2C1810] group-hover:text-[#f5efe6] shadow-lg overflow-hidden relative border border-[#2C1810]/10 group-hover:border-white/10 transition-all duration-300">
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#2C1810]/5 group-hover:bg-white/10 rounded-full blur-xl group-hover/poster:scale-150 transition-all duration-1000" />
                        <h4 className="font-serif italic text-lg leading-tight mb-2 transition-colors">Weekend Jazz Night</h4>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold transition-colors">Central Lawn • 7:00 PM</p>
                    </div>
                    {/* Horizontal Scroll Indicators */}
                    <div className="mt-4 flex justify-center items-center gap-2">
                        <div className="w-5 h-1 rounded-full bg-mocha group-hover:w-8 transition-all duration-500" />
                        <div className="w-1 h-1 rounded-full bg-latte-medium" />
                        <div className="w-1 h-1 rounded-full bg-latte-medium" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between group/btn">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push('/student/events');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-mocha to-coffee-dark group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-mocha/20 transition-all font-sans"
                >
                    Explore Buzz
                </button>
                <span className="text-mocha group-hover:text-[#f5efe6] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all font-black font-sans">→</span>
            </div>
        </motion.div>
    );
}
