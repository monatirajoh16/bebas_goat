import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { poppins } from '@/app/ui/fonts';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-[#FFF7E6]"> {/* Warna latar lebih terang */}
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md bg-transparent-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-black md:w-40">
          <h1 className={`${poppins.className} mb-3 text-5xl text-[#4A3622]`}> {/* Warna teks cokelat tua */}
            <strong>belikopi.</strong>
          </h1>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-[#FFEFD6] md:block"></div> {/* Warna pengisi lebih terang */}
        
        {/* Tombol Back - Ganti form dengan Link */}
        <Link href="/" passHref>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#FFEFD6] p-3 text-sm font-medium text-[#4A3622] hover:bg-[#FFE3BA] hover:text-[#4A3622] md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowUturnLeftIcon className="w-6" />
            <div className="hidden md:block">Back</div>
          </button>
        </Link>

        {/* Tombol Sign Out */}
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Link href="/login" passHref>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#FFEFD6] p-3 text-sm font-medium text-[#4A3622] hover:bg-[#FFE3BA] hover:text-[#4A3622] md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowLeftOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
