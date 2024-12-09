'use client';

import React, { useState, useEffect } from 'react';
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
  pelanggan?: pelangganField[]; // Pelanggan awal bisa opsional
  my_reward: my_rewardField[];
};

export default function Form({
  transaksi = [],
  karyawan = [],
  produk = [],
  jenjang = [],
  pelanggan: initialPelanggan = [], // Pelanggan awal
  my_reward = [],
}: FormProps) {
  const router = useRouter();
  const [produkList, setProdukList] = useState<{
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
    quantity: number;
  }[]>([]);  const [diskon, setDiskon] = useState<number>(0);
  const [selectedPelanggan, setSelectedPelanggan] = useState<string>('');
  const [pelanggan, setPelanggan] = useState<pelangganField[]>(initialPelanggan); // State untuk data pelanggan
  const [uangDiterima, setUangDiterima] = useState<string>('');
  const [kembalian, setKembalian] = useState<number>(0);

  const totalTransaksi = produkList.reduce(
    (total, produkItem) => total + produkItem.harga_produk * produkItem.quantity,
    0
  );
  const totalSetelahDiskon = totalTransaksi * (1 - diskon / 100);

  // Fetch data pelanggan dari server
  const fetchPelanggan = async () => {
    try {
      const response = await fetch('/api/pelanggan'); // Sesuaikan dengan endpoint API Anda
      const data: pelangganField[] = await response.json();
      setPelanggan(data); // Update state pelanggan
    } catch (error) {
      console.error('Gagal memuat data pelanggan:', error);
    }
  };

  useEffect(() => {
    fetchPelanggan(); // Fetch data pelanggan saat komponen di-render
  }, []);

  const updateDiskon = (id_pelanggan: string) => {
    if (!id_pelanggan) {
      setDiskon(0);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uangDiterimaNum = parseFloat(uangDiterima);
    if (isNaN(uangDiterimaNum) || uangDiterimaNum < totalSetelahDiskon) {
      alert('Uang yang diterima tidak mencukupi.');
      return;
    }

    const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === selectedPelanggan) || {
      id_pelanggan: null,
      nama_pelanggan: null,
      nomor_hp_pelanggan: null,
      poin: 0,
    };

    const pointsToAdd = Math.floor(totalTransaksi / 100);
    const updatedPelangganData = {
      ...selectedPelangganData,
      poin: (selectedPelangganData.poin || 0) + pointsToAdd,
    };

    const formData = new FormData();
    formData.append('id_pelanggan', updatedPelangganData.id_pelanggan || 'null');
    formData.append('nama_pelanggan', updatedPelangganData.nama_pelanggan || 'null');
    formData.append('nomor_hp_pelanggan', updatedPelangganData.nomor_hp_pelanggan || 'null');
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
      {/* Konten form lainnya */}
      <div className="mb-4">
        <label htmlFor="id_pelanggan" className="mb-2 block text-sm font-medium text-gray-700">
          Pilih Pelanggan (Opsional)
        </label>
        <select
          id="id_pelanggan"
          className="block w-full rounded-md border border-gray-300 py-2 pl-10 focus:ring-[#D4B499] focus:border-[#D4B499]"
          value={selectedPelanggan}
          onChange={(e) => {
            const idPelanggan = e.target.value;
            setSelectedPelanggan(idPelanggan);
            updateDiskon(idPelanggan);
          }}
        >
          <option value="">Tidak Ada Pelanggan</option>
          {pelanggan.map((pelangganItem) => (
            <option key={pelangganItem.id_pelanggan} value={pelangganItem.id_pelanggan}>
              {pelangganItem.nama_pelanggan} - {pelangganItem.nomor_hp_pelanggan} - {pelangganItem.poin}
            </option>
          ))}
        </select>
      </div>
      {/* Konten lainnya */}
    </form>
  );
}
