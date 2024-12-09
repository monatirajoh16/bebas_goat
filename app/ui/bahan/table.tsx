import { kanit } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { fetchFilteredBahan } from '@/app/lib/data';
import { UpdateBahan, DeleteBahan } from '@/app/ui/bahan/buttons';

export default async function BahanTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const bahans = await fetchFilteredBahan(query, currentPage);
  console.log(bahans);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Mobile View */}
              <div className="md:hidden">
                {bahans.map((bahan) => (
                  <div
                    key={bahan.id_bahan}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{bahan.id_bahan}</p>
                        <p className="text-sm font-medium text-gray-900">{bahan.nama_bahan}</p>
                        <p className="text-sm text-gray-500">{bahan.kategori_bahan}</p>
                        <p className="text-sm text-gray-500">{bahan.stok_bahan}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <UpdateBahan id_bahan={bahan.id_bahan} />
                        <DeleteBahan id={bahan.id_bahan} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full bg-white border border-gray-300 text-gray-900 md:table">
                <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
                  <tr>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Nama Bahan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Kategori Bahan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Stok Bahan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {bahans.map((bahan, index) => (
                    <tr
                      key={bahan.id_bahan}
                      className={`group transition-transform transform hover:scale-105 ${
                        index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
                      } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {bahan.nama_bahan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {bahan.kategori_bahan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {bahan.stok_bahan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center gap-3">
                          <UpdateBahan id_bahan={bahan.id_bahan} />
                          <DeleteBahan id={bahan.id_bahan} />
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
