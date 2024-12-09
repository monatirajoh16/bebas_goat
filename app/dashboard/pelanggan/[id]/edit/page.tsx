import Form from '@/app/ui/pelanggan/edit-form';
import Breadcrumbs from '@/app/ui/pelanggan/breadcrumbs';
import { fetchPelangganById, fetchPelanggan, fetchKaryawan } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);

  // Fetch the necessary data
  const karyawan = await fetchKaryawan();
  const pelanggan = await fetchPelangganById(id);

  // Handle the case where pelanggan data is not found
  if (!pelanggan) {
    return notFound();
  }

  // Fetch all pelanggan data and create unique categories
  const allPelanggan = await fetchPelanggan();

  // Update uniqueCategories to be an array of objects with nomor_hp_pelanggan and id_pelanggan
  const uniqueCategories = allPelanggan.map((item) => ({
    nomor_hp_pelanggan: item.nomor_hp_pelanggan,
    id_pelanggan: item.id_pelanggan,
  }));

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pelanggan', href: '/dashboard/pelanggan' },
          {
            label: 'Update pelanggan',
            href: `/dashboard/pelanggan/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form pelanggan={pelanggan} uniqueCategories={uniqueCategories} karyawan={karyawan} />
    </main>
  );
}
