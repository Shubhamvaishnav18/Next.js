'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/src/hooks/useAuth';

const navigation = [
  { name: 'Summary', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UsersIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-[#0f1117] border-r border-white/10">

      <div className="flex flex-col flex-grow px-4 py-6 justify-between">

        <nav className="space-y-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)] text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium 
            text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;