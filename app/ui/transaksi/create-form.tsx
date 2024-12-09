'use client';
import React, { useState } from 'react';
import { UserCircleIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import {
  transaksiField,
  karyawanField,
  produkField,
  jenjangField,
  pelangganField,
  my_rewardField,
} from '../../lib/definitions';
import { createTransaksi } from '@/app/lib/action';

export default function Form({
  transaksi = [],
  karyawan = [],
  produk = [],
  pelanggan = [],
}: {
  transaksi: transaksiField[];
  karyawan: karyawanField[];
  produk: produkField[];
  pelanggan: pelangganField[];
}) {
  const router = useRouter();

  const [produkList, setProdukList] = useState<{
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
    quantity: number;
  }[]>([]);
  const [diskon, setDiskon] = useState<number>(0);
  const [selectedPelanggan, setSelectedPelanggan] = useState<string>('');

  const totalTransaksi = produkList.reduce(
    (total, produkItem) => total + produkItem.harga_produk * produkItem.quantity,
    0
  );

  // Menambahkan diskon berdasarkan poin pelanggan
  const handleSelectPelanggan = (id_pelanggan: string) => {
    setSelectedPelanggan(id_pelanggan);

    const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === id_pelanggan);
    if (!selectedPelangganData) {
      setDiskon(0);
      return;
    }

    const poin = selectedPelangganData.poin || 0;
    if (poin >= 100000) setDiskon(20);
    else if (poin >= 50000) setDiskon(15);
    else if (poin >= 10000) setDiskon(10);
    else setDiskon(0);
  };

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

  const handleDecreaseProduct = (id_produk: string) => {
    setProdukList((prev) =>
      prev
        .map((produkItem) =>
          produkItem.id_produk === id_produk
            ? { ...produkItem, quantity: produkItem.quantity - 1 }
            : produkItem
        )
        .filter((produkItem) => produkItem.quantity > 0)
    );
  };

  const handleDeleteProduct = (id_produk: string) => {
    setProdukList((prev) => prev.filter((produkItem) => produkItem.id_produk !== id_produk));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === selectedPelanggan);
    const totalSetelahDiskon = totalTransaksi * (1 - diskon / 100);

    const formData = new FormData();
    formData.append('id_pelanggan', selectedPelangganData?.id_pelanggan || '');
    formData.append('nama_pelanggan', selectedPelangganData?.nama_pelanggan || '');
    formData.append('total_transaksi', totalSetelahDiskon.toString());
    formData.append('diskon', diskon.toString());
    formData.append('produkList', JSON.stringify(produkList));

    try {
      await createTransaksi(formData);
      console.log('Transaksi berhasil disimpan.');
      router.push('/dashboard/transaksi');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md bg-[#D4B499] p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-6">Tambah Transaksi</h2>

        {/* Pilih Pelanggan */}
        <div className="mb-4">
          <label htmlFor="id_pelanggan" className="mb-2 block text-sm font-medium">
            Pilih Pelanggan
          </label>
          <select
            id="id_pelanggan"
            value={selectedPelanggan}
            onChange={(e) => handleSelectPelanggan(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm bg-[#D4B499]"
          >
            <option value="">Pilih Pelanggan</option>
            {pelanggan.map((p) => (
              <option key={p.id_pelanggan} value={p.id_pelanggan}>
                {p.nama_pelanggan} - {p.nomor_hp_pelanggan}
              </option>
            ))}
          </select>
        </div>

        {/* Pilih Produk */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium">
            Pilih Produk
          </label>
          <select
            id="nama_produk"
            className="block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm bg-[#D4B499]"
            onChange={(e) => handleAddProduct(e.target.value)}
          >
            <option value="" disabled>
              Pilih Produk
            </option>
            {produk.map((p) => (
              <option key={p.id_produk} value={p.id_produk}>
                {p.nama_produk} - Rp {p.harga_produk.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Daftar Produk */}
        {produkList.map((p) => (
          <div key={p.id_produk} className="flex justify-between items-center">
            <span>{p.nama_produk}</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleDecreaseProduct(p.id_produk)}>−</button>
              <span>{p.quantity}</span>
              <button onClick={() => handleAddProduct(p.id_produk)}>+</button>
              <button onClick={() => handleDeleteProduct(p.id_produk)}>🗑</button>
            </div>
          </div>
        ))}

        {/* Submit */}
        <button type="submit" className="bg-[#D4B499] text-white px-4 py-2 rounded-md">
          Simpan Transaksi
        </button>
      </div>
    </form>
  );
}
