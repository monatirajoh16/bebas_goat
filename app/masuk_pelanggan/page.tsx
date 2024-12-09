'use client';

import React, { useState, useEffect } from 'react';
import { fetchPelangganByNoHp } from '@/app/lib/action';
import { pelangganField } from '@/app/lib/definitions';

export default function CekPelangganPage() {
  const [nomor_hp_pelanggan, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [pelanggan, setPelanggan] = useState<pelangganField | null>(null);
  const [loading, setLoading] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPelanggan(null);
    setAnimatedPoints(0);

    if (!nomor_hp_pelanggan.trim()) {
      setError('Nomor telepon tidak boleh kosong');
      return;
    }

    try {
      setLoading(true);
      const response = await fetchPelangganByNoHp(nomor_hp_pelanggan.trim());

      if (response) {
        setPelanggan(response);
      } else {
        setError('Nomor telepon tidak terdaftar');
      }
    } catch (err) {
      console.error('Error fetching pelanggan data:', err);
      setError('Terjadi kesalahan saat memuat data pelanggan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pelanggan) {
      const duration = 1500;
      const steps = 60;
      const increment = pelanggan.poin / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        current = Math.min(pelanggan.poin, Math.round(increment * step));
        setAnimatedPoints(current);
        step++;

        if (current >= pelanggan.poin) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [pelanggan]);

  const getMembershipStatus = (points: number) => {
    if (points >= 100000) return 'Gold Member';
    if (points >= 50000) return 'Silver Member';
    if (points >= 10000) return 'Bronze Member';
    return 'Regular Member';
  };

  const getMembershipColor = (status: string) => {
    switch (status) {
      case 'Gold Member':
        return 'text-yellow-600';
      case 'Silver Member':
        return 'text-gray-500';
      case 'Bronze Member':
        return 'text-orange-700';
      default:
        return 'text-gray-800';
    }
  };

  const getProgressPercentage = (points: number) => {
    const goldThreshold = 100000;
    return Math.min((points / goldThreshold) * 100, 100);
  };

  const MilestoneMarker = ({ points, label, position }: { points: number, label: string, position: number }) => (
    <div className="absolute -top-3" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
      <div className={`w-3 h-3 rounded-full ${animatedPoints >= points ? 'bg-green-500' : 'bg-gray-300'} mb-1`} />
      <div className="text-xs text-gray-600 whitespace-nowrap">
        <div className="font-medium">{label}</div>
        <div>{points.toLocaleString('id-ID')} Poin</div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg_belikopi.png)' }}>
      <div className="min-h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
        {!pelanggan ? (
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-white text-center mb-8">Cek Data Pelanggan</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-xl space-y-6">
              <div>
                <label htmlFor="nomor_hp_pelanggan" className="block text-gray-700 font-medium mb-2">
                  Nomor Telepon
                </label>
                <input
                  id="nomor_hp_pelanggan"
                  name="nomor_hp_pelanggan"
                  type="text"
                  value={nomor_hp_pelanggan}
                  onChange={handlePhoneNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                  placeholder="Masukkan nomor telepon"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 rounded-md text-white transition duration-300"
                style={{ backgroundColor: '#4A3428' }}
              >
                {loading ? 'Memuat...' : 'Cek Pelanggan'}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-6 text-center" style={{ backgroundColor: '#4A3428' }}>
                <h2 className="text-2xl font-bold text-white mb-2">Profile Member</h2>
                <p className="text-white opacity-80">BeliKopi.co</p>
              </div>
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Nama</p>
                      <p className="text-gray-800 font-medium">{pelanggan.nama_pelanggan}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Nomor Telepon</p>
                      <p className="text-gray-800 font-medium">{pelanggan.nomor_hp_pelanggan}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Status</p>
                      <p className={`font-medium ${getMembershipColor(getMembershipStatus(pelanggan.poin))}`}>
                        {getMembershipStatus(pelanggan.poin)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Member Sejak</p>
                      <p className="text-gray-800 font-medium">
  {isNaN(Date.parse(pelanggan.tanggal_daftar_pelanggan))
    ? "Invalid Date"
    : new Date(pelanggan.tanggal_daftar_pelanggan).toLocaleDateString()}
</p>
                      {/* <p className="text-gray-800 font-medium">Oktober 2023</p> */}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm mb-2">Total Poin</p>
                    <p className="text-4xl font-bold text-gray-800 mb-2">
                      {animatedPoints.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-500">Poin</p>
                  </div>
                </div>
                <div className="mt-12 mb-16 px-4">
                  <div className="relative w-full">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${getProgressPercentage(animatedPoints)}%`,
                          backgroundColor: '#4A3428',
                        }}
                      />
                    </div>
                    <MilestoneMarker points={10000} label="Bronze" position={10} />
                    <MilestoneMarker points={50000} label="Silver" position={50} />
                    <MilestoneMarker points={100000} label="Gold" position={100} />
                    {animatedPoints > 0 && (
                      <div
                        className="absolute -top-8 transition-all duration-1000"
                        style={{
                          left: `${getProgressPercentage(animatedPoints)}%`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <div
                          className="bg-brown-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                          style={{ backgroundColor: '#4A3428' }}
                        >
                          {animatedPoints.toLocaleString('id-ID')} Poin
                        </div>
                        <div
                          className="w-0 h-0 border-l-4 border-r-4 border-t-4 mx-auto"
                          style={{
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderTopColor: '#4A3428',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setPelanggan(null);
                  setPhoneNumber('');
                  setAnimatedPoints(0);
                }}
                className="text-white hover:underline"
              >
                ← Kembali ke Pencarian
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
