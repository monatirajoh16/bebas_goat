'use client';

import { karyawanField, produkField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React from 'react';
import { updateProduk } from '@/app/lib/action';
import { CurrencyDollarIcon, UserCircleIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline';


export default function EditProdukForm({
    produk,
    uniqueCategories,
    karyawan
}: {
    produk: produkField, // Now expects a single object
    uniqueCategories: string[],
    karyawan: karyawanField[]
}) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const response = await updateProduk(produk.id_produk, formData);
            if (response?.message) {
                alert('berhasil update'); // Handle success message as needed
            }
        } catch (error) {
            console.error('Failed to update produk:', error);
            alert('An error occurred while updating the produk.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

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
                            defaultValue={produk.nama_produk}
                            placeholder="Enter Nama Produk"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                            defaultValue={produk.harga_produk}
                            placeholder="Enter Harga Produk"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                        defaultValue={produk.kategori_produk}
                    >
                        <option value="" disabled>
                            Select a Kategori
                        </option>
                        <option value="makanan">Makanan</option>
                        <option value="minuman">Minuman</option>
                    </select>
                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>


               
                {/* Harga Produk */}
                <div className="mb-4">
                    <label htmlFor="harga_produk" className="mb-2 block text-sm font-medium">
                        gambar Produk
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="gambar"
                            name="gambar"
                            type="dtring"
                            defaultValue={produk.gambar}
                            placeholder="Enter Harga Produk"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>

                {/* <div className="mb-4">
                    <label htmlFor="file" className="mb-2 block text-sm font-medium">
                        Upload Image
                    </label>
                    <div>
                        <div className="flex items-center border border-gray-200 rounded-md px-3 py-1">
                            <InboxArrowDownIcon className="h-5 w-03 mr-2 text-gray-500" />
                            <input
                                name="image"
                                type="file"
                                accept='image/*'
                                className="peer block w-full font-small  "
                            />
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/produk"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    );
}

