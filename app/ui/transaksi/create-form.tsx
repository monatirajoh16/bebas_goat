'use client';
import {
  transaksiField,
  karyawanField,
  produkField,
  jenjangField,
  pelangganField,
  my_rewardField,
} from '../../lib/definitions';
import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function Form({
  transaksi = [],
  karyawan = [],
  produk = [],
  jenjang = [],
  pelanggan = [],
  my_reward = [],
}: {
  transaksi: transaksiField[];
  karyawan: karyawanField[];
  produk: produkField[];
  jenjang: jenjangField[];
  pelanggan: pelangganField[];
  my_reward: my_rewardField[];
}) {
  const [produkList, setProdukList] = useState<
    { id_produk: string; nama_produk: string; harga_produk: number; quantity: number }[]
  >([]);
  const [selectedPelanggan, setSelectedPelanggan] = useState<pelangganField | null>(null);
  const [discount, setDiscount] = useState('');

  const totalTransaksi = produkList.reduce(
    (total, produkItem) => total + produkItem.harga_produk * produkItem.quantity,
    0
  );

  const handleAddProduct = (id_produk: string) => {
    const selectedProduct = produk.find((p) => p.id_produk === id_produk);
    if (!selectedProduct) return;

    setProdukList((prev) => {
      const existingProduct = prev.find((p) => p.id_produk === id_produk);
      if (existingProduct) {
        return prev.map((p) =>
          p.id_produk === id_produk ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [
          ...prev,
          {
            id_produk,
            nama_produk: selectedProduct.nama_produk,
            harga_produk: selectedProduct.harga_produk,
            quantity: 1,
          },
        ];
      }
    });
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  return (
    <form>
      <div className="rounded-md bg-[#D4B499] p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-6">Tambah Transaksi</h2>

        {/* Pilih Pelanggan */}
        <div className="mb-4">
          <label htmlFor="pelanggan" className="mb-2 block text-sm font-medium">
            Pilih Pelanggan
          </label>
          <select
            id="pelanggan"
            name="pelanggan"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm bg-[#D4B499]"
            value={selectedPelanggan?.id_pelanggan || ''}
            onChange={(e) => {
              const pelangganId = e.target.value;
              const pelangganData = pelanggan.find((p) => p.id_pelanggan === pelangganId);
              setSelectedPelanggan(pelangganData || null);
            }}
          >
            <option value="" disabled>
              Pilih Pelanggan
            </option>
            {pelanggan.map((p) => (
              <option key={p.id_pelanggan} value={p.id_pelanggan}>
                {p.nama_pelanggan} - {p.nomor_hp_pelanggan}
              </option>
            ))}
          </select>
        </div>

        {/* Tampilkan Nomor HP Pelanggan */}
        <div className="mb-4">
          <label htmlFor="nomor_hp_pelanggan" className="mb-2 block text-sm font-medium">
            No HP Pelanggan
          </label>
          <input
            id="nomor_hp_pelanggan"
            name="nomor_hp_pelanggan"
            type="text"
            value={selectedPelanggan?.nomor_hp_pelanggan || ''}
            readOnly
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-[#D4B499]"
          />
        </div>

        {/* Pilihan Produk */}
        <div className="mb-4">
          <label htmlFor="produk" className="mb-2 block text-sm font-medium">
            Pilih Produk
          </label>
          <select
            id="produk"
            name="produk"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm bg-[#D4B499]"
            defaultValue=""
            onChange={(e) => handleAddProduct(e.target.value)}
            required
          >
            <option value="" disabled>
              Pilih Produk
            </option>
            {produk.map((product) => (
              <option key={product.id_produk} value={product.id_produk}>
                {product.nama_produk} - {formatRupiah(product.harga_produk)}
              </option>
            ))}
          </select>
        </div>

        {/* Daftar Produk yang Dipilih */}
        {produkList.map((produkItem) => (
          <div key={produkItem.id_produk} className="mb-4 flex items-center">
            <div className="flex-grow">
              <label className="mb-2 block text-sm font-medium">
                {produkItem.nama_produk}
              </label>
              <input
                type="text"
                value={formatRupiah(produkItem.harga_produk)}
                readOnly
                className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-[#D4B499]"
              />
            </div>
          </div>
        ))}

        {/* Total Transaksi */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Total Transaksi</label>
          <input
            type="text"
            value={formatRupiah(totalTransaksi)}
            readOnly
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-[#D4B499]"
          />
        </div>

        {/* Tombol Simpan */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Simpan
          </button>
        </div>
      </div>
    </form>
  );
}
