'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function PenjualanChart({ penjualan }: { penjualan: any[] }) {
  // Debug data
  console.log('Data penjualan:', penjualan);

  // Pastikan data tersedia
  if (!penjualan || penjualan.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Grafik Pendapatan</h2>
        <p>Data penjualan tidak tersedia.</p>
      </div>
    );
  }

  // Data untuk chart
  const data = {
    labels: penjualan.map((item, index) => item.month || `Bulan ${index + 1}`),
    datasets: [
      {
        label: 'Pendapatan (IDR)',
        data: penjualan.map((item) => item.total_transaksi || 0), // Data (pendapatan total)
        backgroundColor: '#36A2EB',
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 4, // Rounded corners for bars
      },
    ],
  };

  // Opsi untuk chart
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grafik Pendapatan per Bulan',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hilangkan grid pada sumbu X
        },
        title: {
          display: true,
          text: 'Bulan',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E0E0E0', // Warna grid
        },
        ticks: {
          callback: (value) =>
            `Rp ${value.toLocaleString('id-ID')}`, // Format angka
        },
        title: {
          display: true,
          text: 'Pendapatan (IDR)',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Grafik Pendapatan</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
