'use client';

import { jsPDF } from 'jspdf';
import {
  transaksiField,
} from '../lib/definitions';
interface ExportPDFButtonProps {
  laporanData: Array<transaksiField>; // Menggunakan tipe transaksiField
}

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ laporanData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20; // Posisi awal Y
    const lineSpacing = 10; // Jarak antar baris

    // Tambahkan judul laporan
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Laporan Semua Data Transaksi', 10, yPosition);
    yPosition += lineSpacing;

    // Tambahkan tabel header
    doc.setFontSize(12);
    doc.text('ID Transaksi', 10, yPosition);
    doc.text('Nama Pelanggan', 40, yPosition);
    doc.text('Nama Karyawan', 90, yPosition);
    doc.text('Nama Produk', 130, yPosition);
    doc.text('Jumlah', 170, yPosition);
    yPosition += lineSpacing;

    // Tambahkan garis pemisah
    doc.setDrawColor(0);
    doc.line(10, yPosition - 5, 200, yPosition - 5);

    // Tambahkan data laporan
    doc.setFont('Helvetica', 'normal');
    laporanData.forEach((laporan) => {
      if (yPosition > 270) {
        // Tambahkan halaman baru jika melebihi batas
        doc.addPage();
        yPosition = 20; // Reset posisi Y
      }
      doc.text(laporan.id_transaksi, 10, yPosition);
      doc.text(laporan.nama_pelanggan, 40, yPosition);
      doc.text(laporan.nama_karyawan, 90, yPosition);
      doc.text(laporan.nama_produk, 130, yPosition);
      doc.text(laporan.quantity.toString(), 170, yPosition); // Menampilkan jumlah produk
      yPosition += lineSpacing;
    });

    // Tambahkan footer
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(10);
    doc.text('Generated by Sistem Laporan.', 10, 290);

    // Simpan file PDF
    doc.save('laporan_semua_data.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-amber-800 px-4 py-2 text-white rounded-lg shadow hover:bg-amber-700"
    >
      Export PDF
    </button>
  );
};

export default ExportPDFButton;
