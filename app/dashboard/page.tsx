import { Card } from '@/app/ui/dashboard/cards';
import PenjualanChart from '@/app/ui/tampil_myreward/transaksi-chart'; // Chart component
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchPenjualan } from '@/app/lib/data';
import Table from '../ui/tampil_myreward/table';
import { useState, useEffect, Suspense } from 'react';
import PenjualanPieChart from '@/app/ui/tampil_myreward/transaksipie-chart';
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
  const penjualan = await fetchPenjualan(); // Fetch sales data

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

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

      {/* Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Example of cards */}
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="col-span-8">
          <PenjualanChart penjualan={penjualan} /> {/* Pass penjualan data */}
        </div>
        <div className="col-span-4">
          {/* <PenjualanPieChart penjualan={penjualan} /> Pass penjualan data */}
        </div>
        <div className="col-span-4">
          {/* Latest Invoices */}
          {/* <LatestInvoices latestInvoices={[]} /> Replace with actual data */}
        </div>
      </div>

      


    </main>
  );
}
