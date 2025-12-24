"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Slide {
    id: number;
    type: string;
    label: string;
    title: string;
    subtitle: string;
    gradient: string;
    textColor: string;
    button: string | null;
    illustration: React.ReactNode;
}

const initialSlides: Slide[] = [
    {
        id: 1,
        type: "thought",
        label: "Thought of the Day",
        title: `"Make today count."`, // Fallback
        subtitle: "",
        gradient: "from-[#FDFBF7] to-[#F5E6D3]", // Warm white to latte
        textColor: "text-coffee-dark",
        button: null,
        illustration: (
            <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-coffee-dark/10 rounded-full animate-pulse"></div>
                <div className="absolute top-4 left-4 w-32 h-32 bg-latte-medium/20 rounded-full flex items-center justify-center text-4xl">
                    💡
                </div>
            </div>
        )
    },
    {
        id: 2,
        type: "event",
        label: "What's happening around you?",
        title: "Movie Night: Inception",
        subtitle: "Tonight @ 8PM • Common Room",
        gradient: "from-[#2C1810] to-[#4A2C2A]", // Coffee dark gradient
        textColor: "text-warm-white",
        button: "Join In",
        illustration: (
            <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white/5 rounded-2xl rotate-3"></div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl -rotate-3 flex items-center justify-center text-5xl">
                    🎬
                </div>
            </div>
        )
    },
    {
        id: 3,
        type: "food",
        label: "Mess Feedback",
        title: "Did you give your mess feedback today?",
        subtitle: "Your opinion shapes tomorrow's menu!",
        gradient: "from-[#F5E6D3] to-[#E6C9A8]", // Beige gradient
        textColor: "text-coffee-dark",
        button: "Give Feedback",
        illustration: (
            <div className="relative w-40 h-40">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/40 rounded-full flex items-center justify-center text-5xl shadow-sm">
                    🍱
                </div>
                <div className="absolute top-0 left-0 text-3xl animate-bounce">
                    ⭐
                </div>
            </div>
        )
    },
    {
        id: 4,
        type: "complaint",
        label: "Support",
        title: "Facing any issues in hostel?",
        subtitle: "We're here to help. Raise a ticket instantly.",
        gradient: "from-[#FFF8F0] to-[#FFE4C4]", // Soft peach
        textColor: "text-coffee-dark",
        button: "Raise a Complaint",
        illustration: (
            <div className="relative w-40 h-40">
                <div className="absolute inset-0 border-4 border-coffee-dark/20 rounded-full flex items-center justify-center text-5xl bg-white/30">
                    🛠️
                </div>
            </div>
        )
    }
];

export default function HeroCarousel() {
    const [slides, setSlides] = useState<Slide[]>(initialSlides);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch today's thought from Firestore
    useEffect(() => {
        const fetchTodayThought = async () => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const todayString = `${yyyy}-${mm}-${dd}`;

            console.log("Fetched date:", todayString);

            try {
                const docRef = doc(db, "thoughts", todayString);
                const docSnap = await getDoc(docRef);

                console.log("Snapshot exists:", docSnap.exists());

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const displayDate = new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });

                    setSlides((prevSlides) => {
                        const newSlides = [...prevSlides];
                        const author = typeof data.author === 'string' ? data.author : '';
                        newSlides[0] = {
                            ...newSlides[0],
                            title: `"${data.text || 'Make today count.'}"`,
                            subtitle: author ? `${author} • ${displayDate}` : displayDate,
                        };
                        return newSlides;
                    });
                } else {
                    const displayDate = new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    setSlides((prevSlides) => {
                        const newSlides = [...prevSlides];
                        newSlides[0] = {
                            ...newSlides[0],
                            title: "Thought coming soon",
                            subtitle: displayDate,
                        };
                        return newSlides;
                    });
                }
            } catch (error) {
                console.error("Error fetching thought:", error);
            }
        };

        fetchTodayThought();
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-lg group">
            {/* Slides Container */}
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className={`min-w-full h-full flex items-center justify-between p-12 bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}
                    >
                        {/* Background Shapes */}
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                        {/* Content Left */}
                        <div className={`flex-1 pr-8 z-10 ${slide.textColor}`}>
                            <span className={`mb-4 inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${slide.type === 'event' ? 'bg-white/10 text-warm-white' : 'bg-coffee-dark/10 text-coffee-dark'
                                }`}>
                                {slide.label}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                {slide.title}
                            </h2>
                            <p className={`text-lg mb-8 ${slide.type === 'event' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                                {slide.subtitle}
                            </p>
                            {slide.button && (
                                <button className={`px-6 py-2.5 rounded-lg font-bold shadow-md transition-transform hover:scale-105 ${slide.type === 'event'
                                    ? 'bg-warm-white text-coffee-dark'
                                    : 'bg-coffee-dark text-white'
                                    }`}>
                                    {slide.button}
                                </button>
                            )}
                        </div>

                        {/* Illustration Right */}
                        <div className="hidden md:flex flex-1 justify-center items-center z-10 transform translate-x-4">
                            {slide.illustration}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-coffee-dark shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-coffee-dark shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                            ? (slide.type === 'event' ? "bg-warm-white w-8" : "bg-coffee-dark w-8")
                            : (slide.type === 'event' ? "bg-warm-white/50 w-2" : "bg-coffee-dark/30 w-2")
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
