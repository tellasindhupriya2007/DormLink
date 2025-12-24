"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOOD_LEVELS = [
    { label: "Low", icon: "😔", score: 1 },
    { label: "Neutral", icon: "😐", score: 2 },
    { label: "Okay", icon: "🙂", score: 3 },
    { label: "Good", icon: "😊", score: 4 },
    { label: "Great", icon: "😄", score: 5 },
];

const MOCK_WEEKLY = [
    { day: "Sun", mood: "🙂" },
    { day: "Mon", mood: "😊" },
    { day: "Tue", mood: "😐" },
    { day: "Wed", mood: "🙂" },
    { day: "Thu", mood: "😔" },
    { day: "Fri", mood: "😄" },
    { day: "Sat", mood: null },
];

export default function MoodBoard() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedMood === null) return;

        console.log("Mood Entry Submitted:", { selectedMood, note, timestamp: new Date().toISOString() });
        setSubmitted(true);
    };

    return (
        <div className="space-y-12">
            {/* Mood Entry Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-latte-medium p-8 shadow-sm"
            >
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-coffee-dark">How has today been?</h2>
                    <p className="text-sm text-gray-500 mt-1">Your mood stays private and helps us improve student wellbeing.</p>
                </div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >
                            <div className="flex flex-wrap gap-4 justify-between">
                                {MOOD_LEVELS.map((level) => (
                                    <button
                                        key={level.score}
                                        type="button"
                                        onClick={() => setSelectedMood(level.score)}
                                        className={`flex-1 min-w-[100px] flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${selectedMood === level.score
                                                ? 'bg-beige-light border-coffee-dark'
                                                : 'bg-warm-white border-transparent hover:border-latte-medium'
                                            }`}
                                    >
                                        <span className="text-3xl grayscale-[0.5] group-hover:grayscale-0">{level.icon}</span>
                                        <span className={`text-xs font-bold uppercase tracking-widest ${selectedMood === level.score ? 'text-coffee-dark' : 'text-gray-400'
                                            }`}>
                                            {level.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-coffee-dark">Want to add a short note? (optional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value.slice(0, 120))}
                                    placeholder="Brief thoughts on your day..."
                                    className="w-full h-24 p-4 rounded-xl border border-gray-200 focus:border-coffee-dark focus:ring-1 focus:ring-coffee-dark outline-none transition-all resize-none text-sm"
                                />
                                <div className="text-[10px] text-right text-gray-400 font-bold uppercase">
                                    {note.length} / 120
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={selectedMood === null}
                                className="w-full py-4 bg-coffee-dark text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Submit Entry
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="py-12 text-center space-y-4"
                        >
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                ✓
                            </div>
                            <h3 className="text-xl font-bold text-coffee-dark">Mood recorded for today</h3>
                            <p className="text-sm text-gray-500">Thank you for sharing. Your week at a glance is below.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>

            {/* Weekly Summary Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-latte-medium p-8 shadow-sm"
            >
                <h3 className="text-xs font-black text-latte-dark uppercase tracking-widest mb-8">Weekly Mood Snapshot</h3>

                <div className="flex justify-between items-center mb-10 overflow-x-auto pb-4 gap-4">
                    {MOCK_WEEKLY.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 min-w-[60px]">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${item.mood ? 'bg-beige-light border border-latte-medium shadow-sm' : 'bg-warm-white border border-dashed border-gray-200'
                                }`}>
                                {item.mood || "·"}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.day}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-latte-medium/20 text-center">
                    <p className="text-sm font-bold text-coffee-dark italic">"Overall mood this week appears stable."</p>
                </div>
            </motion.section>
        </div>
    );
}
