import Form from '@/app/ui/produk/edit-form';
import Breadcrumbs from '@/app/ui/produk/breadcrumbs';
import { fetchProdukById, fetchProduk, fetchKaryawan } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // Fetch data for karyawan
  const karyawan = await fetchKaryawan();

  // Fetch a single produk item by ID
  const produk = await fetchProdukById(id);

  if (!produk) {
    notFound();
  }

  // Fetch all produk data to generate unique categories
  const allProduk = await fetchProduk();
  const uniqueCategories = Array.from(new Set(allProduk.map((item) => item.kategori_produk)));

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Produk', href: '/dashboard/produk' },
          {
            label: 'Update produk',
            href: `/dashboard/produk/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form produk={produk} uniqueCategories={uniqueCategories} karyawan={karyawan} /> {/* Pass the single produk object to Form */}
    </main>
  );
}