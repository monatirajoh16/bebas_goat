import Search from '@/app/ui/search';
import { fetchFilteredTransaksi } from '@/app/lib/data';
import { TampilTransaksi, UpdateTransaksi, DeleteTransaksi } from './buttons';

export default async function TransaksiTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // Ambil data transaksi berdasarkan query dan halaman
  const transaksis = await fetchFilteredTransaksi(query, currentPage);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Tampilan untuk layar kecil */}
              <div className="md:hidden">
                {transaksis.map((transaksi) => (
                  <div
                    key={transaksi.id_transaksi}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="mb-2 text-sm font-medium text-gray-900">
                          {transaksi.nama_pelanggan}
                        </p>
                        <p className="text-sm text-gray-500">{transaksi.total_transaksi}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <TampilTransaksi id={transaksi.id_transaksi} />
                        <DeleteTransaksi id={transaksi.id_transaksi} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tampilan untuk layar besar */}
              <table className="hidden min-w-full bg-white border border-gray-300 text-gray-900 md:table">
                <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
                  <tr>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      ID Transaksi
                    </th>
                    {/* <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Poin
                    </th> */}
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Nama Pelanggan
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Total Transaksi
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Waktu Transaksi
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {transaksis.map((transaksi, index) => (
                    <tr
                      key={transaksi.id_transaksi}
                      className={`group transition-transform transform hover:scale-105 ${
                        index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
                      } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {transaksi.id_transaksi}
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {transaksi.poin}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {transaksi.nama_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {transaksi.total_transaksi}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {new Date(transaksi.waktu_transaksi).toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center gap-3">
                          <TampilTransaksi id={transaksi.id_transaksi} />
                          <DeleteTransaksi id={transaksi.id_transaksi} />
                        </div>
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
