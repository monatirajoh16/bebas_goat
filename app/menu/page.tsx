import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { poppins } from '@/app/ui/fonts';

export default function MenuPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg_belikopi.png')", // Ganti path ini dengan path gambar background Anda
      }}
    >
      {/* Header */}
      <div className="bg-white bg-opacity-80 shadow-md mb-10 relative">
        <div className="container mx-auto py-6 flex items-center justify-center">
          {/* Logo Belikopi - Hanya tampil di desktop */}
          <div className="absolute left-10 flex items-center hidden md:block">
            <Link href="/">
              <span className="text-4xl font-bold text-black cursor-pointer">belikopi.</span>
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="flex space-x-10">
            <Link href="/menu">
              <span className="text-red-700 text-xl font-semibold cursor-pointer">Menu</span>
            </Link>
            <Link href="/masuk_pelanggan">
              <span className="text-black text-xl font-semibold cursor-pointer hover:text-red-700">
                My Reward
              </span>
            </Link>
            <Link href="/leaderboard">
              <span className="text-black text-xl font-semibold cursor-pointer hover:text-red-700">
                Leaderboard
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto bg-transparent bg-opacity-90 p-6 rounded-lg shadow-lg">
        <h1 className={`${poppins.className} text-4xl text-center text-black mb-10`}>Minuman</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* List of Drinks */}
          {[
            { name: 'Ice Hazelnut Latte', image: '/minuman/kopi.png' },
            { name: 'Ice Kopi Susu Gula Aren', image: '/minuman/ice kopi gula aren.png' },
            { name: 'Ice Kopi Hitam', image: '/minuman/Ice kopi hitam.png' },
            { name: 'Ice Kopi Susu Bandung', image: '/minuman/Ice Kopi Susu Bandung.png' },
            { name: 'Ice Latte', image: '/minuman/Ice latte.png' },
            { name: 'Ice Kopi Original', image: '/minuman/Ice Hazelnut Latte (2).png' },
            { name: 'Ice Kopi special', image: '/minuman/Ice Hazelnut Latte.png' },
            { name: 'Ice Kopi arab', image: '/minuman/Ice Hazelnut Latte.png' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-4"
            >
              <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            </div>
          ))}
        </div>

        <h1 className={`${poppins.className} text-4xl text-center text-black mt-20 mb-10`}>
          Makanan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* List of Foods */}
          {[
            { name: 'Ropang original', image: '/makanan/1.png' },
            { name: 'Ropang keju', image: '/makanan/2.png' },
            { name: 'Ropang coklat', image: '/makanan/3.png' },
            { name: 'Ropang special', image: '/makanan/4.png' },
            { name: 'Ropang keju coklat', image: '/makanan/5.png' },
            { name: 'Ropang kacang', image: '/makanan/6.png' },
            { name: 'Ropang belikopi', image: '/makanan/7.png' },
            { name: 'Ropang tiramisu', image: '/makanan/8.png' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-4"
            >
              <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-10">
          <Link href="/">
            <button className="text-red-700 text-xl font-semibold hover:underline">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
