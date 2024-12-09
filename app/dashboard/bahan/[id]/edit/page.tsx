import Form from '@/app/ui/bahan/edit-form';
import Breadcrumbs from '@/app/ui/bahan/breadcrumbs';
import { fetchBahanById, fetchBahan } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // Tidak perlu await pada params, cukup akses langsung
  const { id } = params;

  if (!id) {
    return notFound();
  }

  try {
    const bahan = await fetchBahanById(id);
    if (!bahan) {
      return notFound();
    }

    // Fetch all bahan data to generate unique categories
    const allBahan = await fetchBahan();
    const uniqueCategories = Array.from(new Set(allBahan.map((item) => item.kategori_bahan)));

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Bahan', href: '/dashboard/bahan' },
            {
              label: 'Update bahan',
              href: `/dashboard/bahan/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form bahan={bahan} uniqueCategories={uniqueCategories} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching bahan data:', error);
    return notFound(); // Gracefully handle potential errors during fetch
  }
}
