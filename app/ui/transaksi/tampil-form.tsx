'use client';
import Link from 'next/link';
import React from 'react';
import { transaksiField, TransaksiTable } from '@/app/lib/definitions';

export default function TampilTransaksiForm({
  transaksi,
}: {
  transaksi: TransaksiTable;
}) {
  return (
    <div className="rounded-md bg-[#D4B499] p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-6">Detail Transaksi</h2>

      {/* Nama Pelanggan */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nama Pelanggan</label>
        <input
          value={transaksi.nama_pelanggan || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      {/* Nomor HP Pelanggan */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nomor HP Pelanggan</label>
        <input
          value={transaksi.nomor_hp_pelanggan || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      {/* Total Transaksi */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Total Transaksi</label>
        <input
          value={
            transaksi.total_transaksi !== undefined
              ? `Rp. ${transaksi.total_transaksi.toLocaleString('id-ID')}`
              : ''
          }
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      {/* Waktu Transaksi */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Waktu Transaksi</label>
        <input
          value={transaksi.waktu_transaksi || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      {/* Detail Pesanan
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Detail Pesanan</label>
        <div className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-gray-50">
          {transaksi.detail_pesanan && transaksi.detail_pesanan.length > 0 ? (
            transaksi.detail_pesanan.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.nama_produk || 'Nama Produk Tidak Tersedia'}</span>
                <span className="text-right">
                  Rp.{' '}
                  {item.harga_produk
                    ? item.harga_produk.toLocaleString('id-ID')
                    : 'Harga Tidak Tersedia'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Tidak ada detail pesanan.</p>
          )}
        </div>
      </div> */}

      {/* Tombol Back */}
      <div className="mt-6 flex justify-end">
        <Link
          href="/dashboard/transaksi"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
