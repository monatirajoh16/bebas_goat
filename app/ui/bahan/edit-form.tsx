'use client';

import { bahanField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { updateBahan } from '@/app/lib/action';
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function EditBahanForm({ 
  bahan, 
  uniqueCategories 
}: { 
  bahan: bahanField, 
  uniqueCategories: string[] 
}) { 
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const namaBahan = formData.get('nama_bahan')?.toString().trim();
    const kategoriBahan = formData.get('kategori_bahan');
    const stokBahan = formData.get('stok_bahan');

    // Validation: Ensure all fields are filled
    if (!namaBahan || !kategoriBahan || !stokBahan) {
      setError('All fields are required.');
      return;
    }

    // Validation: Check if Nama Bahan is unique
    const isDuplicate = uniqueCategories.some(
      (category) => category.toLowerCase() === namaBahan.toLowerCase() && category !== bahan.nama_bahan.toLowerCase()
    );
    if (isDuplicate) {
      setError('Nama Bahan must be unique.');
      return;
    }

    // Clear any existing error messages
    setError(null);

    try {
      const response = await updateBahan(bahan.id_bahan, formData);
      if (response?.message) {
        alert('Update successful');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {/* Nama Bahan */}
        <div className="mb-4">
          <label htmlFor="nama_bahan" className="mb-2 block text-sm font-medium">
            Nama Bahan
          </label>
          <div className="relative">
            <input
              id="nama_bahan"
              name="nama_bahan"
              type="text"
              defaultValue={bahan.nama_bahan}
              placeholder="Enter Nama Bahan"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Kategori Bahan */}
        <label htmlFor="kategori_bahan" className="mb-2 block text-sm font-medium">
          Kategori Bahan
        </label>
        <div className="relative">
          <select
            id="kategori_bahan"
            name="kategori_bahan"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={bahan.kategori_bahan}
            required
          >
            <option value="" disabled>
              Select a Kategori
            </option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        {/* Stok Bahan */}
        <div className="mb-4">
          <label htmlFor="stok_bahan" className="mb-2 block text-sm font-medium">
            Stok
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="stok_bahan"
              name="stok_bahan"
              type="number"
              defaultValue={bahan.stok_bahan}
              placeholder="Enter stock"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/bahan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}