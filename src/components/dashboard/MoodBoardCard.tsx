"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function MoodBoardCard() {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => router.push('/student/mood')}
            className="h-full rounded-[2.5rem] border border-latte-medium bg-[#efe7df]/70 backdrop-blur-md p-10 shadow-xl shadow-coffee-900/[0.05] flex flex-col justify-between group cursor-pointer transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-2xl relative overflow-hidden"
        >
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/20 group-hover:bg-white/10 transition-colors" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-all duration-500 group-hover:scale-110 font-sans"
                    >
                        🧠
                    </motion.div>
                    <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                        Mindful Space
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Mood Board</h3>
                <p className="text-sm text-mocha/80 group-hover:text-[#f5efe6]/80 font-medium leading-relaxed mb-6 font-sans transition-colors">
                    How has today been? Take a moment to reflect and track your wellbeing.
                </p>

                <div className="p-5 rounded-3xl bg-white/40 group-hover:bg-white/5 border border-mocha/10 italic text-mocha/70 group-hover:text-[#f5efe6]/70 text-[13px] leading-snug font-serif shadow-inner transition-colors">
                    "Step by step, day by day, you're growing into your best self."
                </div>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between group/btn">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push('/student/mood');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-mocha to-coffee-dark group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-mocha/20 transition-all font-sans"
                >
                    Check-in
                </button>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    <span className="w-2 h-2 rounded-full bg-caramel group-hover:bg-[#f5efe6]/40"></span>
                    <span className="w-2 h-2 rounded-full bg-caramel group-hover:bg-[#f5efe6]/60"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-caramel group-hover:bg-[#f5efe6]"></span>
                </div>
            </div>
        </motion.div>
    );
}
