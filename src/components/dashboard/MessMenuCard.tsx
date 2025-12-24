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

function getCurrentMeal() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) return "Breakfast";
    if (hour >= 12 && hour < 16) return "Lunch";
    if (hour >= 16 && hour < 19) return "Snacks";
    if (hour >= 19 && hour < 23) return "Dinner";
    return null;
}

export default function MessMenuCard() {
    const [meal, setMeal] = useState<string | null>(null);
    const [menu, setMenu] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMenu() {
            try {
                const today = DAYS[new Date().getDay()].toLowerCase();
                const currentMeal = getCurrentMeal();

                const ref = doc(db, "messmenu", "weekly");
                const snap = await getDoc(ref);

                if (!snap.exists() || !currentMeal) {
                    setMenu(null);
                    return;
                }

                const data = snap.data();
                const todayKey = Object.keys(data).find(
                    (key) => key.trim().toLowerCase() === today
                );

                if (!todayKey) {
                    setMenu(null);
                    return;
                }

                const dayData = data[todayKey];
                if (!dayData || !dayData[currentMeal]) {
                    setMenu(null);
                    return;
                }

                setMeal(currentMeal);
                setMenu(dayData[currentMeal]);
            } catch (err) {
                console.error("Mess menu fetch failed:", err);
                setMenu(null);
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
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
                        🥣
                    </div>
                    <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                        Kitchen Status
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Today's Selection</h3>
                <p className="text-sm text-mocha/80 group-hover:text-[#f5efe6]/80 font-medium leading-relaxed mb-8 font-sans transition-colors">
                    Hand-crafted meals prepared fresh for your health.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-mocha/10 group-hover:bg-[#f5efe6]/10 transition-colors"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-mocha/40 group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                            {meal || "Next Meal"}
                        </span>
                        <div className="h-[1px] flex-1 bg-mocha/10 group-hover:bg-[#f5efe6]/10 transition-colors"></div>
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            <div className="h-6 w-3/4 bg-mocha/5 group-hover:bg-white/5 animate-pulse rounded-lg" />
                            <div className="h-4 w-full bg-mocha/5 group-hover:bg-white/5 animate-pulse rounded-lg" />
                        </div>
                    ) : menu ? (
                        <div className="text-center">
                            <p className="text-xl font-serif text-coffee-900 group-hover:text-[#f5efe6] leading-tight italic transition-colors">
                                "{menu}"
                            </p>
                        </div>
                    ) : (
                        <div className="text-center italic text-mocha/40 group-hover:text-[#f5efe6]/40 text-sm font-serif transition-colors">
                            The kitchen is currently resting...
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between group/btn">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-mocha to-coffee-dark group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-mocha/20 transition-all font-sans">
                    Weekly Menu
                </button>
                <span className="text-mocha group-hover:text-[#f5efe6] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all font-black font-sans">→</span>
            </div>
        </motion.div>
    );
}
