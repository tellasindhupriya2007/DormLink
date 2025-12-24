"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import MoodBoard from '@/components/MoodBoard';

export default function StudentMoodPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-6 pb-20 max-w-4xl mx-auto">
            <header className="mb-12 flex items-center gap-6">
                <button
                    onClick={() => router.back()}
                    className="w-12 h-12 rounded-full border border-latte-medium flex items-center justify-center text-coffee-dark hover:bg-white transition-all shadow-sm"
                >
                    ←
                </button>
                <div>
                    <h1 className="text-4xl font-black text-coffee-dark tracking-tighter">Your Mood Board</h1>
                    <p className="text-sm font-bold text-[#8C7861] uppercase tracking-[0.2em] mt-1">Wellbeing Tracking</p>
                </div>
            </header>

            <main>
                <MoodBoard />
            </main>
        </div>
    );
}
