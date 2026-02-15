'use client';

import { useEffect, useState } from 'react';
import Card from '@/src/components/ui/Card';
import Skeleton from '@/src/components/ui/Skeleton';
import { User } from '@/src/types';
import { api } from '@/src/lib/api';
import {
    UsersIcon,
    EnvelopeIcon,
    BuildingOfficeIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.getUsers();
                setUsers(data);
            } catch (err) {
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Summary</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i}>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Card className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">{error}</p>
            </Card>
        );
    }

    const stats = [
        {
            title: 'Total Users',
            value: users.length,
            icon: UsersIcon,
        },
        {
            title: 'Companies',
            value: new Set(users.map(u => u.company.name)).size,
            icon: BuildingOfficeIcon,
        },
        {
            title: 'Cities',
            value: new Set(users.map(u => u.address.city)).size,
            icon: GlobeAltIcon,
        },
        {
            title: 'Email Domains',
            value: new Set(users.map(u => u.email.split('@')[1])).size,
            icon: EnvelopeIcon,
        },
    ];

    return (
        <div className="space-y-10">

            <h1 className="text-3xl font-bold text-white">
                Dashboard Summary
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-[#1c1f26] border border-white/10 rounded-2xl p-6
            hover:border-white/20 transition-all duration-300
            hover:shadow-[0_0_30px_rgba(128,84,255,0.15)]"
                    >
                        <div className="flex items-center gap-4">

                            <div className="p-3 rounded-xl bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]">
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    {stat.title}
                                </p>
                                <p className="text-2xl font-semibold text-white">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className="bg-[#1c1f26] border border-white/10 rounded-2xl p-8">

                <h2 className="text-xl font-semibold text-white mb-6">
                    Recent Users
                </h2>

                <div className="divide-y divide-white/10">

                    {users.slice(0, 5).map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between py-4
              hover:bg-white/5 rounded-xl px-4 transition-all duration-200"
                        >

                            <div>
                                <p className="font-medium text-white">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {user.email}
                                </p>
                            </div>

                            <div className="text-sm text-gray-400">
                                {user.company.name}
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}