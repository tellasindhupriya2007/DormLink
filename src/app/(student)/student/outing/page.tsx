"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function OutingRequestPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        date: '',
        timeOut: '',
        timeIn: '',
        reason: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        try {
            await addDoc(collection(db, "outings"), {
                ...formData,
                userId: user.uid,
                studentName: user.displayName || user.email,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            alert('Outing request submitted successfully!');
            router.push('/student/dashboard');
        } catch (error) {
            console.error("Error submitting outing:", error);
            alert('Failed to submit request. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden font-sans">
            {/* Premium Coffee Waves Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden pb-20">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                        x: [0, 20, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] bg-[#F4E3D7]/40 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, -8, 0],
                        x: [0, -30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E8E0D9]/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[#C4A484]/10 rounded-full blur-[80px]"
                />
            </div>

            {/* Subtle Natural Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="relative z-10 p-8 max-w-4xl mx-auto">
                <header className="mb-12 flex items-center gap-6 pt-10">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.back()}
                        className="w-12 h-12 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-2xl border border-latte-medium text-coffee-dark shadow-sm hover:bg-white transition-all"
                    >
                        <span className="text-xl font-black">←</span>
                    </motion.button>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-full bg-mocha/10 border border-mocha/20 text-[9px] font-black text-mocha uppercase tracking-[0.2em]">
                                Digital Pass System
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark tracking-tight">Request Outing</h1>
                    </div>
                </header>

                <main>
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-latte-medium p-10 md:p-14 shadow-xl shadow-coffee-dark/[0.03] space-y-10"
                    >
                        <div className="space-y-4">
                            <label htmlFor="date" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label htmlFor="timeOut" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                    Departure Time
                                </label>
                                <input
                                    type="time"
                                    id="timeOut"
                                    name="timeOut"
                                    required
                                    value={formData.timeOut}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20"
                                />
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="timeIn" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                    Expected Return
                                </label>
                                <input
                                    type="time"
                                    id="timeIn"
                                    name="timeIn"
                                    required
                                    value={formData.timeIn}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <label htmlFor="reason" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50">
                                    Reason for Outing
                                </label>
                                <span className="text-[10px] font-black text-caramel/40 italic uppercase">Requires Verification</span>
                            </div>
                            <textarea
                                id="reason"
                                name="reason"
                                rows={4}
                                required
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Please provide a clear reason for your request..."
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20 resize-none leading-relaxed"
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <motion.button
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full rounded-2xl bg-gradient-to-r from-mocha to-coffee-dark py-5 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-mocha/20 transition-all active:scale-[0.99] shadow-lg flex items-center justify-center gap-3 group"
                            >
                                Submit Pass Request
                                <span className="text-base group-hover:translate-x-2 transition-transform">→</span>
                            </motion.button>
                            <p className="text-center text-[10px] text-mocha/30 font-bold uppercase tracking-widest mt-6">
                                Your guardian & faculty will receive an immediate notification
                            </p>
                        </div>
                    </motion.form>
                </main>
            </div>
        </div>
    );
}
