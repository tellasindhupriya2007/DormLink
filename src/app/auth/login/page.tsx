"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Login successful:", user.uid);

            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role;

                setSuccess("Login successful! Redirecting...");

                if (role === "student") {
                    router.push("/student/dashboard");
                } else if (role === "faculty") {
                    router.push("/faculty/dashboard");
                } else {
                    // Fallback if role is missing or unknown
                    router.push("/");
                }
            } else {
                setError("Account setup incomplete. Please sign up again.");
            }
        } catch (err: any) {
            console.error("Login Error:", err.code, err.message);
            setError(`Login failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-warm-white p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-coffee-dark">
                    Login to Dormlink
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
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-coffee-dark">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-md border border-latte-medium p-2 focus:border-coffee-dark focus:outline-none"
                            placeholder="user@example.com"
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
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 rounded-md bg-coffee-dark py-2 font-bold text-white transition-colors hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>
                <div className="mt-4 flex flex-col items-center gap-2 text-sm text-gray-600">
                    <p>
                        New Student?{" "}
                        <Link href="/auth/student-signup" className="text-coffee-dark underline font-semibold">
                            Student Signup
                        </Link>
                    </p>
                    <p>
                        New Faculty?{" "}
                        <Link href="/auth/faculty-signup" className="text-coffee-dark underline font-semibold">
                            Faculty Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
