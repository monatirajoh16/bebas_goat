'use client';

import { produkField } from '../../lib/definitions';
import Link from 'next/link';
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/button';
import { createProduk } from '@/app/lib/action';
import React, { useState, useEffect } from 'react';

export default function Form({ produk = [] }: { produk: produkField[] }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(""); // Tambahkan state untuk gambar yang dipilih
  const [imageOptions, setImageOptions] = useState<string[]>([]); // Tambahkan state untuk daftar gambar

  // Fetch daftar gambar dari server
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/get-images'); // Endpoint API untuk mendapatkan daftar gambar
        const data = await response.json();
        setImageOptions(data); // Set daftar gambar ke state
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    }
    fetchImages();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const namaProduk = formData.get('nama_produk')?.toString().trim();
    const hargaProduk = formData.get('harga_produk');
    const kategoriProduk = formData.get('kategori_produk');
    const gambar = formData.get('gambar');

    if (!namaProduk || !hargaProduk || !kategoriProduk || !gambar) {
      setError('Data Belum Diisi.');
      return;
    }

    const isDuplicate = produk.some((item) => item.nama_produk.toLowerCase() === namaProduk.toLowerCase());
    if (isDuplicate) {
      setError('Data Sudah Ada.');
      return;
    }

    setError(null);

    try {
      const response = await createProduk(formData);
      setSuccess('Produk berhasil dibuat!');
      console.log('Response:', response);
    } catch (err) {
      console.error(err);
      setError('Gagal membuat produk.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mb-4 text-sm text-green-600">{success}</p>}

        {/* Nama Produk */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium">
            Nama Produk
          </label>
          <div className="relative">
            <input
              id="nama_produk"
              name="nama_produk"
              type="text"
              placeholder="Enter Nama Produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Harga Produk */}
        <div className="mb-4">
          <label htmlFor="harga_produk" className="mb-2 block text-sm font-medium">
            Harga Produk
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="harga_produk"
              name="harga_produk"
              type="number"
              placeholder="Enter Harga Produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Kategori Produk */}
        <label htmlFor="kategori_produk" className="mb-2 block text-sm font-medium">
          Kategori Produk
        </label>
        <div className="relative">
          <select
            id="kategori_produk"
            name="kategori_produk"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a Kategori
            </option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        {/* Pilih Gambar */}
        <div className="mb-4">
          <label htmlFor="gambar" className="block text-sm font-medium">
            Pilih Gambar
          </label>
          <select
            id="gambar"
            name="gambar"
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          >
            <option value="">Pilih Gambar</option>
            {imageOptions.map((image) => (
              <option key={image} value={`/images/${image}`}>
                {image}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/produk"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          className="bg-gradient-to-b from-gray-800 to-red-900 transition-colors hover:from-red-700 hover:to-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create Produk
        </Button>
      </div>
    </form>
  );
}
