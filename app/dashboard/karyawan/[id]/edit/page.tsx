import Form from '@/app/ui/karyawan/edit-form';
import Breadcrumbs from '@/app/ui/karyawan/breadcrumbs';
import { fetchKaryawanById, fetchKaryawan } from '@/app/lib/data'; // Ensure you have a function to fetch all karyawan
import { notFound } from 'next/navigation';

// Since this is a dynamic route with [id], ensure that params are awaited before use.
export default async function Page({ params }: { params: { id: string } }) {
  // Await the params object before using it
  const { id } = await params;

  if (!id) {
    return notFound(); // Return not found if id is missing
  }

  try {
    const karyawan = await fetchKaryawanById(id);
    const allKaryawan = await fetchKaryawan(); // Fetch all karyawan

    if (!karyawan) {
      return notFound(); // Return not found if karyawan is not found
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Karyawan', href: '/dashboard/karyawan' },
            {
              label: 'Update karyawan',
              href: `/dashboard/karyawan/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form karyawan={karyawan} allKaryawan={allKaryawan} /> {/* Pass allKaryawan prop */}
      </main>
    );
  } catch (error) {
    console.error('Error fetching karyawan data:', error);
    return notFound(); // Gracefully handle potential errors during fetch
  }
}