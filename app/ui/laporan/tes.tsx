import { PencilIcon, PlusIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deletePelanggan } from '@/app/lib/actions';


export function TampilDetail_transaksi({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transaksi/${id}/tampil`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <EyeIcon className="w-5 h-5 text-white" />
    </Link>
  );
}

export function ExportlDetail_transaksi({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transaksi/${id}/print`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <ArrowDownTrayIcon className="w-5 h-5 text-white" />
    </Link>
  );
}