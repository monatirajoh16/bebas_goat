'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePelanggan } from '@/app/lib/action';




export function CreatePelanggan() {
  return (
    <Link
      href="/dashboard/pelanggan/create"
      className="flex h-10 items-center rounded-lg bg-orange-900 px-4 text-sm font-medium text-white transition-colors hover:red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Pelanggan</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdatePelanggan({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pelanggan/${id}/edit`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <PencilIcon className="w-5 h-5 text-white" />
    </Link>
  );
}

// export function DeletePelanggan({ id }: { id: string }) {
//   async function handleDelete(formData: FormData): Promise<void> {
//     await deletePelanggan(id); // Call deleteBahan with the provided id
//     // Handle response or errors here if needed
//   }

//   return (
//     <form action={handleDelete}>
//       <button className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }

export function DeletePelanggan({ id }: { id: string }) {
  async function handleDelete(formData: FormData): Promise<void> {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      await deletePelanggan(id); // Call deleteKaryawan with the provided id
      alert('Data deleted successfully.'); // Optional: Inform the user of successful deletion
      // You can also redirect or update the UI here as needed
    }
  }

  return (
    <form action={handleDelete}>
      <button
        type="button"
        onClick={() => handleDelete(new FormData())} // Trigger confirmation on button click
        className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 text-white" />
      </button>
    </form>
  );
}


// export function DeletePelanggan({ id }: { id: string }) {
//   const deletePelangganWithId = deletePelanggan.bind(null, id);
//   return (
//     <form action={deletePelangganWithId}>
//       <button className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800   hover:from-red-700 hover:to-amber-600">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }







export function CreateKaryawan() {
  return (
    <Link
      href="/dashboard/karyawan/create"
      className="flex h-10 items-center rounded-lg bg-orange-900 px-4 text-sm font-medium text-white transition-colors hover:red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Karyawan</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}



export function UpdateKaryawan({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/karyawan/${id}/edit`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <PencilIcon className="w-5 h-5 text-white" />
    </Link>
  );
}

// export function DeleteKaryawan({ id }: { id: string }) {
//   const deleteKaryawanWithId = deleteKaryawan.bind(null, id);
//   return (
//     <form action={deleteKaryawanWithId}>
//       <button className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800   hover:from-red-700 hover:to-amber-600">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }

