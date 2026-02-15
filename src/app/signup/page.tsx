'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/hooks/useAuth';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import Card from '@/src/components/ui/Card';
import ImageGrid from '@/src/components/auth/ImageGrid';
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import { validateEmail, validatePassword } from '@/src/lib/utils';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await signup(formData);
        } catch (error) {
            setErrors({ form: 'Signup failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen bg-black flex">
            <div className="w-full lg:w-1/2 flex items-center px-16">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Register
                        </h1>
                        <p className="text-[#9E9E9E]">
                            A good design is not only aesthetically pleasing, but also functional.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="w-full bg-[#18181C] text-white placeholder-[#9E9E9E] 
              rounded-lg px-4 py-3 focus:outline-none focus:ring-1 
              focus:ring-purple-500 transition-all"
                            />
                            {errors.fullName && (
                                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="w-full bg-[#18181C] text-white placeholder-[#9E9E9E] 
              rounded-lg px-4 py-3 focus:outline-none focus:ring-1 
              focus:ring-purple-500 transition-all"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="w-full bg-[#18181C] text-white placeholder-[#9E9E9E] 
              rounded-lg px-4 py-3 focus:outline-none focus:ring-1 
              focus:ring-purple-500 transition-all"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {errors.form && (
                            <p className="text-sm text-red-500">{errors.form}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 py-3 rounded-lg font-medium text-white
            bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
            hover:opacity-90 transition-all duration-300"
                        >
                            {isLoading ? "Signing up..." : "Signup Now"}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 hover:underline">
                            Sign in
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