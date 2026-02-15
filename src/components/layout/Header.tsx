'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo image.png"
              alt="Squid Logo"
              width={120}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-8">

            <Link
              href="/"
              className={cn(
                "text-sm font-medium text-white/70 hover:text-white transition-colors",
                pathname === "/" && "text-white"
              )}
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="px-7 py-2 rounded-[5px] text-sm font-medium text-white bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)] hover:opacity-90 transition-all duration-200"
            >
              Dashboard
            </Link>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;