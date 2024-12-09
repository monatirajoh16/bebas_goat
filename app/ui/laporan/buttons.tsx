'use client';
import { TampilDetail_transaksi, ExportlDetail_transaksi } from './tes';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import { fetchtanggaltransaksi } from "@/app/lib/action";
import { transaksiField } from "@/app/lib/definitions";

export function ReportFilterUI() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState<string>(""); 
  const [filteredData, setFilteredData] = useState<transaksiField[]>([]);
  const [totalPendapatan, setTotalPendapatan] = useState<number>(0);

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("Pilih tanggal awal dan akhir sebelum mencari!");
      return;
    }

    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    try {
      const data = await fetchtanggaltransaksi({
        startDate: startDateString,
        endDate: endDateString,
      });

      const filteredBySearchText = data.filter((item) =>
        item.nama_pelanggan.toLowerCase().includes(searchText.toLowerCase())
      );

      if (filteredBySearchText.length === 0) {
        alert("Tidak ada data ditemukan untuk kriteria pencarian.");
      }

      setFilteredData(filteredBySearchText);

      const total = filteredBySearchText.reduce((sum, item) =>
        sum + parseFloat(item.total_transaksi.toString().replace(/[^0-9.-]+/g, "")), 0
      );
      setTotalPendapatan(total);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
      alert("Terjadi kesalahan saat mengambil data.");
    }
  };

  const handlePrintPDF = () => {
    if (filteredData.length === 0) {
        alert("Tidak ada data untuk dicetak!");
        return;
    }

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Laporan Transaksi Penjualan", 14, 10);

    // Tambahkan periode dan total pendapatan
    doc.setFontSize(12);
    doc.text(`Periode: ${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`, 14, 20);
    doc.text(`Total Pendapatan: Rp ${totalPendapatan.toLocaleString()}`, 14, 30);

    // Definisi header tabel
    const headers = ["ID Transaksi", "Tanggal Transaksi", "Nama Pelanggan", "Total Transaksi"];
    const columnWidths = [50, 40, 60, 40]; // Lebar kolom
    const startX = 14; // Posisi awal tabel
    let startY = 40; // Posisi awal baris

    // Render header tabel
    headers.forEach((header, index) => {
        doc.text(header, startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), startY);
    });

    // Render isi tabel
    startY += 8; // Tambahkan jarak untuk baris berikutnya
    filteredData.forEach((item) => {
        const row = [
            item.id_transaksi,
            new Date(item.waktu_transaksi).toLocaleDateString(),
            item.nama_pelanggan,
            `Rp ${parseFloat(item.total_transaksi.toString().replace(/[^0-9.-]+/g, "")).toLocaleString()}`
        ];

        row.forEach((cell, index) => {
            doc.text(
                cell,
                startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
                startY
            );
        });

        startY += 8; // Tambahkan jarak untuk baris berikutnya
    });

    // Simpan file PDF
    doc.save("laporan_transaksi.pdf");
};


  return (
    <div className="w-full px-4">
      <div className="flex flex-col items-center gap-4 p-4 md:flex-row justify-center">
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            placeholderText="Start Date "
            className="px-4 py-2 rounded-md border"
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            placeholderText="End Date"
            className="px-4 py-2 rounded-md border"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Cari Nama Pelanggan..."
          className="w-full max-w-md px-4 py-2 rounded-md border"
        />
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-amber-950"
        >
          Cari
        </button>
        <button
          onClick={handlePrintPDF}
          className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-amber-950"
        >
          Cetak PDF
        </button>
      </div>

      <div className="mt-4 text-center">
        {filteredData.length > 0 && (
          <p className="font-bold text-lg text-white">
            Total Pendapatan: Rp {totalPendapatan.toLocaleString()}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full bg-white border border-gray-300 text-gray-900" style={{ tableLayout: "fixed" }}>
    <thead className="bg-gradient-to-b from-red-800 to-amber-950 text-white">
        <tr>
            <th className="border border-red-950 px-4 py-3 font-medium text-center" style={{ width: "20%" }}>ID Transaksi</th>
            <th className="border border-red-950 px-4 py-3 font-medium text-center" style={{ width: "20%" }}>Tanggal</th>
            <th className="border border-red-950 px-4 py-3 font-medium text-center" style={{ width: "30%" }}>Nama Pelanggan</th>
            <th className="border border-red-950 px-4 py-3 font-medium text-center" style={{ width: "20%" }}>Total Transaksi</th>
            <th className="border border-red-950 px-4 py-3 font-medium text-center" style={{ width: "10%" }}>Aksi</th>
        </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-[#F8EDE2]">
        {filteredData.map((item, index) => (
            <tr
                key={item.id_transaksi}
                className={`group transition-transform transform hover:scale-105 ${index % 2 === 0 ? 'bg-[#D8BAA2]' : 'bg-[#F0D6C1]'} hover:bg-[#4A3622] hover:text-white`}
            >
                <td className="border border-gray-300 px-4 py-3 text-sm text-center" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.id_transaksi}</td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-center">{new Date(item.waktu_transaksi).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-center" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.nama_pelanggan}</td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-center">Rp {parseFloat(item.total_transaksi.toString().replace(/[^0-9.-]+/g, "")).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                    <div className="flex justify-center items-center gap-3">
                        <TampilDetail_transaksi id={item.id_transaksi} />
                        <ExportlDetail_transaksi id={item.id_transaksi} />
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
        {filteredData.length === 0 && (
          <p className="mt-4 text-center text-white">
            Lakukan pencarian untuk memunculkan data.
          </p>
        )}
      </div>
    </div>
  );
}
