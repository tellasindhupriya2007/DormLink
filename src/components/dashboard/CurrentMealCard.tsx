"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function CurrentMealCard() {
    const [menu, setMenu] = useState<string | null>(null);
    const [mealType, setMealType] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const determineMeal = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const currentTime = hours + minutes / 60;

            if (currentTime >= 7 && currentTime <= 9.5) return "Breakfast";
            if (currentTime >= 12 && currentTime <= 14) return "Lunch";
            if (currentTime >= 16 && currentTime <= 17.5) return "Snacks";
            if (currentTime >= 19 && currentTime <= 21.25) return "Dinner";
            return null;
        };

        async function fetchCurrentMeal() {
            const meal = determineMeal();
            setMealType(meal);

            if (!meal) {
                setLoading(false);
                return;
            }

            try {
                const today = DAYS[new Date().getDay()];
                const ref = doc(db, "messmenu", "weekly");
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const data = snap.data();
                    const dayData = data?.[today];
                    setMenu(dayData?.[meal] || null);
                }
            } catch (err) {
                console.error("Current meal fetch failed:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCurrentMeal();
    }, []);

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
                    <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm font-sans">
                        🍱
                    </div>
                    <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                        Dining Now
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Mess Status</h3>

                {loading ? (
                    <div className="space-y-4 mt-4">
                        <div className="h-6 w-3/4 bg-mocha/5 group-hover:bg-white/5 animate-pulse rounded-lg" />
                        <div className="h-10 w-full bg-mocha/5 group-hover:bg-white/5 animate-pulse rounded-2xl" />
                    </div>
                ) : !mealType ? (
                    <div className="mt-4">
                        <p className="text-mocha/60 group-hover:text-[#f5efe6]/60 font-medium italic font-serif transition-colors">The kitchen is closed</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-mocha/40 group-hover:text-[#f5efe6]/40 mt-1 font-sans transition-colors">Reopens at 7:00 AM</p>
                    </div>
                ) : (
                    <div className="mt-4 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coffee-900/10 group-hover:bg-[#f5efe6]/10 border border-coffee-900/20 group-hover:border-[#f5efe6]/20 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-coffee-700 group-hover:bg-[#f5efe6] animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-coffee-900 group-hover:text-[#f5efe6] font-sans transition-colors">{mealType} is Live</span>
                        </div>
                        <h4 className="text-xl font-serif text-coffee-900 group-hover:text-[#f5efe6] leading-tight italic transition-colors">
                            "{menu || "Menu not updated"}"
                        </h4>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between group/btn">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-mocha to-coffee-dark group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-mocha/20 transition-all font-sans">
                    Meal Timings
                </button>
                <span className="text-mocha group-hover:text-[#f5efe6] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all font-black font-sans">→</span>
            </div>
        </motion.div>
    );
}
