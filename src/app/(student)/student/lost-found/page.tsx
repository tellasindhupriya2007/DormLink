"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

import { motion, AnimatePresence } from 'framer-motion';

export default function LostFoundPage() {
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showReportForm, setShowReportForm] = useState(false);
    const [reporting, setReporting] = useState(false);

    const [formData, setFormData] = useState({
        type: 'Lost',
        description: '',
        icon: '📦'
    });

    useEffect(() => {
        const q = query(collection(db, "lostfound"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const itemsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(itemsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleReport = async (e: React.FormEvent) => {
        e.preventDefault();
        setReporting(true);
        try {
            await addDoc(collection(db, "lostfound"), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setShowReportForm(false);
            setFormData({ type: 'Lost', description: '', icon: '📦' });
        } catch (error) {
            console.error("Error reporting item:", error);
            alert("Failed to report item.");
        } finally {
            setReporting(false);
        }
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

            <div className="relative z-10 p-8 max-w-5xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 pt-10">
                    <div className="flex items-center gap-6">
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
                                    Community Bulletin
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark tracking-tight">Lost & Found</h1>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowReportForm(!showReportForm)}
                        className="bg-gradient-to-r from-mocha to-coffee-dark text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-mocha/20 hover:shadow-xl transition-all"
                    >
                        {showReportForm ? "Close Form" : "Report an Item"}
                    </motion.button>
                </header>

                <main>
                    <AnimatePresence>
                        {showReportForm && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-12 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-latte-medium p-10 shadow-xl shadow-coffee-dark/[0.03] space-y-8"
                            >
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1 space-y-4">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium appearance-none"
                                        >
                                            <option value="Lost">Lost</option>
                                            <option value="Found">Found</option>
                                        </select>
                                    </div>
                                    <div className="flex-none md:w-32 space-y-4">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1 text-center">Icon</label>
                                        <input
                                            type="text"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-center text-xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-mocha/50 px-1">Description</label>
                                    <textarea
                                        required
                                        placeholder="Describe the item and where it was last seen..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-latte-medium/30 focus:border-caramel/50 focus:ring-4 focus:ring-caramel/5 outline-none transition-all text-coffee-dark font-medium resize-none h-32 leading-relaxed"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={handleReport}
                                        disabled={reporting}
                                        className="flex-1 bg-gradient-to-r from-caramel to-coffee-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-50"
                                    >
                                        {reporting ? "Submitting..." : "Post Report"}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setShowReportForm(false)}
                                        className="px-8 bg-white border border-latte-medium text-mocha/60 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading ? (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                                <div className="w-12 h-12 border-4 border-mocha/10 border-t-mocha rounded-full animate-spin" />
                                <p className="text-[10px] font-black text-mocha/40 uppercase tracking-[0.2em]">Scanning database...</p>
                            </div>
                        ) : items.length === 0 ? (
                            <div className="col-span-full py-20 bg-white/40 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-latte-medium flex flex-col items-center justify-center space-y-4">
                                <span className="text-4xl opacity-20">🍃</span>
                                <p className="text-[10px] font-black text-mocha/40 uppercase tracking-[0.2em]">The board is currently clear</p>
                            </div>
                        ) : (
                            items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ y: -8 }}
                                    className={`bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-latte-medium p-8 flex items-start gap-6 shadow-sm hover:shadow-xl hover:shadow-coffee-dark/[0.03] transition-all group ${item.type === 'Found' ? 'bg-[#F2F4EF]/80' : ''}`}
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-latte-medium/20 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                                        {item.icon || '📦'}
                                    </div>
                                    <div className="flex-1 space-y-3 pt-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full ${item.type === 'Lost' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                                {item.type}
                                            </span>
                                            <span className="text-[9px] font-black text-mocha/30 uppercase tracking-[0.15em]">
                                                {new Date(item.createdAt?.seconds * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <p className="text-coffee-dark font-medium leading-relaxed">{item.description}</p>
                                        <div className="pt-2">
                                            <button className="text-[9px] font-black text-caramel uppercase tracking-widest hover:text-coffee-dark transition-colors flex items-center gap-2 group/link">
                                                View Details <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
