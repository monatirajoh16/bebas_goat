import { Suspense } from 'react';
import Search from '../../ui/search';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredPelanggan } from '@/app/lib/data';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  try {
    const allPelanggan = await fetchFilteredPelanggan(query, currentPage);
    
    // Handle case where no results are found
    if (!allPelanggan || allPelanggan.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-white text-lg">No results found. Try different search terms.</p>
        </div>
      );
    }

    // Get top 3 pelanggan
    const topThree = allPelanggan.slice(0, 3);
    // Get remaining pelanggan starting from rank 4
    const remainingPelanggan = allPelanggan.slice(3);

    return (
      <div className="w-full">
        {/* Top Users Section */}
        <div className="w-full px-4 py-12 flex justify-center items-end space-x-8">
          {/* Second Place */}
          <div className="text-center transform translate-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 mx-auto overflow-hidden border-4 border-gray-300">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-full px-3 py-1 text-sm font-bold">
                #2
              </div>
            </div>
            <h3 className="mt-4 text-white font-bold">{topThree[1]?.nama_pelanggan || 'Loading...'}</h3>
            <div className="mt-1">
              <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                {topThree[1]?.poin?.toLocaleString() || 0} pts
              </span>
            </div>
          </div>

          {/* First Place */}
          <div className="text-center transform -translate-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 mx-auto overflow-hidden border-4 border-yellow-400">
                <div className="w-full h-full bg-yellow-300 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 rounded-full px-3 py-1 text-sm font-bold">
                #1
              </div>
            </div>
            <h3 className="mt-4 text-white font-bold text-xl">{topThree[0]?.nama_pelanggan || 'Loading...'}</h3>
            <div className="mt-1">
              <span className="bg-white/20 px-4 py-1.5 rounded-full text-white">
                {topThree[0]?.poin?.toLocaleString() || 0} pts
              </span>
            </div>
          </div>

          {/* Third Place */}
          <div className="text-center transform translate-y-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 mx-auto overflow-hidden border-4 border-orange-300">
                <div className="w-full h-full bg-orange-300 flex items-center justify-center text-lg font-bold">
                  3
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-300 rounded-full px-3 py-1 text-sm font-bold">
                #3
              </div>
            </div>
            <h3 className="mt-4 text-white font-bold">{topThree[2]?.nama_pelanggan || 'Loading...'}</h3>
            <div className="mt-1">
              <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                {topThree[2]?.poin?.toLocaleString() || 0} pts
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-lg">
          {/* Mobile View */}
          <div className="md:hidden">
            {remainingPelanggan?.map((p, index) => (
              <div
                key={p.id_pelanggan}
                className="mb-2 w-full rounded-lg bg-[#272E3F] p-4 border-b border-gray-700"
              >
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 4}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{p.nama_pelanggan}</p>
                      <p className="text-sm text-gray-400">{p.poin?.toLocaleString()} pts</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <table className="hidden min-w-full text-white md:table">
            <thead className="bg-[#272E3F]">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium text-center">
                  Rank
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-center">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-center">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {remainingPelanggan?.map((p, index) => (
                <tr key={p.id_pelanggan} className="bg-[#1E2432] hover:bg-[#272E3F] transition-colors">
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 font-bold">
                      {index + 4}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {p.nama_pelanggan}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {p.poin?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Table component:', error);
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg">Something went wrong. Please try again later.</p>
      </div>
    );
  }
}
