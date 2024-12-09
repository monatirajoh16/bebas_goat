

import { useState, useEffect, Suspense } from 'react';
import Search from '../ui/search';
import Table from '../ui/tampil_myreward/table';
import { CreateKaryawan } from '../ui/karyawan/buttons';
import { inter, kanit } from '../ui/fonts';
import { fetchFilteredKaryawan } from '../lib/data';
import { karyawanTable } from '../lib/definitions';
import {
  TrophyIcon,
  MagnifyingGlassIcon,
  StarIcon
} from '@heroicons/react/24/outline';


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;


  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url(/bg_belikopi.png)',
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        {/* Stats Cards - Optional, can be added if needed */}
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-[#1E2432] rounded-2xl shadow-xl p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-lg">
                    <TrophyIcon className="w-8 h-8 text-white" />
                  </div>
                  <h1 className={`${kanit.className} text-2xl md:text-4xl font-bold text-white`}>
                    My Reward
                  </h1>
                </div>
                <div className="flex-grow max-w-md">
                  <Suspense fallback={<div className="text-white">Loading search...</div>}>
                    <div className="relative">
                      {/* <Search placeholder="Search rewards..." /> */}
                      {/* <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    </div>
                  </Suspense>
                </div>
              </div>


              {/* Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-medium hover:bg-amber-700 transition-colors">
                  All Rewards
                </button>
                {/* <button className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-colors">
                  Available
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-colors">
                  Redeemed
                </button> */}
              </div>
            </div>


            {/* Table Section */}
            <div className="bg-[#272E3F] rounded-xl overflow-hidden">
              <Suspense 
                key={query + currentPage} 
                fallback={
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-700 rounded"></div>
                          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              >
                <Table query={query} currentPage={currentPage} />
              </Suspense>
            </div>


            {/* Pagination Section */}
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center gap-2">
                {/* <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                  Previous
                </button> */}
                <button className="px-4 py-2 rounded-lg bg-amber-600 text-white">
                  1
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


