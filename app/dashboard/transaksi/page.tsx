import { useState, useEffect, Suspense } from 'react';
import Search from '../../ui/search';
import Table from '../../ui/transaksi/table';
import { CreateTransaksi } from '../../ui/transaksi/buttons';
import { inter, kanit } from '../../ui/fonts';
import { fetchFilteredTransaksi } from '../../lib/data';
import { TransaksiTable } from '../../lib/definitions';
import { useSearchParams } from 'next/navigation';

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
    <div className="w-full">
      <div className="mt-4 flex flex-col items-start gap-4 md:gap-8">
        {/* Header Bar */}
        <div className="flex w-full items-center gap-4">
          <h1 className={`${kanit.className} text-2xl text-white md:text-4xl`}>
            Transaksi
          </h1>
          <div className="flex w-full items-center gap-4">
            <div className="flex-grow">
              <Suspense fallback={<div>Loading search...</div>}>
                <Search placeholder="Search Transaksi..." />
              </Suspense>
            </div>
            <Suspense fallback={<div>Loading create button...</div>}>
              <CreateTransaksi />
            </Suspense>
          </div>
        </div>

        {/* Table Section */}
        <Suspense key={query + currentPage} fallback={<div>Loading table...</div>}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>

        {/* Pagination Placeholder */}
        <div className="mt-5 flex w-full justify-center">
          {/* Add pagination here if needed */}
        </div>
      </div>
    </div>
  );
}
