import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CustomersTableType, FormattedCustomersTable } from '@/app/lib/definitions';
import { fetchFilteredProduk } from '@/app/lib/data';
import { UpdateProduk, DeleteProduk } from './buttons';

export default async function produkTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const produk = await fetchFilteredProduk(query, currentPage);

  return (
    <div className="w-full px-4">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-300">
              {/* Tampilan untuk layar kecil */}
              <div className="md:hidden">
                {produk?.map((p) => (
                  <div
                    key={p.id_produk}
                    className="mb-2 w-full rounded-lg bg-white p-4 border-b border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-900">{p.id_produk}</p>
                        </div>
                        <p className="text-sm text-gray-500">{p.harga_produk}</p>
                        <p className="text-sm text-gray-500">{p.nama_produk}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <UpdateProduk id_produk={p.id_produk} />
                        <DeleteProduk id={p.id_produk} />
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
                      Nama Produk
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Harga Produk
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Kategori Produk
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Gambar
                    </th>
                    <th scope="col" className="border border-red-950 px-4 py-3 font-medium text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
                  {produk?.map((p, index) => (
                    <tr
                      key={p.id_produk}
                      className={`group transition-transform transform hover:scale-105 ${index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'} hover:bg-[#4A3622] hover:text-white hover:shadow-lg`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {p.nama_produk}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {p.harga_produk}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {p.kategori_produk}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                      {p.gambar || '1.png'}
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        {p.gambar ? (
                          <Image
                            src={`/images/${p.gambar}`} // Pastikan gambar diambil dengan benar dari public/images/
                            alt={p.nama_produk}
                            width={64}  // Atur lebar gambar
                            height={64} // Atur tinggi gambar
                            className="object-cover rounded-lg" // Styling gambar
                          />
                        ) : (
                          'No image' // Jika gambar tidak ada, tampilkan pesan
                        )}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-3 text-sm text-center transition-all duration-300 ease-in-out">
                        <div className="flex justify-center items-center gap-3">
                          <UpdateProduk id_produk={p.id_produk} />
                          <DeleteProduk id={p.id_produk} />
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
