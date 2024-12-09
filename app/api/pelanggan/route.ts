// import { NextResponse } from 'next/server';
// import { sql } from '@vercel/postgres'; // Gunakan library yang sesuai untuk database Anda

// export async function GET() {
//   try {
//     const result = await sql`SELECT nomor_hp_pelanggan FROM pelanggan;`; // Query database
//     const phoneNumbers = result.rows.map((row) => row.nomor_hp_pelanggan);
//     return NextResponse.json(phoneNumbers);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//   }
// }
