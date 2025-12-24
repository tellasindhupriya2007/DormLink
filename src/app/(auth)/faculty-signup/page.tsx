"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FacultySignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password || !facultyId) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    email: user.email,
                    facultyId: facultyId,
                    role: "faculty",
                    createdAt: serverTimestamp(),
                });
            }

            setSuccess("Account created successfully! Redirecting...");
            router.push("/faculty/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-warm-white p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-coffee-dark">
                    Faculty Signup
                </h1>
                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
                        {success}
                    </div>
                )}
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-coffee-dark">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-md border border-latte-medium p-2 focus:border-coffee-dark focus:outline-none"
                            placeholder="faculty@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-coffee-dark">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border border-latte-medium p-2 focus:border-coffee-dark focus:outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-coffee-dark">
                            Faculty ID
                        </label>
                        <input
                            type="text"
                            value={facultyId}
                            onChange={(e) => setFacultyId(e.target.value)}
                            className="mt-1 w-full rounded-md border border-latte-medium p-2 focus:border-coffee-dark focus:outline-none"
                            placeholder="FAC-12345"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 rounded-md bg-coffee-dark py-2 font-bold text-white transition-colors hover:bg-opacity-90"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Not a faculty member?{" "}
                    <Link href="/student-signup" className="text-coffee-dark underline">
                        Student Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
