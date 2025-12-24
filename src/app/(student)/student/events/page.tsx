"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import EventCard from '@/components/events/EventCard';

const MOCK_EVENTS = [
    {
        id: 1,
        name: "Hackathon 2024",
        organizer: "Coding Club",
        date: "Dec 30, 2024",
        time: "10:00 AM",
        venue: "Main Auditorium",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
        description: "A 24-hour coding challenge to build innovative solutions for campus life."
    },
    {
        id: 2,
        name: "Winter Fest",
        organizer: "Cultural Committee",
        date: "Jan 5, 2025",
        time: "5:00 PM",
        venue: "Open Air Theater",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        description: "Celebrate the spirit of winter with music, dance, and food stalls."
    },
    {
        id: 3,
        name: "Sports Meet",
        organizer: "Sports Club",
        date: "Jan 12, 2025",
        time: "9:00 AM",
        venue: "College Ground",
        image: "https://images.unsplash.com/photo-1461896756984-33fd055bfcbe?q=80&w=2070&auto=format&fit=crop",
        description: "The annual inter-hostel sports competition. Join us for track and field events."
    },
    {
        id: 4,
        name: "AI Workshop",
        organizer: "Tech Society",
        date: "Jan 20, 2025",
        time: "2:00 PM",
        venue: "Seminar Hall 1",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        description: "Hands-on workshop on Large Language Models and Generative AI."
    }
];

const MOCK_CLUBS = [
    { id: 1, name: "Coding Club", icon: "💻", color: "from-[#4A3728] to-[#6F4E37]" },
    { id: 2, name: "Cultural Committee", icon: "🎨", color: "from-[#6F4E37] to-[#8C7861]" },
    { id: 3, name: "Sports Club", icon: "🏆", color: "from-[#8C7861] to-[#A69076]" },
];

export default function EventsPage() {
    const router = useRouter();


    const [selectedEvent, setSelectedEvent] = useState<typeof MOCK_EVENTS[0] | null>(null);
    const [savedEvents, setSavedEvents] = useState<number[]>([]);

    const toggleSave = (id: number) => {
        if (savedEvents.includes(id)) {
            setSavedEvents(savedEvents.filter(e => e !== id));
            console.log(`Unsaved event ${id}`);
        } else {
            setSavedEvents([...savedEvents, id]);
            console.log(`Saved event ${id}. Reminder will be sent before the event.`);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden">
            {/* Soft Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EFE9E1] rounded-full blur-[140px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-latte-light rounded-full blur-[120px] opacity-30 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <header className="max-w-7xl mx-auto mb-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#FFFFFF' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.back()}
                            className="w-14 h-14 rounded-2xl border border-latte-medium flex items-center justify-center text-coffee-dark bg-white/50 backdrop-blur-md transition-all shadow-xl shadow-coffee-dark/5"
                        >
                            ←
                        </motion.button>
                        <div>
                            <h1 className="text-5xl font-black text-coffee-dark tracking-tighter mb-1">Events & Clubs</h1>
                            <p className="text-sm font-bold text-[#8C7861] uppercase tracking-[0.3em] flex items-center gap-3">
                                <span className="w-10 h-[2px] bg-[#8C7861]/30"></span>
                                Campus Experience Feed
                            </p>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto space-y-28">
                    {/* Featured Events Rail */}
                    <section>
                        <div className="flex items-center gap-3 mb-12 px-1">
                            <span className="text-2xl">🎟️</span>
                            <h2 className="text-sm font-black text-coffee-dark uppercase tracking-[0.25em]">Upcoming Highlights</h2>
                        </div>

                        <div className="flex gap-10 overflow-x-auto pb-16 scrollbar-hide -mx-10 px-10">
                            {MOCK_EVENTS.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex-shrink-0"
                                >
                                    <EventCard
                                        event={event}
                                        onClick={() => setSelectedEvent(event)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Enhanced Club Activities Section */}
                    <section className="bg-white/40 border border-[#EAE4DB] -mx-16 px-16 py-24 rounded-[5rem] shadow-2xl shadow-coffee-dark/[0.02]">
                        <div className="flex flex-col items-center mb-20 text-center">
                            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center text-4xl mb-6 border border-latte-light">🏛️</div>
                            <h2 className="text-2xl font-black text-coffee-dark uppercase tracking-[0.4em] mb-4">Official Clubs</h2>
                            <p className="text-xs font-bold text-[#8C7861] uppercase tracking-widest opacity-60">Building Community Through Action</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {MOCK_CLUBS.map((club, i) => (
                                <motion.div
                                    key={club.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -12 }}
                                    className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 border border-latte-medium relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all"
                                >
                                    {/* Glassmorphic Accent */}
                                    <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${club.color} opacity-5 group-hover:opacity-10 rounded-full transition-opacity duration-500 blur-2xl`} />

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="text-5xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 ease-out">{club.icon}</div>
                                        <h3 className="text-xl font-black text-coffee-dark mb-4 tracking-tight">{club.name}</h3>
                                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#F9F7F2] rounded-full border border-latte-medium/50 shrink-0">
                                            <span className="w-2 h-2 bg-[#8C7861] rounded-full animate-pulse shadow-[0_0_8px_rgba(140,120,97,0.5)]" />
                                            <span className="text-[11px] font-black text-[#8C7861] uppercase tracking-[0.1em]">
                                                Activities launching soon
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>

            {/* Event Details Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            className="absolute inset-0 bg-coffee-dark/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] overflow-hidden max-w-2xl w-full relative z-10 shadow-2xl"
                        >
                            <div
                                className="h-64 bg-cover bg-center"
                                style={{ backgroundImage: `url(${selectedEvent.image})` }}
                            >
                                <div className="absolute inset-x-0 h-64 bg-gradient-to-t from-white to-transparent" />
                            </div>

                            <div className="p-10 space-y-6">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-latte-dark/60">
                                        {selectedEvent.organizer}
                                    </span>
                                    <h2 className="text-3xl font-black text-coffee-dark mt-2">
                                        {selectedEvent.name}
                                    </h2>
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    {selectedEvent.description}
                                </p>

                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-latte-dark/40">When</p>
                                        <p className="font-bold text-coffee-dark">{selectedEvent.date} · {selectedEvent.time}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-latte-dark/40">Where</p>
                                        <p className="font-bold text-coffee-dark">{selectedEvent.venue}</p>
                                    </div>
                                </div>

                                <div className="pt-8 flex gap-4">
                                    <button
                                        onClick={() => toggleSave(selectedEvent.id)}
                                        className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${savedEvents.includes(selectedEvent.id)
                                            ? 'bg-beige-light text-coffee-dark border-2 border-coffee-dark'
                                            : 'bg-coffee-dark text-white hover:bg-latte-dark shadow-lg shadow-coffee-dark/20'
                                            }`}
                                    >
                                        {savedEvents.includes(selectedEvent.id) ? '✓ Saved' : 'Save Event'}
                                    </button>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="px-8 py-4 rounded-2xl border-2 border-latte-medium text-latte-dark font-black text-xs uppercase tracking-widest hover:bg-warm-white transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                                {savedEvents.includes(selectedEvent.id) && (
                                    <p className="text-center text-[10px] font-black text-green-600 uppercase tracking-widest animate-pulse">
                                        Reminder will be sent before the event.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
