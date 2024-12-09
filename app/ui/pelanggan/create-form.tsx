'use client';

import { PelangganTable } from '../../lib/definitions';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/button';
import { createPelanggan } from '@/app/lib/action';
import React, { useState } from 'react';

export default function Form({
  pelanggan = [],
}: {
  pelanggan: PelangganTable[];
}) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const namaPelanggan = formData.get('nama_pelanggan')?.toString().trim();
    const nomorHpPelanggan = formData.get('nomor_hp_pelanggan')?.toString().trim();

    // Validation: Check for empty fields
    if (!namaPelanggan || !nomorHpPelanggan) {
      setError('Data Belum Diisi.');
      return;
    }

    // Validation: Check for duplicate nama_pelanggan
    const isDuplicateName = pelanggan.some((item) => item.nama_pelanggan.toLowerCase() === namaPelanggan.toLowerCase());
    if (isDuplicateName) {
      setError('Nama Pelanggan Sudah Ada.');
      return;
    }

    // Validation: Check for duplicate nomor_hp_pelanggan
    const isDuplicatePhone = pelanggan.some((item) => item.nomor_hp_pelanggan === nomorHpPelanggan);
    if (isDuplicatePhone) {
      setError('Nomor HP Pelanggan Sudah Ada.');
      return;
    }

    // Clear error and proceed with form submission
    setError(null);
    await createPelanggan(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {/* Nama Pelanggan */}
        <div className="mb-4">
          <label htmlFor="nama_pelanggan" className="mb-2 block text-sm font-medium">
            Nama Pelanggan
          </label>
          <div className="relative">
            <input
              id="nama_pelanggan"
              name="nama_pelanggan"
              type="text"
              placeholder="Enter Nama Pelanggan"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Nomor HP Pelanggan */}
        <div className="mb-4">
          <label htmlFor="nomor_hp_pelanggan" className="mb-2 block text-sm font-medium">
            Nomor HP Pelanggan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="nomor_hp_pelanggan"
              name="nomor_hp_pelanggan"
              type="text" // Changed to text to allow for leading zeros
              placeholder="Enter Nomor HP Pelanggan"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pelanggan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          className="bg-gradient-to-b from-gray-800 to-red-900 transition-colors hover :from-red-700 hover:to-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create Pelanggan
        </Button>
      </div>
    </form>
  );
}