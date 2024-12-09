"use client";
import { useState } from 'react';
import Link from 'next/link';
import { poppins } from '@/app/ui/fonts';

export default function Page() {
  // State untuk mengontrol dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <main
      className="relative flex min-h-screen flex-col"
      style={{
        backgroundImage: "url('/bg_login.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 flex items-center bg-gray-900 bg-opacity-20 p-6 z-10">
        {/* Left-aligned "belikopi." Text */}
        <div className="absolute left-6 text-black text-5xl">
          <strong className={poppins.className}>belikopi.</strong>
        </div>

        {/* Dropdown Menu for Mobile */}
        <div className="absolute right-6 sm:hidden">
          {/* Button to toggle dropdown */}
          <button
            onClick={toggleDropdown}
            className="text-black text-2xl bg-white bg-opacity-90 rounded-full p-3 transition transform hover:scale-110 hover:bg-gray-100 focus:outline-none"
          >
            ☰
          </button>

          {/* Dropdown Content with smooth transition */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-20 transform transition-all duration-300 ease-in-out">
              <Link href="/menu">
                <button className="block w-full px-4 py-2 text-left text-black text-sm hover:bg-gray-100 rounded-md">
                  <strong className={`${poppins.className} text-lg`}>Menu</strong>
                </button>
              </Link>
              <Link href="/masuk_pelanggan">
                <button className="block w-full px-4 py-2 text-left text-black text-sm hover:bg-gray-100 rounded-md">
                  <strong className={`${poppins.className} text-lg`}>My Reward</strong>
                </button>
              </Link>
              <Link href="/leaderboard">
                <button className="block w-full px-4 py-2 text-left text-black text-sm hover:bg-gray-100 rounded-md">
                  <strong className={`${poppins.className} text-lg`}>Leaderboard</strong>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex w-full justify-center gap-4">
          <Link href="/menu">
            <button className="px-6 py-2 text-black text-sm transition duration-500 ease-out bg-transparent rounded-lg hover:text-red-900 hover:underline hover:decoration-red-900 hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:text-red-900 active:bg-white active:bg-opacity-10">
              <strong className={`${poppins.className} text-2xl md:text-2xl`}>Menu</strong>
            </button>
          </Link>
          <Link href="/masuk_pelanggan">
            <button className="px-6 py-2 text-black text-sm transition duration-500 ease-out bg-transparent rounded-lg hover:text-red-900 hover:underline hover:decoration-red-900 hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:text-red-900 active:bg-white active:bg-opacity-10">
              <strong className={`${poppins.className} text-2xl md:text-2xl`}>My Reward</strong>
            </button>
          </Link>
          <Link href="/leaderboard">
            <button className="px-6 py-2 text-black text-sm transition duration-500 ease-out bg-transparent rounded-lg hover:text-red-900 hover:underline hover:decoration-red-900 hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:outline-none focus:text-red-900 active:bg-white active:bg-opacity-10">
              <strong className={`${poppins.className} text-2xl md:text-2xl`}>Leaderboard</strong>
            </button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex grow flex-col gap-4 md:flex-row mt-24 p-6">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-transparent-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-4xl md:leading-normal">
            <strong>
              Rasa Kopi Asli,<br />
              Semangat Tiada Henti!<br />
              #belikopibarukamu.
            </strong>
          </p>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
      </div>
    </main>
  );
}
