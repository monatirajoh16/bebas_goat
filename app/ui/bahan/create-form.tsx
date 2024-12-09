'use client';

import { bahanField, karyawanField } from '../../lib/definitions';
import Link from 'next/link';
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/button';
import { createBahan } from '@/app/lib/action';
import React, { useState } from 'react';

export default function Form({
  bahan = [],
  karyawan = [],
}: {
  bahan: bahanField[];
  karyawan: karyawanField[];
}) {
  const uniqueCategories = Array.from(new Set(bahan.map((item) => item.kategori_bahan)));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const namaBahan = formData.get('nama_bahan')?.toString().trim();
    const kategoriBahan = formData.get('kategori_bahan');
    const idKaryawan = formData.get('id_karyawan');
    const stokBahan = formData.get('stok_bahan');

    // Validation: Check for empty fields (except id_karyawan)
    if (!namaBahan || !kategoriBahan || !stokBahan) {
      setError('Data Belum Diisi.');
      return;
    }

    // Validation: Check for duplicate nama_bahan
    const isDuplicate = bahan.some((item) => item.nama_bahan.toLowerCase() === namaBahan.toLowerCase());
    if (isDuplicate) {
      setError('Data Sudah Ada.');
      return;
    }

    // Clear error and proceed with form submission
    setError(null);
    await createBahan(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        
        {/* Nama Bahan as Input */}
        <div className="mb-4">
          <label htmlFor="nama_bahan" className="mb-2 block text-sm font-medium">
            Nama Bahan
          </label>
          <div className="relative">
            <input
              id="nama_bahan"
              name="nama_bahan"
              type="text"
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
            defaultValue=""
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

        {/* Select Karyawan*/}
        <label htmlFor="id_karyawan" className=" mb-2 block text-sm font-medium">
          Karyawan 
        </label>
        <div className="relative">
          <select
            id="id_karyawan"
            name="id_karyawan"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a Karyawan (Optional)
            </option>
            {karyawan.map((employee, index) => (
              <option key={index} value={employee.id_karyawan}>
                {employee.nama_karyawan}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        {/* Stok */}
        <div className="mb-4">
          <label htmlFor="stok_bahan" className="mb-2 block text-sm font-medium">
            Stok
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="stok_bahan"
              name="stok_bahan"
              type="number"
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
        <Button
          type="submit"
          className="bg-gradient-to-b from-gray-800 to-red-900 transition-colors hover:from-red-700 hover:to-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create Bahan
        </Button>
      </div>
    </form>
  );
}