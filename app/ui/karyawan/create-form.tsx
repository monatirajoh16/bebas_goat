'use client';

import { karyawanField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { createKaryawan } from '@/app/lib/action';
import React, { useState } from 'react';

export default function Form({ karyawan }: { karyawan: karyawanField[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const namaKaryawan = formData.get('nama_karyawan')?.toString().trim();
    const nomorHpKaryawan = formData.get('nomor_hp_karyawan')?.toString().trim();
    const bankKaryawan = formData.get('bank_karyawan')?.toString().trim();
    const nomorRekeningKaryawan = formData.get('nomor_rekening_karyawan')?.toString().trim();
    const alamatKaryawan = formData.get('alamat_karyawan')?.toString().trim();
    const kataSandiKaryawan = formData.get('kata_sandi_karyawan')?.toString().trim();
    const usernameKaryawan = formData.get('username_karyawan')?.toString().trim();
    const roleKaryawan = formData.get('role_karyawan')?.toString().trim();

    // Validation: Check for empty fields
    if (!namaKaryawan || !nomorHpKaryawan || !bankKaryawan || !nomorRekeningKaryawan || !alamatKaryawan || !kataSandiKaryawan || !usernameKaryawan || !roleKaryawan) {
      setError('Semua data harus diisi.');
      return;
    }

    // Validation: Check for duplicate username, nomor HP, and nomor rekening
    const isUsernameDuplicate = karyawan.some((item) => item.username_karyawan.toLowerCase() === usernameKaryawan.toLowerCase());
    const isNomorHpDuplicate = karyawan.some((item) => item.nomor_hp_karyawan === nomorHpKaryawan);
    const isNomorRekeningDuplicate = karyawan.some((item) => item.nomor_rekening_karyawan === nomorRekeningKaryawan);

    if (isUsernameDuplicate) {
      setError('Username sudah digunakan.');
      return;
    }
    if (isNomorHpDuplicate) {
      setError('Nomor HP sudah digunakan.');
      return;
    }
    if (isNomorRekeningDuplicate) {
      setError('Nomor rekening sudah digunakan.');
      return;
    }

    // Clear error and proceed with form submission
    setError(null);
    await createKaryawan(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {error && <div className="mb-4 text-red-600">{error}</div>}

        {/* Nama Karyawan */}
        <div className="mb-4">
          <label htmlFor="nama_karyawan" className="mb-2 block text-sm font-medium">
            Nama Karyawan
          </label>
          <input
            id="nama_karyawan"
            name="nama_karyawan"
            type="text"
            placeholder="Enter Nama Karyawan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Nomor HP Karyawan */}
        <div className="mb-4">
          <label htmlFor="nomor_hp_karyawan" className="mb-2 block text-sm font-medium">
            Nomor HP Karyawan
          </label>
          <input
            id="nomor_hp_karyawan"
            name="nomor_hp_karyawan"
            type="tel"
            placeholder="Enter Nomor HP Karyawan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Bank Karyawan */}
        <div className="mb-4">
          <label htmlFor="bank_karyawan" className="mb-2 block text-sm font-medium">
            Bank Karyawan
          </label>
          <input
            id="bank_karyawan"
            name="bank_karyawan"
            type="text"
            placeholder="Enter Bank Karyawan"
            className="block w-full rounded-md border border-gray -200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Nomor Rekening Karyawan */}
        <div className="mb-4">
          <label htmlFor="nomor_rekening_karyawan" className="mb-2 block text-sm font-medium">
            Nomor Rekening Karyawan
          </label>
          <input
            id="nomor_rekening_karyawan"
            name="nomor_rekening_karyawan"
            type="text"
            placeholder="Enter Nomor Rekening Karyawan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Alamat Karyawan */}
        <div className="mb-4">
          <label htmlFor="alamat_karyawan" className="mb-2 block text-sm font-medium">
            Alamat Karyawan
          </label>
          <input
            id="alamat_karyawan"
            name="alamat_karyawan"
            type="text"
            placeholder="Enter Alamat Karyawan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Kata Sandi Karyawan */}
        <div className="mb-4">
          <label htmlFor="kata_sandi_karyawan" className="mb-2 block text-sm font-medium">
            Kata Sandi Karyawan
          </label>
          <input
            id="kata_sandi_karyawan"
            name="kata_sandi_karyawan"
            type="password"
            placeholder="Enter Kata Sandi Karyawan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Username Karyawan */}
        <div className="mb-4">
          <label htmlFor="username_karyawan" className="mb-2 block text-sm font-medium">
            Username Karyawan
          </label>
          <input
            id="username_karyawan"
            name="username_karyawan"
            type="text"
            placeholder="Enter Username Karyawan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Role Karyawan */}
        <div className="mb-4">
          <label htmlFor="role_karyawan" className="mb-2 block text-sm font-medium">
            Role Karyawan
          </label>
          <select
            id="role_karyawan"
            name="role_karyawan"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="karyawan">Karyawan</option>
            <option value="SPV">SPV</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/karyawan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Karyawan</Button>
      </div>
    </form>
  );
}