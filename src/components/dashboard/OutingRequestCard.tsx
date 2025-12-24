"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OutingRequestCard() {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => router.push("/student/outing")}
            className="h-full rounded-[2.5rem] border border-latte-medium bg-[#efe7df]/70 backdrop-blur-md p-10 shadow-xl shadow-coffee-900/[0.05] flex flex-col justify-between group cursor-pointer transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-2xl relative overflow-hidden"
        >
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/20 group-hover:bg-white/10 transition-colors" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 shadow-sm font-sans">
                        🌱
                    </div>
                    <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                        Stay Connected
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Request Pass</h3>
                <p className="text-sm text-mocha/80 group-hover:text-[#f5efe6]/80 font-medium leading-relaxed mb-6 font-sans transition-colors">
                    Need to step out for a while? Easily apply for local or home outings here.
                </p>

                {/* Mini Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 group-hover:bg-white/5 border border-mocha/5 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-caramel group-hover:bg-[#f5efe6] animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-mocha group-hover:text-[#f5efe6] font-sans transition-colors">Apply Anytime</span>
                </div>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between group/btn">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push("/student/outing");
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-mocha to-coffee-dark group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-mocha/20 transition-all font-sans"
                >
                    Request Pass
                </button>
                <div className="w-8 h-8 rounded-full border border-mocha/10 group-hover:border-[#f5efe6]/20 flex items-center justify-center group-hover:translate-x-2 transition-all duration-500">
                    <span className="text-mocha group-hover:text-[#f5efe6] text-sm font-sans transition-colors">→</span>
                </div>
            </div>
        </motion.div>
    );
}
