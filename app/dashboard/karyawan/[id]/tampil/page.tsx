import Form from '@/app/ui/karyawan/tampil-form';
import Breadcrumbs from '@/app/ui/karyawan/breadcrumbs';
import { fetchKaryawanById, fetchKaryawan } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params?: { id: string } }) {
  // Return notFound if params are missing or id is undefined
  if (!params?.id) {
    return notFound();
  }

  const id = params.id;
  const karyawan = await fetchKaryawanById(id);

  // Return notFound if no karyawan is found
  if (!karyawan) {
    return notFound();
  }

  // Fetch all karyawan data (for other purposes if needed)
  const allKaryawan = await fetchKaryawan();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Karyawan', href: '/dashboard/karyawan' },
          {
            label: 'Tampil karyawan',
            href: `/dashboard/karyawan/${id}/tampil`,
            active: true,
          },
        ]}
      />
      <Form karyawan={karyawan} /> {/* Pass the single karyawan object to Form */}
    </main>
  );
}
