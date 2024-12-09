'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the type for sales data
interface Penjualan {
  month: string;
  total_transaksi: number;
}

interface PenjualanPieChartProps {
  penjualan: Penjualan[];
}

export default function PenjualanPieChart({ penjualan }: PenjualanPieChartProps) {
  // Debug data
  console.log('Data penjualan:', penjualan);

  // Check if sales data exists
  if (!penjualan || penjualan.length === 0) {
    return <div>Tidak ada data penjualan untuk ditampilkan.</div>;
  }

  // List of months from 1 to 12
  const allMonths = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Combine sales data with missing months
  const filledPenjualan = allMonths.map((month) => {
    const data = penjualan.find((item) => item.month === month);
    return {
      month,
      total_transaksi: data?.total_transaksi || 0, // Use 0 if month data is missing
    };
  });

  // Ensure there are no negative values
  const dataValues = filledPenjualan.map((item) => item.total_transaksi);
  if (dataValues.every(value => value >= 0)) {
    // Data for the chart
    const data = {
      labels: filledPenjualan.map((item) => `Bulan ${item.month}`), // Month labels
      datasets: [
        {
          data: dataValues, // Sales data
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ], // Colors for each month
          hoverOffset: 4,
        },
      ],
    };

    // Options for the chart
    const options: ChartOptions<'pie'> = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const value = tooltipItem.raw as number;
              return `Rp ${value.toLocaleString('id-ID')}`; // Format currency
            },
          },
        },
      },
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Distribusi Pendapatan</h2>
        <Pie data={data} options={options} />
      </div>
    );
  } else {
    return <div>Data penjualan tidak valid. Pastikan tidak ada nilai negatif.</div>;
  }
}