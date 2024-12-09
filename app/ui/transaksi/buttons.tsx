'use client';
import { PencilIcon, PlusIcon, TrashIcon,EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTransaksi } from '@/app/lib/action';

export function CreateTransaksi() {
  return (
    <Link
      href="/dashboard/transaksi/create"
      className="flex h-10 items-center rounded-lg bg-orange-900 px-4 text-sm font-medium text-white transition-colors hover:from-red-700 hover:to-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Transaksi</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdateTransaksi({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transaksi/${id}/edit`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <PencilIcon className="w-5 h-5 text-white" />
    </Link>
  );
}

export function DeleteTransaksi({ id }: { id: string }) {
  async function handleDelete() {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      await deleteTransaksi(id); // Panggil fungsi deleteTransaksi dengan id yang diberikan
      alert('Data deleted successfully.'); // Opsional: memberi tahu pengguna bahwa data berhasil dihapus
      // Anda bisa menambahkan logika untuk mengarahkan ulang atau memperbarui UI di sini jika diperlukan
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete} // Panggil handleDelete langsung pada event onClick
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4 text-white" />
    </button>
  );
}

export function TampilTransaksi({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transaksi/${id}/tampil`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <EyeIcon className="w-5 h-5 text-white" />
    </Link>
  );
}