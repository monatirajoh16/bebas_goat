import Form from '@/app/ui/transaksi/create-form';
import Breadcrumbs from '@/app/ui/transaksi/breadcrumbs';
import { fetchTransaksi, fetchKaryawan, fetchProduk, fetchJenjang, fetchPelanggan, fetchmy_reward } from '@/app/lib/data';

export default async function Page() {
  try {
    // Fetch all data concurrently to improve performance
    const [transaksi, karyawan, produk, jenjang, pelanggan,my_reward] = await Promise.all([
      fetchTransaksi(),
      fetchKaryawan(),   // Fetch karyawan data
      fetchProduk(),
      fetchJenjang(),    // Fetch produk data
      fetchPelanggan(), 
      fetchmy_reward(), // Fetch pelanggan data
    ]);

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Transaksi', href: '/dashboard/transaksi' },
            {
              label: 'Create Transaksi',
              href: '/dashboard/transaksi/create',
              active: true,
            },
          ]}
        />
        {/* Pass all data including pelanggan to Form */}
        <Form
          transaksi={transaksi}
          karyawan={karyawan}
          produk={produk}
          jenjang={jenjang}
          pelanggan={pelanggan} 
          my_reward={my_reward}  // Pass pelanggan data
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <main>
        <h2>Error loading data. Please try again later.</h2>
      </main>
    );
  }
}
