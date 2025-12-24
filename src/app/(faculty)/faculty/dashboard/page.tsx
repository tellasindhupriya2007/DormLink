"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FacultyDashboard() {
    const intelCards = [
        { title: "Complaints", value: "12 Open", sub: "4 Resolved Today", icon: "📋" },
        { title: "Student Mood", value: "Positive", sub: "Trending Stable", icon: "🧠" },
        { title: "Mess Feedback", value: "78%", sub: "Satisfaction Score", icon: "🍽️" },
        { title: "Outing Requests", value: "5 Pending", sub: "Requires Action", icon: "🚪" },
        { title: "Upcoming Events", value: "8 Active", sub: "Next: Hackathon 2024", icon: "🎟️" },
        { title: "Engagement", value: "85%", sub: "Daily Active", icon: "⚡" },
    ];

    const outingRequests = [
        { id: 1, name: "Arjun Sharma", guardian: "Approved", time: "Dec 25 · 6:00 PM" },
        { id: 2, name: "Priya Varma", guardian: "Approved", time: "Dec 25 · 5:30 PM" },
        { id: 3, name: "Rohan Das", guardian: "Approved", time: "Dec 26 · 9:00 AM" },
    ];

    const complaints = [
        { id: 1, text: "Low water pressure in Block B", tag: "Plumbing", status: "Pending" },
        { id: 2, text: "Fan not working in Room 102", tag: "Electrical", status: "Resolved" },
        { id: 3, text: "Mess floor needs cleaning", tag: "Cleaning", status: "Pending" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const sectionVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring' as any, stiffness: 50, damping: 20 }
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden font-sans">
            {/* Subtle Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

            {/* Header / Branding */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 pt-12 px-8 max-w-7xl mx-auto flex justify-between items-end"
            >
                <div>
                    <h1 className="text-6xl font-black text-coffee-dark tracking-tighter mb-2">BVRIT</h1>
                    <p className="text-xl font-bold text-[#8C7861]">Dormlink <span className="mx-2 text-latte-medium">•</span> Faculty Dashboard</p>
                    <p className="text-sm font-black text-latte-dark uppercase tracking-[0.3em] mt-2 opacity-60">Campus Intelligence View</p>
                </div>
                <div className="hidden md:block text-right">
                    <div className="w-16 h-16 bg-gradient-to-br from-coffee-dark to-latte-dark rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl">
                        🛡️
                    </div>
                </div>
            </motion.header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 px-8 py-16 space-y-20 max-w-7xl mx-auto"
            >
                {/* 1️⃣ Intelligence Overview Strip (Netflix Rail) */}
                <motion.section variants={sectionVariants}>
                    <h2 className="text-xs font-black text-latte-dark uppercase tracking-widest mb-6 px-1">Live Intelligence Rail</h2>
                    <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-8 px-8 cursor-grab active:cursor-grabbing">
                        {intelCards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="min-w-[280px] bg-white rounded-3xl border border-latte-medium p-8 shadow-sm transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-xl group"
                            >
                                <div className="text-3xl mb-4 transition-all duration-500 group-hover:scale-125 group-hover:brightness-200">{card.icon}</div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:text-[#f5efe6] group-hover:opacity-40 transition-all mb-1">{card.title}</h3>
                                <p className="text-3xl font-black mb-2 transition-colors">{card.value}</p>
                                <p className="text-xs font-bold opacity-50 group-hover:text-[#f5efe6] group-hover:opacity-40 transition-all">{card.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* 2️⃣ Outing Approval Management */}
                    <motion.section variants={sectionVariants} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-coffee-dark tracking-tight">Outing Requests</h2>
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="px-3 py-1 bg-red-100 rounded-full text-[10px] font-black text-red-600 uppercase tracking-wider"
                            >
                                5 Pending
                            </motion.div>
                        </div>
                        <div className="space-y-4">
                            {outingRequests.map((req) => (
                                <motion.div
                                    key={req.id}
                                    whileHover={{ y: -4, x: 4 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="bg-gradient-to-r from-white to-[#F9F7F2] rounded-2xl border border-latte-medium p-6 flex items-center justify-between shadow-sm transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-xl group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-latte-medium/20 group-hover:bg-white/10 rounded-full flex items-center justify-center text-xl transition-colors">👤</div>
                                        <div>
                                            <p className="font-bold text-coffee-dark group-hover:text-[#f5efe6] transition-colors">{req.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight group-hover:text-[#f5efe6]/40 transition-colors">{req.time}</p>
                                            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 group-hover:bg-green-400 italic px-2 py-0.5 rounded-full mt-1 inline-block transition-all">Guardian: Approved</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 bg-green-100 rounded-xl hover:bg-green-200 group-hover:bg-white group-hover:text-[#3b241c] transition-all text-green-700">✔️</button>
                                        <button className="p-3 bg-red-100 rounded-xl hover:bg-red-200 group-hover:bg-red-500 group-hover:text-white transition-all text-red-700">✖️</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* 3️⃣ Complaints Intelligence Panel */}
                    <motion.section variants={sectionVariants} className="space-y-6">
                        <h2 className="text-2xl font-black text-coffee-dark tracking-tight">Recent Complaints</h2>
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-coffee-dark rounded-3xl p-8 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:shadow-coffee-900/40"
                        >
                            {/* Decorative Illustration */}
                            <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 group-hover:rotate-12 transition-transform">📉</div>

                            <div className="space-y-6 relative z-10">
                                {complaints.map((comp) => (
                                    <div key={comp.id} className="flex items-start justify-between border-b border-white/10 pb-4">
                                        <div className="space-y-1">
                                            <p className="text-white font-medium text-sm">"{comp.text}"</p>
                                            <div className="flex gap-2 items-center">
                                                <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full uppercase font-black tracking-widest">{comp.tag}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest ${comp.status === 'Resolved' ? 'bg-green-400/20 text-green-400' : 'bg-gold/20 text-gold'}`}>{comp.status}</span>
                                            </div>
                                        </div>
                                        <button className="text-white/40 hover:text-white transition-colors">➔</button>
                                    </div>
                                ))}
                                <button className="w-full py-4 border-2 border-dashed border-white/20 rounded-2xl text-white/40 text-xs font-black uppercase tracking-widest hover:border-white/40 hover:text-white/60 transition-all">View Analytics Cluster</button>
                            </div>
                        </motion.div>
                    </motion.section>
                </div>

                {/* 4 & 5 Analytics Section */}
                <motion.section variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white rounded-[32px] border border-latte-medium p-10 shadow-sm overflow-hidden relative group transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-xl"
                    >
                        <h2 className="text-xl font-black text-coffee-dark group-hover:text-[#f5efe6] mb-8 transition-colors">Student Mood Trend</h2>
                        <div className="h-40 flex items-end justify-between gap-4">
                            {[40, 60, 45, 75, 90, 80, 85].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-latte-medium to-coffee-dark group-hover:from-white/20 group-hover:to-white/40 rounded-t-xl relative group"
                                >
                                    <div className="absolute inset-x-0 -top-8 text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        {i === 6 ? 'Pos' : 'Neu'}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] font-black text-latte-medium group-hover:text-[#f5efe6]/40 uppercase tracking-[0.2em] transition-colors">
                            <span>Mon</span>
                            <span>Today</span>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-[#EFE9E1] rounded-[32px] border border-latte-medium p-10 shadow-sm relative group overflow-hidden transition-all duration-300 ease-out hover:bg-[#3b241c] hover:text-[#f5efe6] hover:shadow-xl"
                    >
                        <h2 className="text-xl font-black text-coffee-dark group-hover:text-[#f5efe6] mb-8 transition-colors">Mess Analytics</h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black text-coffee-dark group-hover:text-[#f5efe6] uppercase tracking-wider transition-colors">
                                    <span>🥘 Lunch Satisfaction</span>
                                    <span>65%</span>
                                </div>
                                <div className="h-3 bg-white group-hover:bg-white/10 rounded-full p-0.5 transition-colors">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1.5 }} className="h-full bg-coffee-dark group-hover:bg-white rounded-full shadow-inner transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black text-coffee-dark group-hover:text-[#f5efe6] uppercase tracking-wider transition-colors">
                                    <span>🍲 Dinner Satisfaction</span>
                                    <span>78%</span>
                                </div>
                                <div className="h-3 bg-white group-hover:bg-white/10 rounded-full p-0.5 transition-colors">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-latte-dark group-hover:bg-[#f5efe6] rounded-full shadow-inner transition-colors" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-latte-medium/20 text-center">
                            <p className="text-[10px] font-black text-[#8C7861] group-hover:text-[#f5efe6]/40 uppercase tracking-[0.3em] transition-colors">Sentiment Level: High</p>
                        </div>
                    </motion.div>
                </motion.section>
            </motion.main>

            {/* Background Wave Separator Decoration */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 opacity-10 pointer-events-none">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[300px] fill-latte-medium">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </div>
    );
}
