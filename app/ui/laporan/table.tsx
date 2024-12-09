// import Search from '@/app/ui/search';
// import { fetchFilteredTransaksi } from '@/app/lib/data';
// import { TampilDetail_transaksi, ExportlDetail_transaksi } from './buttons';
// import { transaksiField } from '@/app/lib/definitions';
// export default async function TransaksiTable({
//   query,
//   currentPage,
// }: {
//   query: string;
//   currentPage: number;
// }) {
//   const transaksis = await fetchFilteredTransaksi(query, currentPage);

//   return (
//     <div className="w-full px-4">
//       <div className="mt-6 flow-root">
//         <div className="overflow-x-auto">
//           <div className="inline-block min-w-full align-middle">
//             <div className="overflow-hidden rounded-lg border border-gray-300">
//               {/* Tampilan untuk layar kecil */}
//               <div className="md:hidden">
//                 {transaksis.map((transaksi) => (
//                   <div
//                     key={transaksi.id_transaksi}
//                     className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg hover:shadow-xl"
//                   >
//                     <div className="flex items-center justify-between pb-4">
//                       <div>
//                         <p className="mb-1 text-sm font-medium text-gray-900">
//                           {transaksi.nama_pelanggan}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(transaksi.waktu_transaksi).toLocaleString('id-ID', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit',
//                           })}
//                         </p>
//                         <p className="text-sm text-gray-700 font-semibold">
//                           Rp{Number(transaksi.total_transaksi).toLocaleString('id-ID')}
//                         </p>
//                       </div>
//                       <div className="flex gap-2 items-center">
//                         <TampilDetail_transaksi id={transaksi.id_transaksi} />
//                         <ExportlDetail_transaksi id={transaksi.id_transaksi} />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Tampilan untuk layar besar */}
//               <table className="hidden min-w-full bg-white border border-gray-300 text-gray-900 md:table">
//                 <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
//                   <tr>
//                     <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
//                       Tanggal Transaksi
//                     </th>
//                     <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
//                       Nama Pelanggan
//                     </th>
//                     <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
//                       Total Transaksi
//                     </th>
//                     <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
//                       Aksi
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
//                   {transaksis.map((transaksi, index) => (
//                     <tr
//                       key={transaksi.id_transaksi}
//                       className={`group transition-transform transform hover:scale-105 ${
//                         index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
//                       } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
//                     >
//                       <td className="border border-gray-300 px-4 py-3 text-sm text-center">
//                         {new Date(transaksi.waktu_transaksi).toLocaleString('id-ID', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-3 text-sm text-center">
//                         {transaksi.nama_pelanggan}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-3 text-sm text-center">
//                         Rp{Number(transaksi.total_transaksi).toLocaleString('id-ID')}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-3 text-sm text-center">
//                         <div className="flex justify-center items-center gap-3">
                        
//                         <TampilDetail_transaksi id={transaksi.id_transaksi} />
//                         <ExportlDetail_transaksi id={transaksi.id_transaksi} />
                      
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTransaksi } from '@/app/lib/data';
// import { TampilDetail_transaksi, ExportlDetail_transaksi } from './buttons';
import React from 'react';

export default async function Transaksi_penjualanTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transaksipenjualan = await fetchFilteredTransaksi(query, currentPage);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Tampilan untuk layar kecil */}
              <div className="md:hidden">
                {transaksipenjualan?.map((tp) => (
                  <div
                    key={tp.id_transaksi}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="mb-1 text-sm font-medium text-white">
                          {tp.nama_pelanggan}
                        </p>
                        <p className="text-xs text-white">
                          {formatDateToLocal(tp.waktu_transaksi)}
                        </p>
                        <p className="text-sm text-gray-700 font-semibold">
                          Rp{Number(tp.total_transaksi).toLocaleString('id-ID')}
                        </p>
                      </div>
                      {/* <div className="flex gap-2 items-center">
                        <TampilDetail_transaksi id={tp.id_transaksi_penjualan} />
                        <ExportlDetail_transaksi id={tp.id_transaksi_penjualan} />
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tampilan untuk layar besar */}
              <table className="hidden min-w-full bg-white border border-gray-300 text-white md:table">
                <thead className="bg-gradient-to-b from-green-600 to-green-800 text-white">
                  <tr>
                    <th scope="col" className="border border-green-950 px-4 py-3 font-medium text-center">
                      Nama Pelanggan
                    </th>
                    <th scope="col" className="border border-green-950 px-4 py-3 font-medium text-center">
                      Nomor HP
                    </th>
                    <th scope="col" className="border border-green-950 px-4 py-3 font-medium text-center">
                      Total Transaksi
                    </th>
                    <th scope="col" className="border border-green-950 px-4 py-3 font-medium text-center">
                      Tanggal Transaksi
                    </th>
                    <th scope="col" className="border border-green-950 px-4 py-3 font-medium text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {transaksipenjualan?.map((tp, index) => (
                    <tr
                      key={tp.id_transaksi}
                      className={`group transition-transform transform hover:scale-105 ${
                        index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
                      } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                        {tp.nama_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                        {tp.nomor_hp_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                        Rp{Number(tp.total_transaksi).toLocaleString('id-ID')}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                        {formatDateToLocal(tp.waktu_transaksi)}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                        {/* <div className="flex justify-center items-center gap-3">
                          <TampilDetail_transaksi id={tp.id_transaksi_penjualan} />
                          <ExportlDetail_transaksi id={tp.id_transaksi_penjualan} />
                        </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
