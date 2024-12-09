'use client';
import { transaksiField, karyawanField, produkField,jenjangField, pelangganField, my_rewardField } from '../../lib/definitions';
import React, { useState } from 'react';
import { UserCircleIcon, PlusIcon, MinusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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
  jenjang: jenjangField[]; // Add jenjang prop
  pelanggan: pelangganField[]; // Add pelanggan prop
  my_reward: my_rewardField[]; // Add my_reward prop
}) {
  const [produkList, setProdukList] = useState<
    { id_produk: string; nama_produk: string; harga_produk: number; quantity: number }[]
  >([]);
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

  const handleQuantityChange = (id_produk: string, increment: boolean) => {
    setProdukList((prev) =>
      prev.map((produkItem) =>
        produkItem.id_produk === id_produk
          ? {
              ...produkItem,
              quantity: increment
                ? produkItem.quantity + 1
                : Math.max(produkItem.quantity - 1, 1),
            }
          : produkItem
      )
    );
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  return (
    <form>
      <div className="rounded-md bg-[#D4B499] p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-6">Tambah Transaksi</h2>

        {/* No HP Pelanggan */}
        <div className="mb-4">
          <label htmlFor="no_hp" className="mb-2 block text-sm font-medium">
            No HP Pelanggan
          </label>
          <div className="relative">
            <input
              id="no_hp"
              name="no_hp"
              type="text"
              placeholder="Masukkan No HP Pelanggan"
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-[#D4B499]"
            />
            <CheckCircleIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
          </div>
        </div>

        {/* Pilihan Produk */}
        <div className="mb-4">
          <label htmlFor="produk" className="mb-2 block text-sm font-medium">
            Pilih Produk
          </label>
          <select
            id="produk"
            name="produk"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 bg-[#D4B499]"
            defaultValue=""
            onChange={(e) => handleAddProduct(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a Product
            </option>
            {produk.map((product) => (
              <option key={product.id_produk} value={product.id_produk}>
                {product.nama_produk} - {formatRupiah(product.harga_produk)}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
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
            <div className="flex items-center space-x-2 ml-4">
              <button
                type="button"
                onClick={() => handleQuantityChange(produkItem.id_produk, true)}
                className="flex items-center justify-center w-8 h-8 rounded-full border bg-gray-200 hover:bg-gray-300"
              >
                <PlusIcon className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-6 text-center">{produkItem.quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(produkItem.id_produk, false)}
                className="flex items-center justify-center w-8 h-8 rounded-full border bg-gray-200 hover:bg-gray-300"
              >
                <MinusIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}

        {/* Diskon */}
        <div className="mb-4">
          <label htmlFor="diskon" className="mb-2 block text-sm font-medium">
            Diskon
          </label>
          <select
            id="diskon"
            name="diskon"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-yellow-300"
          >
            <option value="">Pilih Diskon</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
          </select>
        </div>

        {/* Total Transaksi */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Total Transaksi</label>
          <input
            type="text"
            value={formatRupiah(totalTransaksi * (1 - parseFloat(discount || '0') / 100))}
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
