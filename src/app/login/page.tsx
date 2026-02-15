'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/src/hooks/useAuth';
import ImageGrid from '@/src/components/auth/ImageGrid';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password });
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex">

            <div className="w-full lg:w-1/2 flex items-center px-16">

                <div className="w-full max-w-md">

                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-[#9E9E9E]">
                            A good design is not only aesthetically pleasing, but also functional.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-[#18181C] text-white placeholder-[#9E9E9E] 
              rounded-lg px-4 py-3 focus:outline-none focus:ring-1 
              focus:ring-purple-500 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-[#18181C] text-white placeholder-[#9E9E9E] 
              rounded-lg px-4 py-3 focus:outline-none focus:ring-1 
              focus:ring-purple-500 transition-all"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 py-3 rounded-lg font-medium text-white
            bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
            hover:opacity-90 transition-all duration-300"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-purple-400 hover:underline">
                            Sign up
                        </Link>
                    </p>

                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2">
                <ImageGrid />
            </div>

        </div>
    );

}