import { kanit } from '@/app/ui/fonts';
// import Search from '@/app/ui/search';
import { fetchFilteredKaryawan } from '@/app/lib/data';
import { UpdateKaryawan, DeleteKaryawan, TampilKaryawan } from './buttons';

export default async function KaryawanTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const karyawans = await fetchFilteredKaryawan(query, currentPage);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Tampilan Mobile */}
              <div className="md:hidden">
                {karyawans?.map((karyawan) => (
                  <div
                    key={karyawan.id_karyawan}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{karyawan.nama_karyawan}</p>
                        <p className="text-sm text-gray-500">{karyawan.role_karyawan}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <TampilKaryawan id={karyawan.id_karyawan} />
                        <UpdateKaryawan id={karyawan.id_karyawan} />
                        <DeleteKaryawan id={karyawan.id_karyawan} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tampilan Desktop */}
              <table className="hidden min-w-full bg-white border border-gray-300 text-gray-900 md:table">
                <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
                  <tr>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Nama Karyawan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Username</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Role</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {karyawans?.map((karyawan, index) => (
                    <tr
                      key={karyawan.id_karyawan}
                      className={`group transition-transform transform hover:scale-105 ${
                        index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
                      } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {karyawan.nama_karyawan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {karyawan.username_karyawan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {karyawan.role_karyawan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center gap-3">
                          <TampilKaryawan id={karyawan.id_karyawan} />
                          <UpdateKaryawan id={karyawan.id_karyawan} />
                          <DeleteKaryawan id={karyawan.id_karyawan} />
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
