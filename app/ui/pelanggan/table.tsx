import { kanit } from '@/app/ui/fonts';
// import Search from '@/app/ui/search';
import { fetchFilteredPelanggan } from '@/app/lib/data';
import { UpdatePelanggan, DeletePelanggan } from './buttons';

export default async function PelangganTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pelanggans = await fetchFilteredPelanggan(query, currentPage);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Mobile View */}
              <div className="md:hidden">
                {pelanggans?.map((pelanggan) => (
                  <div
                    key={pelanggan.id_pelanggan}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{pelanggan.nama_pelanggan}</p>
                        <p className="text-sm text-gray-500">{pelanggan.nomor_hp_pelanggan}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <UpdatePelanggan id={pelanggan.id_pelanggan} />
                        <DeletePelanggan id={pelanggan.id_pelanggan} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full bg-white border border-gray-300 text-gray-900 md:table">
                <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
                  <tr>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Nama pelanggan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">No hp pelanggan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">poin</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Aksi</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {pelanggans?.map((pelanggan, index) => (
                    <tr
                      key={pelanggan.id_pelanggan}
                      className={`group transition-transform transform hover:scale-105 ${
                        index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
                      } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {pelanggan.nama_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {pelanggan.nomor_hp_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {pelanggan.poin}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center gap-3">
                          <UpdatePelanggan id={pelanggan.id_pelanggan} />
                          <DeletePelanggan id={pelanggan.id_pelanggan} />
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
