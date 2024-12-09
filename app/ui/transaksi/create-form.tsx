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

type FormProps = {
  transaksi: transaksiField[];
  karyawan: karyawanField[];
  produk: produkField[];
  jenjang: jenjangField[];
  pelanggan: pelangganField[];
  my_reward: my_rewardField[];
};

export default function Form({
  transaksi = [],
  karyawan = [],
  produk = [],
  jenjang = [],
  pelanggan = [],
  my_reward = [],
}: FormProps) {
  const router = useRouter();

  const [produkList, setProdukList] = useState<{
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
    quantity: number;
  }[]>([]);
  const [diskon, setDiskon] = useState<number>(0);
  const [selectedPelanggan, setSelectedPelanggan] = useState<string>(''); // Pelanggan wajib
  const [uangDiterima, setUangDiterima] = useState<string>(''); // Simpan input sebagai string
  const [kembalian, setKembalian] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>(''); // Pesan error untuk pelanggan

  const totalTransaksi = produkList.reduce(
    (total, produkItem) => total + produkItem.harga_produk * produkItem.quantity,
    0
  );

  const totalSetelahDiskon = totalTransaksi * (1 - diskon / 100);

  const updateDiskon = (id_pelanggan: string) => {
    if (!id_pelanggan) {
      setDiskon(0); // Jika pelanggan tidak dipilih, diskon 0%
      return;
    }

    const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === id_pelanggan);
    if (!selectedPelangganData) return;

    const poin = selectedPelangganData.poin || 0;

    if (poin >= 100000) {
      setDiskon(20);
    } else if (poin >= 50000) {
      setDiskon(15);
    } else if (poin >= 10000) {
      setDiskon(10);
    } else {
      setDiskon(0);
    }
  };

  const handleUangDiterimaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    setUangDiterima(value); // Tetap simpan sebagai string untuk input form
    if (!isNaN(numericValue) && numericValue >= 0) {
      setKembalian(numericValue - totalSetelahDiskon);
    } else {
      setKembalian(0);
    }
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
    setProdukList((prev) => {
      const updatedList = prev
        .map((produkItem) => {
          if (produkItem.id_produk === id_produk) {
            if (produkItem.quantity === 1) return null;
            return { ...produkItem, quantity: produkItem.quantity - 1 };
          }
          return produkItem;
        })
        .filter((produkItem) => produkItem !== null) as typeof produkList;
      return updatedList;
    });
  };

  const handleDeleteProduct = (id_produk: string) => {
    setProdukList((prev) => prev.filter((produkItem) => produkItem.id_produk !== id_produk));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPelanggan) {
      setErrorMessage('Pelanggan wajib dipilih.');
      return;
    }
    setErrorMessage(''); // Reset pesan error jika validasi lolos

    const uangDiterimaNum = parseFloat(uangDiterima); // Konversi string ke angka
    if (isNaN(uangDiterimaNum) || uangDiterimaNum < totalSetelahDiskon) {
      alert('Uang yang diterima tidak mencukupi.');
      return;
    }

    const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === selectedPelanggan);

    const pointsToAdd = Math.floor(totalTransaksi / 100);
    const updatedPelangganData = {
      ...selectedPelangganData,
      poin: (selectedPelangganData?.poin || 0) + pointsToAdd,
    };

    const formData = new FormData();
    formData.append('id_pelanggan', updatedPelangganData?.id_pelanggan || 'null');
    formData.append('nama_pelanggan', updatedPelangganData?.nama_pelanggan || 'null');
    formData.append('nomor_hp_pelanggan', updatedPelangganData?.nomor_hp_pelanggan || 'null');
    formData.append('total_transaksi', totalSetelahDiskon.toString());
    formData.append('diskon', diskon.toString());
    formData.append('waktu_transaksi', new Date().toISOString());
    formData.append('produkList', JSON.stringify(produkList));

    try {
      await createTransaksi(formData);
      console.log('Transaksi berhasil disimpan.');
      router.push('/dashboard/transaksi');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      router.push('/dashboard/transaksi');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md bg-[#D4B499] p-4 md:p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Tambah Transaksi</h2>

        {/* Pilih Pelanggan */}
        <div className="mb-4">
          <label htmlFor="id_pelanggan" className="mb-2 block text-sm font-medium text-gray-700">
            Pilih Pelanggan (Wajib)
          </label>
          <select
            id="id_pelanggan"
            className={`block w-full rounded-md border py-2 pl-10 ${
              errorMessage ? 'border-red-500' : 'border-gray-300'
            } focus:ring-[#D4B499] focus:border-[#D4B499]`}
            value={selectedPelanggan}
            onChange={(e) => {
              const idPelanggan = e.target.value;
              setSelectedPelanggan(idPelanggan);
              updateDiskon(idPelanggan);
            }}
          >
            <option value="">Pilih Pelanggan</option>
            {pelanggan.map((pelangganItem) => (
              <option key={pelangganItem.id_pelanggan} value={pelangganItem.id_pelanggan}>
                {pelangganItem.nama_pelanggan} - {pelangganItem.nomor_hp_pelanggan} - Poin: {pelangganItem.poin}
              </option>
            ))}
          </select>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>

        {/* Pilih Produk */}
        <div className="mb-4">
          <label htmlFor="id_produk" className="mb-2 block text-sm font-medium text-gray-700">
            Pilih Produk
          </label>
          <select
            id="id_produk"
            className="block w-full rounded-md border border-gray-300 py-2 pl-10 focus:ring-[#D4B499] focus:border-[#D4B499]"
            onChange={(e) => handleAddProduct(e.target.value)}
          >
            <option value="" disabled>
              Pilih Produk
            </option>
            {produk.map((produkItem) => (
              <option key={produkItem.id_produk} value={produkItem.id_produk}>
                {produkItem.nama_produk} - Rp. {produkItem.harga_produk.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <ul>
          {produkList.map((produkItem) => (
            <li key={produkItem.id_produk} className="flex justify-between items-center p-2 bg-gray-100 rounded-md mb-2">
              <span className="font-semibold">{produkItem.nama_produk}</span>
              <span className="text-gray-500">Rp. {produkItem.harga_produk.toLocaleString()}</span>
              <div className="flex items-center space-x-2">
                <Button onClick={() => handleDecreaseProduct(produkItem.id_produk)} className="p-1">
                  <MinusIcon className="w-4 h-4 text-gray-500" />
                </Button>
                <span>{produkItem.quantity}</span>
                <Button onClick={() => handleAddProduct(produkItem.id_produk)} className="p-1">
                  <PlusIcon className="w-4 h-4 text-gray-500" />
                </Button>
                <Button onClick={() => handleDeleteProduct(produkItem.id_produk)} className="p-1">
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <label htmlFor="uangDiterima" className="mb-2 block text-sm font-medium text-gray-700">
            Uang Diterima
          </label>
          <input
            id="uangDiterima"
            type="number"
            min="0"
            className="block w-full rounded-md border border-gray-300 py-2 pl-10 focus:ring-[#D4B499] focus:border-[#D4B499]"
            value={uangDiterima}
            onChange={handleUangDiterimaChange}
          />
        </div>

        <div className="flex justify-between">
          <p>Total Transaksi: Rp. {totalTransaksi.toLocaleString()}</p>
          <p>Diskon: {diskon}%</p>
        </div>
        <div className="flex justify-between">
          <p>Total Setelah Diskon: Rp. {totalSetelahDiskon.toLocaleString()}</p>
          <p>Kembalian: Rp. {kembalian.toLocaleString()}</p>
        </div>

        <Button type="submit" className="bg-[#D4B499] text-white font-semibold">
          Simpan Transaksi
        </Button>
      </div>
    </form>
  );
}
