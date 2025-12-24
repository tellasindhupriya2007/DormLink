"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import FoodFeedback from '@/components/FoodFeedback';
import HeroCarousel from '@/components/dashboard/HeroCarousel';
import MessMenuCard from '@/components/dashboard/MessMenuCard';
import CurrentMealCard from '@/components/dashboard/CurrentMealCard';
import OutingRequestCard from '@/components/dashboard/OutingRequestCard';
import LostFoundCard from '@/components/dashboard/LostFoundCard';
import MoodBoardCard from '@/components/dashboard/MoodBoardCard';
import EventsCard from '@/components/dashboard/EventsCard';

import { motion } from 'framer-motion';

export default function StudentDashboard() {
    const router = useRouter();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as any,
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#f4efe9] relative overflow-hidden">
            {/* Deep Coffee & Mocha Gradient Background Layers */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden pb-20">
                {/* Rich Espresso Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#f4efe9] via-[#efe7df] to-[#e8e0d9]" />

                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                        x: [0, 20, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] bg-[#c8a97e]/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, -8, 0],
                        x: [0, -30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#4b3621]/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[#C4A484]/15 rounded-full blur-[80px]"
                />
            </div>

            {/* Subtle Natural Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 p-8 space-y-16 max-w-7xl mx-auto"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-mocha/20 border border-mocha/30 text-[10px] font-black text-mocha uppercase tracking-[0.2em]">
                                Campus Life & Dashboard
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif text-coffee-900 tracking-tight">Your Campus Companion</h1>
                        <p className="text-mocha/70 font-medium text-lg mt-3 font-sans">
                            Welcome back. Everything you need, carefully curated for your stay.
                        </p>
                    </div>
                </motion.div>

                {/* Hero Carousel */}
                <motion.section variants={itemVariants} className="rounded-[3rem] overflow-hidden shadow-2xl shadow-coffee-900/10 border border-latte-medium/30">
                    <HeroCarousel />
                </motion.section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* Food Feedback Widget */}
                    <motion.div variants={itemVariants}>
                        <FoodFeedback />
                    </motion.div>

                    {/* Mess Menu Widget */}
                    <motion.div variants={itemVariants}>
                        <MessMenuCard />
                    </motion.div>

                    {/* Current Meal Widget */}
                    <motion.div variants={itemVariants}>
                        <CurrentMealCard />
                    </motion.div>

                    {/* Outing Request Widget */}
                    <motion.div variants={itemVariants}>
                        <OutingRequestCard />
                    </motion.div>

                    {/* Lost & Found Widget */}
                    <motion.div variants={itemVariants}>
                        <LostFoundCard />
                    </motion.div>

                    {/* Mood Board Widget */}
                    <motion.div variants={itemVariants}>
                        <MoodBoardCard />
                    </motion.div>

                    {/* Events & Clubs Widget */}
                    <motion.div variants={itemVariants}>
                        <EventsCard />
                    </motion.div>

                    {/* Complaints Widget */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={() => router.push("/student/complaints")}
                        className="h-full rounded-[2.5rem] border border-latte-medium bg-[#efe7df]/70 backdrop-blur-md p-10 shadow-xl shadow-coffee-900/[0.05] flex flex-col justify-between group cursor-pointer transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-2xl relative overflow-hidden"
                    >
                        {/* Subtle Inner Highlight */}
                        <div className="absolute inset-x-0 top-0 h-px bg-white/20 group-hover:bg-white/10 transition-colors" />

                        <div className="relative">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-all duration-500 group-hover:scale-110 font-sans">
                                    📋
                                </div>
                                <span className="text-coffee-dark/30 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#f5efe6]/40 transition-colors font-sans">
                                    Support & Resolution
                                </span>
                            </div>

                            <h3 className="text-2xl font-serif text-coffee-900 group-hover:text-[#f5efe6] mb-2 transition-colors">Complaints</h3>
                            <p className="text-sm text-mocha/80 group-hover:text-[#f5efe6]/80 font-medium leading-relaxed mb-6 transition-colors">
                                Facing any issues in your hostel? Report them here for quick resolution.
                            </p>
                        </div>

                        <div className="mt-10 pt-8 border-t border-latte-medium/20 flex items-center justify-between group/btn">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push("/student/complaints");
                                }}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-mocha to-coffee-dark group-hover:from-white group-hover:to-[#f5efe6] group-hover:text-[#3b241c] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-mocha/20 transition-all font-sans"
                            >
                                Raise a Complaint
                            </button>
                            <span className="text-mocha group-hover:text-[#f5efe6] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all font-black font-sans">→</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
