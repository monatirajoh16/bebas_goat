// import { Suspense } from 'react';
// import Search from 'app/ui/search';
// import Table from 'app/ui/laporan/table';
// import { kanit } from 'app/ui/fonts';
// import ExportPDFButton from 'app/ui/searchlaporan';
// import {
//   transaksiField,
//   karyawanField,
//   produkField,
//   jenjangField,
//   pelangganField,
//   my_rewardField,
// } from 'app/lib/definitions';


// type PageProps = {
//   transaksi: transaksiField[]; // Menghapus default sebagai array kosong
//   karyawan: karyawanField[];
//   produk: produkField[];
//   jenjang: jenjangField[];
//   pelanggan: pelangganField[];
//   my_reward: my_rewardField[];
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// };


// export default async function Page({
//   transaksi, // Hapus default array kosong
//   karyawan,
//   produk,
//   jenjang,
//   pelanggan,
//   my_reward,
//   searchParams,
// }: PageProps) {
//   const params = await searchParams;
//   const query = params?.query || '';
//   const currentPage = Number(params?.page) || 1;


//   // Memeriksa data transaksi yang diterima
//   console.log('Transaksi:', transaksi); // Log untuk memeriksa array transaksi


//   // Menghitung total pendapatan jika transaksi ada
//   const totalPendapatan = Array.isArray(transaksi)
//     ? transaksi.reduce((sum, t) => {
//         // Memastikan total_transaksi adalah angka
//         const totalTransaksi = Number(t.total_transaksi); // Pastikan total_transaksi adalah angka
//         console.log('Transaksi item:', t, 'Total:', totalTransaksi); // Log untuk memeriksa setiap item transaksi dan totalnya
//         return sum + (isNaN(totalTransaksi) ? 0 : totalTransaksi); // Menangani kasus NaN
//       }, 0)
//     : 0; // Jika transaksi tidak ada atau bukan array, totalPendapatan adalah 0


//   return (
//     <div className="w-full bg-[#fdf5e6] px-4 py-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-md px-6 py-4">
//         <div className="flex justify-between items-center">
//           <h1 className={`${kanit.className} text-2xl text-gray-800`}>Laporan</h1>
//           <ExportPDFButton laporanData={transaksi} /> {/* Pastikan transaksi tidak undefined */}
//         </div>


//         {/* Filter Section */}
//         <div className="mt-4 flex flex-col md:flex-row gap-4">
//           <div className="flex items-center gap-2">
//             <input
//               type="date"
//               placeholder="dd/mm/yy"
//               className="border rounded-lg px-3 py-2 text-gray-700 bg-gray-50"
//             />
//             <span className="text-gray-600">s.d.</span>
//             <input
//               type="date"
//               placeholder="dd/mm/yy"
//               className="border rounded-lg px-3 py-2 text-gray-700 bg-gray-50"
//             />
//             <button className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
//               Filter
//             </button>
//           </div>


//           <div className="flex flex-col items-center">
//             <span className="text-gray-700 font-bold">Total Pendapatan</span>
//             <span className="text-2xl text-amber-800 font-bold">
//               Rp{totalPendapatan > 0 ? totalPendapatan.toLocaleString() : '0'}
//             </span>
//           </div>
//         </div>
//       </div>


//       {/* Search Section */}
//       <div className="mt-6">
//         <Suspense fallback={<div>Loading search...</div>}>
//           <Search placeholder="Cari Pengguna..." />
//         </Suspense>
//       </div>


//       {/* Table Section */}
//       <div className="mt-6">
//         <Suspense key={query + currentPage} fallback={<div>Loading table...</div>}>
//           <Table query={query} currentPage={currentPage} />
//         </Suspense>
//       </div>
//     </div>
//   );
// }



// import Pagination from '@/app/ui/detailpenjualan/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/laporan/table';
import { ReportFilterUI } from '@/app/ui/laporan/buttons';
import { inter } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

import { Suspense } from 'react';
import React from 'react';
import { fetchTransaksiPages, fetchFilteredTransaksi } from '@/app/lib/data'; // Pastikan import sesuai

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';  // Ambil query pencarian dari parameter
  const currentPage = Number(searchParams?.page) || 1;  // Ambil halaman saat ini dari parameter, default ke 1

  // Mendapatkan total halaman untuk pagination
  const totalPages = await fetchTransaksiPages(query, currentPage); // Panggil fungsi untuk menghitung total halaman

  // Mendapatkan data transaksi penjualan untuk halaman saat ini
  const detailpenjualan = await fetchFilteredTransaksi(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Laporan Penjualan</h1>
      </div>  

      {/* Search and Filter Row */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:mt-8">
        {/* <Search placeholder="Search Laporan Penjualan..." /> */}
        <ReportFilterUI />
      </div>

      {/* Table */}
      <div className="mt-4  rounded-md p-4">
        <table className="min-w-full">
          <Suspense key={query + currentPage} fallback={<div>Loading table...</div>}>
            {/* <Table query={query} currentPage={currentPage} /> Kirim data ke komponen Table */}
          </Suspense>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> Panggil komponen Pagination dengan total halaman */}
      </div>
    </div>
  );
}