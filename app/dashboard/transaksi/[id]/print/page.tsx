// app/dashboard/transaksi/[id]/print/page.tsx
import { fetchTransaksiById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import PDFGenerator from '@/app/dashboard/transaksi/[id]/print/PDFGenerator'; // Import the client component

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

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

  // Render the PDF generator component and pass the transaksiItem
  return (
    <PDFGenerator transaksi={transaksiItem} />
  );
}