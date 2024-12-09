import { useState, useEffect, Suspense } from 'react';
import Search from '../../ui/search';
import Table from '../../ui/karyawan/table';
import { CreateKaryawan } from '../../ui/karyawan/buttons';
import { inter, kanit } from '../../ui/fonts';
import { fetchFilteredKaryawan } from '../../lib/data';
import { karyawanTable } from '../../lib/definitions';
// import Pagination from '@/../../ui/karyawan/pagination';
// import { fetchKaryawanPages } from '@/app/lib/data';


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Awaiting searchParams
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  // const totalPages = await fetchKaryawanPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex flex-col items-start gap-4 md:gap-8">
        {/* Header Bar */}
        <div className="flex w-full items-center gap-4">
          <h1 className={`${kanit.className} text-2xl text-white md:text-4xl`}>
            Karyawan
          </h1>
          <div className="flex w-full items-center gap-4">
            <div className="flex-grow">
              <Suspense fallback={<div>Loading search...</div>}>
                <Search placeholder="Search karyawan..." />
              </Suspense>
            </div>
            <Suspense fallback={<div>Loading create button...</div>}>
              <CreateKaryawan />
            </Suspense>
          </div>
        </div>

        {/* Table Section */}
        <Suspense key={query + currentPage} fallback={<div>Loading table...</div>}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>

        {/* Pagination Placeholder */}
        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
      </div>
    </div>
  );
}
