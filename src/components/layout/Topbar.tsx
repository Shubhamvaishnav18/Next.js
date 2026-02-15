'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/src/hooks/useAuth';
import { getInitials } from '@/src/lib/utils';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative">

      <div className="sticky top-0 z-50 flex h-16 items-center justify-between px-6 
        bg-[#0f1117] border-b border-white/10">

        <div className="flex items-center gap-4">

          <button
            type="button"
            className="md:hidden text-gray-400 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          <Image
            src="/images/logo image.png"
            alt="Logo"
            width={90}
            height={26}
            className="object-contain"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300 font-medium">
              {user?.name}
            </span>

            <div className="h-9 w-9 rounded-full 
              bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
              border border-white/20
              flex items-center justify-center 
              text-white text-sm font-semibold shadow-md">
              {user && getInitials(user.name)}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-[#131415] 
        border-b border-white/10 transition-all duration-300 
        ${mobileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'}`}
      >
        <div className="flex flex-col p-6 space-y-4">

          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <HomeIcon className="h-5 w-5" />
            Summary
          </Link>

          <Link
            href="/dashboard/users"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <UsersIcon className="h-5 w-5" />
            Users
          </Link>

          <Link
            href="/dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </Link>

          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Topbar;
