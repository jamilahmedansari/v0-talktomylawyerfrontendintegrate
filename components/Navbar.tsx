'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard/user', label: 'User Dashboard' },
    { href: '/dashboard/employee', label: 'Employee Dashboard' },
    { href: '/dashboard/admin', label: 'Admin Dashboard' },
    { href: '/letters/new', label: 'New Letter' },
    { href: '/letters/history', label: 'History' },
  ];
  return (
    <nav className="bg-white bg-opacity-20 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center space-x-6 overflow-x-auto">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'text-sm font-medium whitespace-nowrap',
              pathname === href ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
