"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FoodFeedback() {
    const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

    const sentiments = [
        { char: "😞", label: "Poor" },
        { char: "😕", label: "Fair" },
        { char: "😐", label: "Okay" },
        { char: "🙂", label: "Good" },
        { char: "😊", label: "Great" }
    ];

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full rounded-[2.5rem] border border-latte-medium bg-[#efe7df]/70 backdrop-blur-md p-10 shadow-xl shadow-coffee-900/[0.05] flex flex-col justify-between group cursor-pointer transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-2xl relative overflow-hidden"
        >
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/20 group-hover:bg-white/10 transition-colors" />

            <div className="relative">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-all duration-500 group-hover:scale-110 font-sans">
                        🍛
                    </div>
                    <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                        Daily Pulse
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Food Feedback</h3>
                <p className="text-sm text-mocha/80 group-hover:text-[#f5efe6]/80 font-medium leading-relaxed mb-10 font-sans transition-colors">
                    How was your lunch today? Your feedback shapes our kitchen.
                </p>

                <div className="flex justify-between items-center py-6 px-4 rounded-[2rem] bg-white/30 group-hover:bg-white/5 border border-mocha/10 transition-colors">
                    {sentiments.map((s, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedEmoji(index)}
                            className="flex flex-col items-center gap-3 transition-all duration-500 group/item"
                        >
                            <span className={`text-4xl transition-all duration-500 ${selectedEmoji === index
                                ? 'grayscale-0 scale-125 brightness-110 drop-shadow-sm'
                                : 'grayscale opacity-30 group-hover/item:opacity-100 group-hover/item:grayscale-0 group-hover:opacity-60'
                                }`}>
                                {s.char}
                            </span>
                            <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-500 ${selectedEmoji === index ? 'text-mocha group-hover:text-[#f5efe6] opacity-100' : 'text-mocha/20 group-hover:text-[#f5efe6]/20 opacity-0'
                                } font-sans`}>
                                {s.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-mocha/40 group-hover:text-[#f5efe6]/40 italic font-serif transition-colors">
                    {selectedEmoji !== null ? "Thank you for sharing" : "Select a sentiment"}
                </span>
                <div className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-lg font-sans ${selectedEmoji !== null
                    ? 'bg-gradient-to-r from-coffee-dark to-mocha text-white group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] shadow-mocha/20 scale-100'
                    : 'bg-white/40 text-mocha/30 group-hover:bg-white/10 group-hover:text-[#f5efe6]/30 scale-95 opacity-50 cursor-not-allowed'
                    }`}>
                    Submit
                </div>
            </div>
        </motion.div>
    );
}
