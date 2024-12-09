'use client';

import { karyawanField } from '../../lib/definitions';
import Link from 'next/link';
import React from 'react';

export default function TampilKaryawanForm({  
  karyawan 
}: { 
  karyawan: karyawanField 
}) { 
  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nama Karyawann</label>
        <input
          value={karyawan.nama_karyawan}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nomor HP Karyawan</label>
        <input
          value={karyawan.nomor_hp_karyawan}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Bank Karyawan</label>
        <input
          value={karyawan.bank_karyawan}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nomor Rekening Karyawan</label>
        <input
          value={karyawan.nomor_rekening_karyawan}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Alamat Karyawan</label>
        <input
          value={karyawan.alamat_karyawan}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Username Karyawan</label>
        <input
          value={karyawan.username_karyawan}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Role Karyawan</label>
        <p className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50">
          {karyawan.role_karyawan === "karyawan" ? "Karyawan" : "SPV"}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href="/dashboard/karyawan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
