"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface EventCardProps {
    event: {
        id: number;
        name: string;
        organizer: string;
        date: string;
        time: string;
        venue: string;
        image: string;
    };
    onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={onClick}
            className="min-w-[300px] h-[450px] relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
        >
            {/* Event Poster Placeholder */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${event.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/40 to-transparent" />
            </div>

            {/* Event Info Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-latte-light mb-2">
                    {event.organizer}
                </span>
                <h3 className="text-2xl font-black mb-4 group-hover:text-latte-medium transition-colors">
                    {event.name}
                </h3>

                <div className="space-y-1 text-sm font-bold opacity-80">
                    <div className="flex items-center gap-2">
                        <span>📅</span> {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <span>⏰</span> {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span> {event.venue}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
