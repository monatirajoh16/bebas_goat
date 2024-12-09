'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteBahan } from '@/app/lib/action';




export function CreateBahan() {
  return (
    <Link
      href="/dashboard/bahan/create"
      className="flex h-10 items-center rounded-lg bg-orange-900 px-4 text-sm font-medium text-white transition-colors hover:red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Bahan</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdateBahan({ id_bahan }: { id_bahan: string }) {
  return (
    <Link
      href={`/dashboard/bahan/${id_bahan}/edit`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <PencilIcon className="w-5 h-5 text-white" />
    </Link>
  );
}



// export function DeleteBahan({ id_bahan }: { id_bahan: string }) {
//   const deleteBahanWithId = deleteBahan.bind(null, id_bahan);
//   return (
//     <form action={deleteBahanWithId}>
//       <button className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800   hover:from-red-700 hover:to-amber-600">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }


// import { deleteBahan } from 'path-to-deleteBahan'; // Make sure to replace this path accordingly

// export function DeleteBahan({ id }: { id: string }) {
//   async function handleDelete(formData: FormData): Promise<void> {
//     await deleteBahan(id); // Call deleteBahan with the provided id
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

export function DeleteBahan({ id }: { id: string }) {
  async function handleDelete(formData: FormData): Promise<void> {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      await deleteBahan(id); // Call deleteKaryawan with the provided id
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






// export function DeleteBahan({ id_bahan }: { id_bahan: string }) {
//   const handleDelete = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const confirmDelete = window.confirm('Are you sure you want to delete this item?');
//     if (!confirmDelete) return;

//     try {
//       await deleteBahan(id_bahan);
//       alert('Bahan deleted successfully');
//       // Optionally, you could trigger a re-fetch or redirect to update the UI after deletion
//     } catch (error) {
//       console.error('Failed to delete bahan:', error);
//       alert('Failed to delete bahan. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleDelete}>
//       <button
//         type="submit"
//         className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
//       >
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }



// // export function DeletePelanggan({ id }: { id: string }) {
// //   const deletePelangganWithId = deletePelanggan.bind(null, id);
// //   return (
// //     <form action={deletePelangganWithId}>
// //       <button className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800   hover:from-red-700 hover:to-amber-600">
// //         <span className="sr-only">Delete</span>
// //         <TrashIcon className="w-4 text-white" />
// //       </button>
// //     </form>
// //   );
// // }

