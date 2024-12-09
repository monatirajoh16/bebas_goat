import Form from '@/app/ui/karyawan/create-form';
import Breadcrumbs from '@/app/ui/karyawan/breadcrumbs';
import { fetchKaryawan } from '@/app/lib/data';
 
export default async function Page() {
  const karyawan = await fetchKaryawan();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Karyawan', href: '/dashboard/karyawan' },
          {
            label: 'Create Karyawan',
            href: '/dashboard/karyawan/create',
            active: true,
          },
        ]}
      />
      <Form karyawan={karyawan} />
    </main>
  );
}