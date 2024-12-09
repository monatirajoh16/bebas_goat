'use client';

import { karyawanField, pelangganField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { updatePelanggan } from '@/app/lib/action';
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Perbarui tipe uniqueCategories menjadi array dari objek yang memiliki nomor_hp_pelanggan dan id_pelanggan
interface UniqueCategory {
  nomor_hp_pelanggan: string;
  id_pelanggan: string;
}

export default function EditPelangganForm({ 
  pelanggan, 
  uniqueCategories, 
  karyawan 
}: { 
  pelanggan: pelangganField, 
  uniqueCategories: UniqueCategory[], // Perbarui tipe di sini
  karyawan: karyawanField[] 
}) { 
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('id_jenjang', pelanggan.id_jenjang);

    const namaPelanggan = formData.get('nama_pelanggan')?.toString().trim();
    const nomorHpPelanggan = formData.get('nomor_hp_pelanggan')?.toString().trim();

    // Validation: Ensure all fields are filled
    if (!namaPelanggan || !nomorHpPelanggan) {
      setError('Nama pelanggan dan nomor HP harus diisi.');
      return;
    }

    // Clear any existing error messages
    setError(null);

    // Check for duplicate nomor_hp_pelanggan in the existing pelanggan list
    const isDuplicatePhone = uniqueCategories.some((item) => 
      item.nomor_hp_pelanggan === nomorHpPelanggan && item.id_pelanggan !== pelanggan.id_pelanggan
    );
    if (isDuplicatePhone) {
      setError('Nomor HP sudah terdaftar. Silakan gunakan nomor HP yang lain.');
      return;
    }

    try {
      const response = await updatePelanggan(pelanggan.id_pelanggan, formData);
      if (response?.message) {
        alert('Update berhasil');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
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
              defaultValue={pelanggan.nama_pelanggan}
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
              type="text"
              defaultValue={pelanggan.nomor_hp_pelanggan}
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
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}