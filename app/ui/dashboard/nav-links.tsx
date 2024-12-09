'use client';

import {
  UserGroupIcon,
  HomeIcon,
  BanknotesIcon,
  TrophyIcon,
  ShoppingBagIcon,
  UserIcon,
  ChartBarIcon,
  ArchiveBoxArrowDownIcon,
} from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const employeeLinks = [
  { name: 'Halaman utama', href: '/dashboard', icon: HomeIcon },
  { name: 'Bahan', href: '/dashboard/bahan', icon: ArchiveBoxArrowDownIcon },
  { name: 'Pelanggan', href: '/dashboard/pelanggan', icon: UserGroupIcon },
  { name: 'Transaksi', href: '/dashboard/transaksi', icon: BanknotesIcon },
  { name: 'My Reward', href: '/dashboard/my_reward', icon: TrophyIcon },
  { name: 'Produk', href: '/dashboard/produk', icon: ShoppingBagIcon },
];

const supervisorLinks = [
  { name: 'Halaman utama', href: '/dashboard', icon: HomeIcon },
  { name: 'Laporan', href: '/dashboard/laporan', icon: ChartBarIcon },
  { name: 'Karyawan', href: '/dashboard/karyawan', icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const links = role === 'karyawan' ? employeeLinks : supervisorLinks;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-300 hover:text-orange-900 md:flex-none md:justify-start md:p-2 md:px-3 transform hover:scale-110 transition-transform',
              { 'bg-slate-300 text-black': pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
