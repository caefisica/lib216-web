'use client';

import { NavbarProps, linkProps } from '@/lib/types';
import Logo from '@/public/images/cbo.jpeg';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserNav from './UserNav';

const links: linkProps[] = [
  { name: 'Inicio', href: '/home' },
  { name: 'Tv Shows', href: '/home/shows' },
  { name: 'Movies', href: '/home/movies' },
  { name: 'Nuevos libros', href: '/home/recently' },
  { name: 'Mi lista', href: '/home/user/list' },
];

export default function Navbar({ user }: NavbarProps) {
  const pathName = usePathname();
  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Netflix logo" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-white font-semibold underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-gray-300 font-normal text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <Bell className="h-5 w-5 text-gray-300 cursor-pointer" />
        <UserNav user={user} />
      </div>
    </div>
  );
}
