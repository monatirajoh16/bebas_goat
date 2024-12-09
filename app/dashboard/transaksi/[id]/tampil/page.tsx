import Form from '@/app/ui/transaksi/tampil-form';
import Breadcrumbs from '@/app/ui/transaksi/breadcrumbs';
import { fetchTransaksiById, fetchTransaksi } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // Await params to access its properties
  const { id } = await params;

  // Return notFound if id is undefined
  if (!id) {
    return notFound();
  }

  // Fetch the transaksi data by ID
  const transaksi = await fetchTransaksiById(id, 1); // Pass currentPage if necessary

  // Return notFound if no transaksi is found with the provided ID
  if (!transaksi || transaksi.length === 0) {
    return notFound();
  }

  // Assuming fetchTransaksiById returns a single transaction, not an array
  const transaksiItem = transaksi[0]; // If it's an array, extract the first item.

  // Fetch all transaksi data (for other purposes if needed)
  const allTransaksi = await fetchTransaksi();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transaksi', href: '/dashboard/transaksi' },
          {
            label: 'Tampil transaksi',
            href: `/dashboard/transaksi/${id}/tampil`,
            active: true,
          },
        ]}
      />
      <Form transaksi={transaksiItem} /> {/* Pass the single transaksi object to Form */}
    </main>
  );
}