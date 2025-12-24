"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { motion } from 'framer-motion';

export default function ComplaintsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        hostelBlock: '',
        roomNumber: '',
        category: 'Mess',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "complaints"), {
                ...formData,
                userId: auth.currentUser?.uid || "anonymous",
                status: 'open',
                createdAt: serverTimestamp(),
            });

            alert('Complaint submitted successfully!');
            router.push('/student/dashboard');
        } catch (error) {
            console.error("Error submitting complaint:", error);
            alert("Failed to submit complaint. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                                Student Voice & Support
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark tracking-tight">Post a Complaint</h1>
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
                            <label htmlFor="studentName" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                required
                                value={formData.studentName}
                                onChange={handleChange}
                                placeholder="How shall we address you?"
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label htmlFor="hostelBlock" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                    Hostel Block / Wing
                                </label>
                                <input
                                    type="text"
                                    id="hostelBlock"
                                    name="hostelBlock"
                                    required
                                    value={formData.hostelBlock}
                                    onChange={handleChange}
                                    placeholder="e.g. Diamond Wing"
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20"
                                />
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="roomNumber" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                    Room Number
                                </label>
                                <input
                                    type="text"
                                    id="roomNumber"
                                    name="roomNumber"
                                    required
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    placeholder="e.g. 402-B"
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                Service Category
                            </label>
                            <div className="relative">
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium appearance-none"
                                >
                                    <option value="Mess">Dining & Mess</option>
                                    <option value="Room">Room Maintenance</option>
                                    <option value="Plumbing">Plumbing Services</option>
                                    <option value="Electrical">Electrical Support</option>
                                    <option value="Cleaning">Sanitation & Cleaning</option>
                                    <option value="Other">Other Concerns</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-mocha/30">▼</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="description" className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">
                                Detailed Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the concern clearly so we can resolve it quickly..."
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium placeholder:text-mocha/20 resize-none leading-relaxed"
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <motion.button
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-gradient-to-r from-mocha to-coffee-dark py-5 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-mocha/20 transition-all active:scale-[0.99] shadow-lg flex items-center justify-center gap-3 group"
                            >
                                {loading ? "Registering Concern..." : "Submit Complaint"}
                                <span className="text-base group-hover:translate-x-2 transition-transform">→</span>
                            </motion.button>
                            <p className="text-center text-[10px] text-mocha/30 font-bold uppercase tracking-widest mt-6">
                                We aim to resolve all high-priority issues within 24-48 hours.
                            </p>
                        </div>
                    </motion.form>
                </main>
            </div>
        </div>
    );
}
