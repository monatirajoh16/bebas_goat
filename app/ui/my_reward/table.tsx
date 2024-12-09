import { fetchFilteredMy_reward } from '@/app/lib/data';
import { UpdateMy_reward, DeleteMy_reward } from '@/app/ui/my_reward/buttons';

export default async function My_rewardTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const my_rewards = await fetchFilteredMy_reward(query, currentPage);
  console.log(my_rewards);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Mobile View */}
              <div className="md:hidden">
                {my_rewards.map((my_reward, index) => (
                  <div
                    key={my_reward.id_my_reward}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                            ? 'bg-gray-400'
                            : index === 2
                            ? 'bg-orange-500'
                            : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{my_reward.nama_pelanggan}</p>
                          <p className="text-sm text-gray-500">{my_reward.nomor_hp_pelanggan}</p>
                          <p className="text-sm text-gray-500">{my_reward.poin} pts</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <UpdateMy_reward id={my_reward.id_my_reward} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full bg-white border border-gray-300 text-gray-900 md:table">
                <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
                  <tr>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Rank</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Nama pelanggan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Nomor Hp pelanggan</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Poin</th>
                    <th className="border border-red-950 px-4 py-3 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {my_rewards.map((my_reward, index) => (
                    <tr
                      key={my_reward.id_my_reward}
                      className={`group transition-transform transform hover:scale-105 ${
                        index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'
                      } hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                            ? 'bg-gray-400'
                            : index === 2
                            ? 'bg-orange-500'
                            : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {my_reward.nama_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {my_reward.nomor_hp_pelanggan}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {my_reward.poin}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center gap-3">
                          <UpdateMy_reward id={my_reward.id_my_reward} />
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

