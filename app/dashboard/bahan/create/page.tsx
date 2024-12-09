import Form from '@/app/ui/bahan/create-form';
import Breadcrumbs from '@/app/ui/bahan/breadcrumbs';
import { fetchBahan,fetchKaryawan } from '@/app/lib/data';
// import{CreateBahan} from '@/root/padsi_goat/GOAT_PADSI/app/ui/bahan/buttons.tsx';

export default async function Page() {
  const bahan = await fetchBahan();
  const karyawan = await fetchKaryawan(); // Ambil data karyawan

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bahan', href: '/dashboard/bahan' },
          {
            label: 'Create Bahan',
            href: '/dashboard/bahan/create',
            active: true,
          },
        ]}
      />
      <Form bahan={bahan} karyawan={karyawan} /> {/* Kirim data karyawan ke Form */}
    </main>
  );
}
