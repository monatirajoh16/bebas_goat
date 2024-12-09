'use client';

import { deleteMy_reward } from '@/app/lib/action';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deletePelanggan } from '@/app/lib/actions';





export function CreateMy_reward() {
  return (
    <Link
      href="/dashboard/my_reward/create"
      className="flex h-10 items-center rounded-lg bg-orange-900 px-4 text-sm font-medium text-white transition-colors hover:from-red-700 hover:to-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create My Reward</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}



export function UpdateMy_reward({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/my_reward/${id}/edit`}
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <PencilIcon className="w-5 h-5 text-white" />
    </Link>
  );
}


// export function DeleteMy_reward({ id }: { id: string }) {
//   const deleteMy_rewardWithId = deleteMyreward.bind(null, id);
//   return (
//     <form action={deleteMy_rewardWithId}>
//       <button className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800   hover:from-red-700 hover:to-amber-600">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }

export function DeleteMy_reward({ id }: { id: string }) {
  async function handleDelete() {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
     
        await deleteMy_reward(id); // Call deleteKaryawan with the provided id
        alert('Data deleted successfully.'); // Inform the user of successful deletion
        // You can also redirect or update the UI here as needed
      
      }
    }
  

  return (
    <button
      type="button"
      onClick={handleDelete} // Trigger confirmation on button click
      className="rounded-md border p-2 bg-gradient-to-b from-gray-800 to-red-800 hover:from-red-700 hover:to-amber-600"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4 text-white" />
    </button>
  );
}
