'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { db } from "@/app/lib/db"; // Contoh: Database connection
import { pelangganField, transaksiField } from '@/app/lib/definitions';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  nohp: z.string(),
});

const FormSchemaPro = z.object({
  id_produk: z.string().optional(),
  nama_produk: z.string(),
  harga_produk: z.string(),
  kategori_produk: z.string(),
  gambar: z.string(),
});

const FormSchemaKar = z.object({
  id_karyawan: z.string(),
  nama_karyawan: z.string(),
  nomor_hp_karyawan: z.string(),
  bank_karyawan: z.string(),
  nomor_rekening_karyawan: z.string(),
  alamat_karyawan: z.string(),
  kata_sandi_karyawan: z.string(),
  username_karyawan: z.string(),
  role_karyawan: z.string(),
});

const FormSchemaP = z.object({
  id_bahan: z.string(),
  nama_bahan: z.string().nonempty(),
  kategori_bahan: z.string().nonempty(),
  stok_bahan: z.number().min(0), // Ensure this is a number
});


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


export async function deletePelanggan(id: string) {
  await sql`DELETE FROM pelanggan WHERE id_pelanggan = ${id}`;
  revalidatePath('/dashboard/pelanggan');
}



// export async function deleteBahan(id_bahan: string) {
//   await sql`DELETE FROM bahan WHERE id_bahan = ${id_bahan}`;
//   revalidatePath('/dashboard/bahan');
// }
// export async function deleteBahan(id_bahan: string) {
//   try {
//     await sql`DELETE FROM bahan WHERE id_bahan = ${id_bahan}`;
//     revalidatePath('/dashboard/bahan');
// return {message: 'Bahan Deleted'};
//   } catch (error) {
//     // console.error('Database Error: Failed to delete bahan', error);
//     // throw new Error('Database Error: Failed to delete bahan');
//     return {message: 'Database Error: Failed to Delete Bahan'};

//   }
// }


export async function deleteBahan(id: string) {
  await sql`DELETE FROM bahan WHERE id_bahan = ${id}`;
  revalidatePath('/dashboard/bahan');
  return { message: 'Deleted bahan.' };
}

export async function deleteKaryawan(id: string) {
  await sql`DELETE FROM karyawan WHERE id_karyawan= ${id}`;
  revalidatePath('/dashboard/karyawan');
  return { message: 'Deleted karyawan.' };
}

export async function deleteProduk(id: string) {
  await sql`DELETE FROM produk WHERE id_produk = ${id}`;
  revalidatePath('/dashboard/produk');
}

export async function deleteTransaksi(id: string) {
  await sql`DELETE FROM transaksi WHERE id_transaksi = ${id}`;
  revalidatePath('/dashboard/transaksi');
}

export async function deleteMy_reward(id: string) {
  await sql`DELETE FROM myreward WHERE id_pelanggan = ${id}`;
  revalidatePath('/dashboard/my_reward');
}



// import { v4 as uuidvv4 } from 'uuid'; // Import UUID generator

// const CreatePelanggan = FormSchemaPel.omit({ id_pelanggan: true });

// export async function createPelanggan(formData: FormData) {
//   const id_pelanggan = uuidvv4(); // Generate a new UUID for id_pelanggan
//   const id_jenjang = formData.get('id_karyawan')?.toString() || ""; // Retrieve id_karyawan from form data
//   const nama_pelanggan = formData.get('nama_bahan')?.toString() || "";
//   const nomor_hp_pelanggan = formData.get('kategori_bahan')?.toString() || "";
//   const tanggal_daftar_pelanggan = formData.get('stok_bahan')?.toString() || "";

//   // Validate that id_karyawan is provided
//   if (!id_jenjang) {
//     throw new Error("Kolom 'id_karyawan' tidak boleh kosong.");
//   }

//   const parsedData = {
//     id_pelanggan,
//     id_jenjang,
//     nama_pelanggan,
//     nomor_hp_pelanggan,
//     tanggal_daftar_pelanggan,
//   };

//   await sql`
//     INSERT INTO pelanggan (id_pelanggan, id_karyawan, nama_bahan, kategori_bahan, stok_bahan)
//     VALUES (${parsedData.id_pelanggan}, ${parsedData.id_jenjang}, ${parsedData.nama_pelanggan}, ${parsedData.nomor_hp_pelanggan}, ${parsedData.tanggal_daftar_pelanggan})
//   `;
  
//   revalidatePath('/dashboard/pelanggan');
//   redirect('/dashboard/pelanggan');
// }


import { v4 as uuidvo4 } from 'uuid'; // Import UUID generator

const CreateKaryawan = FormSchemaKar.omit({ id_karyawan: true });


export async function createKaryawan(formData: FormData) {
  const id_karyawan = uuidvo4(); // Generate a new UUID for id_karyawan
  const nama_karyawan = formData.get('nama_karyawan')?.toString() || ""; // Retrieve id_karyawan from form data
  const nomor_hp_karyawan = formData.get('nomor_hp_karyawan')?.toString() || ""; // Retrieve id_karyawan from form data
  const bank_karyawan = formData.get('bank_karyawan')?.toString() || "";
  const nomor_rekening_karyawan = formData.get('nomor_rekening_karyawan')?.toString() || "";
  const alamat_karyawan = formData.get('alamat_karyawan')?.toString() || "";
  const kata_sandi_karyawan = formData.get('kata_sandi_karyawan')?.toString() || "";
  const username_karyawan = formData.get('username_karyawan')?.toString() || "";
  const role_karyawan = formData.get('role_karyawan')?.toString() || "";


  const parsedData = {
    id_karyawan,
    nama_karyawan,
    nomor_hp_karyawan,
    bank_karyawan,
    nomor_rekening_karyawan,
    alamat_karyawan,
    kata_sandi_karyawan,
    username_karyawan,
    role_karyawan,
  };

  await sql`
    INSERT INTO karyawan (id_karyawan, nama_karyawan, nomor_hp_karyawan, bank_karyawan, nomor_rekening_karyawan, alamat_karyawan, kata_sandi_karyawan,username_karyawan,role_karyawan )
    VALUES (
    ${parsedData.id_karyawan}, 
    ${parsedData.nama_karyawan}, 
    ${parsedData.nomor_hp_karyawan},
    ${parsedData.bank_karyawan}, 
    ${parsedData.nomor_rekening_karyawan},
    ${parsedData.alamat_karyawan},
    ${parsedData.kata_sandi_karyawan},
    ${parsedData.username_karyawan},
    ${parsedData.role_karyawan}
    )
  `;
  
  revalidatePath('/dashboard/karyawan');
  redirect('/dashboard/karyawan');
}

// const FormSchemaPro = z.object({
//   id_produk: z.string().optional(),
//   nama_produk: z.string(),
//   harga_produk: z.string(),
//   kategori_produk: z.string(),

//   stokgambar_bahan: z.string(),
// });

import { v4 as uuidvv4 } from 'uuid'; // Import UUID generator




import fs from 'fs';
import path from 'path';
// import { revalidatePath, redirect } from 'next/navigation'; // Pastikan Anda mengimpor fungsi ini dari Next.js



// API untuk mengambil daftar gambar
export function getAvailableImages() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  try {
    // Ambil daftar file dari folder "public/images"
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter((file) =>
      /\.(png|jpg|jpeg|gif|webp)$/.test(file)
    ); // Filter file gambar
    return imageFiles;
  } catch (error) {
    console.error("Unable to fetch images:", error);
    return [];
  }
}

// Fungsi untuk membuat produk
export async function createProduk(formData: FormData) {
  const id_produk = uuidv4(); // Generate a new UUID untuk ID produk
  const nama_produk = formData.get("nama_produk")?.toString() || "";
  const harga_produk = formData.get("harga_produk")?.toString() || "";
  const kategori_produk = formData.get("kategori_produk")?.toString() || "";
  const gambar = formData.get("gambar")?.toString() || ""; // Mengambil gambar sebagai string

  // Validasi input
  if (!nama_produk || !harga_produk || !kategori_produk || !gambar) {
    throw new Error("Semua data harus diisi");
  }

  // Cek apakah gambar yang dipilih ada di folder images
  const availableImages = getAvailableImages();
  if (!availableImages.includes(path.basename(gambar))) {
    throw new Error("Gambar yang dipilih tidak valid");
  }

  // Persiapkan data untuk dimasukkan ke database
  const parsedData = {
    id_produk,
    nama_produk,
    harga_produk,
    kategori_produk,
    gambar, // Simpan string gambar langsung ke database
  };

  // Masukkan data ke tabel produk
  await sql`
    INSERT INTO produk (id_produk, nama_produk, harga_produk, kategori_produk, gambar)
    VALUES (${parsedData.id_produk}, ${parsedData.nama_produk}, ${parsedData.harga_produk}, ${parsedData.kategori_produk}, ${parsedData.gambar})
  `;

  // Revalidate dan redirect setelah sukses
  revalidatePath("/dashboard/produk");
  redirect("/dashboard/produk");
}





// Function to handle image upload (e.g., upload to cloud storage)
async function uploadImageToStorage(file: File): Promise<string> {
  // Example: You can upload to cloud storage like AWS S3, Cloudinary, etc.
  // Here we will simulate the upload process and return a mock URL.
  
  const formData = new FormData();
  formData.append('file', file);

  const uploadResponse = await fetch('/upload-image-endpoint', {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Image upload failed');
  }

  const data = await uploadResponse.json();
  return data.imageUrl; // Assuming the response contains an image URL
}


// import { v4 as uuidv4 } from 'uuid';
// import { z } from 'zod';
// import { sql } from './database'; // Pastikan ini mengarah ke file yang benar untuk query SQL

// Definisi schema validasi untuk form transaksi
const FormSchemaTra = z.object({
  id_transaksi: z.string().optional(),
  id_karyawan: z.string().optional(),
  nama_pelanggan: z.string().optional(),
  nomor_hp_pelanggan: z.string(),
  diskon: z.number(),
  produkList: z.array(
    z.object({
      id_produk: z.string(),
      nama_produk: z.string(),
      harga_produk: z.number(),
      quantity: z.number(),
    })
  ),
  total_transaksi: z.number(),
  waktu_transaksi: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Expected YYYY-MM-DD.",
    }),
});

// Fungsi untuk membuat transaksi baru
export async function createTransaksi(formData: FormData) {
  const id_transaksi = uuidv4();
  const total_transaksi = parseFloat(formData.get("total_transaksi")?.toString() || "0");
  let id_karyawan = formData.get("id_karyawan")?.toString() || null;
  const waktu_transaksi = new Date().toISOString();

  if (!id_karyawan) {
    id_karyawan = uuidv4();
  }

  try {
    // Parse the product list from the form data
    const produkList = JSON.parse(formData.get("produkList")?.toString() || "[]").map((produk: any) => ({
      ...produk,
      harga_produk: parseFloat(produk.harga_produk),
    }));

    // Validate form data against the schema
    const parsedData = FormSchemaTra.parse({
      id_transaksi,
      total_transaksi,
      waktu_transaksi,
      id_karyawan,
      nama_pelanggan: formData.get("nama_pelanggan")?.toString(),
      nomor_hp_pelanggan: formData.get("nomor_hp_pelanggan")?.toString(),
      diskon: Number(formData.get("diskon")),
      produkList: produkList,
    });

    // Check if the customer exists, otherwise create a new one
    const pelangganQueryResult = await sql`
      SELECT id_pelanggan
      FROM pelanggan
      WHERE nomor_hp_pelanggan = ${parsedData.nomor_hp_pelanggan}
      LIMIT 1;
    `;

    let id_pelanggan;

    if (pelangganQueryResult.rows.length > 0) {
      // Pelanggan sudah ada
      id_pelanggan = pelangganQueryResult.rows[0].id_pelanggan;

      // Tambahkan poin ke myreward
      await sql`
        UPDATE myreward
        SET poin = poin + (${total_transaksi} / 100)
        WHERE id_pelanggan = ${id_pelanggan};
      `;
    } else {
      // Pelanggan baru
      id_pelanggan = uuidv4();
      await sql`
        INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, nomor_hp_pelanggan)
        VALUES (${id_pelanggan}, ${parsedData.nama_pelanggan}, ${parsedData.nomor_hp_pelanggan});
      `;

      // Buat entri baru di myreward
      await sql`
        INSERT INTO myreward (id_pelanggan, poin)
        VALUES (${id_pelanggan}, ${total_transaksi});
      `;
    }

    // Insert the transaction into the database
    await sql`
      INSERT INTO transaksi 
      (id_transaksi, id_karyawan, id_pelanggan, total_transaksi, waktu_transaksi)
      VALUES 
      (${id_transaksi}, ${id_karyawan}, ${id_pelanggan}, ${total_transaksi}, ${waktu_transaksi});
    `;

    // Insert the products into the transaction
    for (const produk of parsedData.produkList) {
      await sql`
        INSERT INTO transaksi_produk
        (id_produk, nama_produk, harga_produk, quantity)
        VALUES
        (${produk.id_produk}, ${produk.nama_produk}, ${produk.harga_produk}, ${produk.quantity});
      `;
    }

    return {
      id_karyawan,
      id_pelanggan,
      total_transaksi,
      waktu_transaksi,
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Failed to create transaction.");
  }
}











// const FormSchematrans = z.object({
//   id_transaksi: z.string(),
//   id_karyawan: z.string().optional(),
//   id_pelanggan: z.string(),
//   total_transaksi: z.number(),
//   waktu_transaksi: z.string(),
//   nama_pelanggan: z.string(),
//   nomor_hp_pelanggan: z.string(),
//   nama_karyawan: z.string(),
//   nama_produk: z.string(),
//   quantity: z.number(),
//   harga_produk: z.number(),
//   id_jenjang: z.string(),
//   nama_jenjang: z.string(),
//   diskon: z.number(),
//   batas_pemakaian: z.number(),
// });

// import { v4 as uuidv48 } from 'uuid'; // Import UUID generator

// const CreateTransaksi = FormSchematrans.omit({ id_transaksi: true });

// export async function createTransaksi(formData: FormData) {
//   const id_transaksi = uuidv48(); // Generate a new UUID for id_bahan
//   const id_karyawan = uuidv48();
//   const id_pelanggan = formData.get('id_pelanggan')?.toString() || "";
//   const total_transaksi = formData.get('total_transaksi')?.toString() || "";
//   const waktu_transaksi = formData.get('waktu_transaksi')?.toString() || "";
//   const nama_pelanggan = formData.get('nama_pelanggan')?.toString() || "";
//   const nomor_hp_pelanggan = formData.get('nomor_hp_pelanggan')?.toString() || "";
//   const nama_karyawan = formData.get('nama_karyawan')?.toString() || "";
//   const nama_produk = formData.get('nama_produk')?.toString() || "";
//   const quantity = formData.get('quantity')?.toString() || "";
//   const harga_produk = formData.get('harga_produk')?.toString() || "";
//   const id_jenjang = formData.get('nomor_hp_pelanggan')?.toString() || "";
//   const nama_jenjang = formData.get('nama_jenjang')?.toString() || "";
//   const diskon = formData.get('diskon')?.toString() || "";
//   const batas_pemakaian = formData.get('batas_pemakaian')?.toString() || "";
//   // Validate that id_karyawan is provided
//   if (!id_karyawan) {
//     throw new Error("Kolom 'id_karyawan' tidak boleh kosong.");
//   }

//   const parsedData = {
//     id_transaksi,       // ID transaksi
//     id_karyawan ,        // ID karyawan yang menangani transaksi
//     id_pelanggan,       // ID pelanggan yang melakukan transaksi
//     total_transaksi, 
//     waktu_transaksi,     // Total biaya transaksi
//                // Poin pelanggan (jika ada)
//     nama_pelanggan,     // Nama pelanggan
//     nomor_hp_pelanggan,    // Nomor HP pelanggan
//     nama_karyawan,        // Nama karyawan yang menangani transaksi
//     nama_produk,          // Nama produk yang dibeli
//     quantity,          // Jumlah produk yang dibeli
//     harga_produk,        // Harga per unit produk
//     id_jenjang,          // ID jenjang diskon (jika ada)
//     nama_jenjang,       // Nama jenjang diskon (jika ada)
//     diskon,            // Diskon yang diterapkan pada transaksi
//     batas_pemakaian
//   };

//   await sql`
//     INSERT INTO transaksi (id_transaksi, id_karyawan, id_pelanggan, total_transaksi, waktu_transaksi,nama_pelanggan,nomor_hp_pelanggan,nama_karyawan,nama_produk,quantity,harga_produk,id_jenjang,nama_jenjang,diskon,batas_pemakaian)
//     VALUES (${parsedData.id_transaksi}, ${parsedData.id_karyawan}, ${parsedData.id_pelanggan}, ${parsedData.total_transaksi}, ${parsedData.waktu_transaksi}, 
//     ${parsedData.nama_pelanggan}, ${parsedData.nomor_hp_pelanggan}, ${parsedData.nama_karyawan}, ${parsedData.nama_produk}, ${parsedData.quantity},
//     ${parsedData.harga_produk},${parsedData.id_jenjang},${parsedData.nama_jenjang},${parsedData.diskon},${parsedData.batas_pemakaian})
//   `;
  
//   revalidatePath('/dashboard/transaksi');
//   redirect('/dashboard/transaksi');
// }


//   await sql`
//     INSERT INTO transaksi (id_transaksi, id_karyawan, id_pelanggan, total_transaksi, waktu_transaksi,nama_pelanggan, id_detail_transaksi, id_produk, jumlah_transaksi, nama_produk, harga_produk, nomor_hp_pelanggan)
//     VALUES (${parsedData.id_transaksi}, ${parsedData.id_karyawan}, ${parsedData.id_pelanggan}, ${parsedData.total_transaksi}, ${parsedData.waktu_transaksi}, ${parsedData.nama_pelanggan}, ${parsedData.id_detail_transaksi}, ${parsedData.id_produk}, ${parsedData.jumlah_transaksi}, ${parsedData.nama_produk}, ${parsedData.harga_produk}, ${parsedData.nomor_hp_pelanggan})
//   `;

//   // Mengabaikan tipe error sementara jika revalidatePath tidak kompatibel
//   revalidatePath('/dashboard/transaksi'); // Pastikan tipe path sesuai dengan tipe yang diharapkan
//   redirect('/dashboard/transaksi');
// }



const FormSchemaPela = z.object({
  id_pelanggan: z.string().optional(),
  id_jenjang: z.string().optional(),
  nama_pelanggan: z.string(),
  nomor_hp_pelanggan: z.string(),
  tanggal_daftar_pelanggan: z.string(),
  poin: z.number(),
  
});



import { v4 as uuidv54 } from 'uuid'; // Import UUID generator

// const CreatePelanggan = FormSchemaPela.omit({ id_pelanggan: true });

// export async function createPelanggan(formData: FormData) {
//   const id_pelanggan = uuidv54(); // Generate a new UUID for id_produk
//   // const id_jenjang =   uuidv54();
//   const id_jenjang =   formData.get('id_jenjang')?.toString() || "";
//   const nama_pelanggan = formData.get('nama_pelanggan')?.toString() || "";
//   const nomor_hp_pelanggan = formData.get('nomor_hp_pelanggan')?.toString() || "";
//   const tanggal_daftar_pelanggan = formData.get('tanggal_daftar_pelanggan')?.toString() || "";


//   const parsedData = {
//     id_pelanggan,
//     id_jenjang,
//     nama_pelanggan,
//     nomor_hp_pelanggan,
//     tanggal_daftar_pelanggan,
//   };

//   await sql`
//     INSERT INTO pelanggan (id_pelanggan, id_jenjang, nama_pelanggan, nomor_hp_pelanggan, tanggal_daftar_pelanggan)
//     VALUES (${parsedData.id_pelanggan}, ${parsedData.id_jenjang}, ${parsedData.nama_pelanggan}, ${parsedData.nomor_hp_pelanggan}, ${parsedData.tanggal_daftar_pelanggan})
//   `;
  
//   revalidatePath('/dashboard/pelanggan');
//   redirect('/dashboard/pelanggan');
// }




import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const CreateBahan = FormSchemaP.omit({ id_bahan: true });

export async function createBahan(formData: FormData) {
  const id_bahan = uuidv4(); // Generate a new UUID for id_bahan
  const id_karyawan = formData.get('id_karyawan')?.toString() || null; // Retrieve id_karyawan from form data, allow null
  const nama_bahan = formData.get('nama_bahan')?.toString() || "";
  const kategori_bahan = formData.get('kategori_bahan')?.toString() || "";
  const stok_bahan = formData.get('stok_bahan')?.toString() || "";

  // Validate that nama_bahan and other required fields are provided
  if (!nama_bahan || !kategori_bahan || !stok_bahan) {
    throw new Error("Semua kolom harus diisi kecuali Karyawan.");
  }

  const parsedData = {
    id_bahan,
    id_karyawan,
    nama_bahan,
    kategori_bahan,
    stok_bahan,
  };

  await sql`
    INSERT INTO bahan (id_bahan, id_karyawan, nama_bahan, kategori_bahan, stok_bahan)
    VALUES (${parsedData.id_bahan}, ${parsedData.id_karyawan}, ${parsedData.nama_bahan}, ${parsedData.kategori_bahan}, ${parsedData.stok_bahan})
  `;
  
  revalidatePath('/dashboard/bahan');
  redirect('/dashboard/bahan ');
}





// const UpdateBahan = FormSchemaP.omit({ id_bahan: true });

// export async function updateBahan(id: string, formData: FormData) {
//   const { id_bahan, id_karyawan, nama_bahan, kategori_bahan, stok_bahan} = UpdateBahan.parse({
//     id_bahan: formData.get('id_bahan'),
//     id_karyawan: formData.get('id_karyawan'),
//     nama_bahan: formData.get('nama_bahan'),
//     kategori_bahan: formData.get('kategori_bahan'),
//     stok_bahan: formData.get('stok_bahan'),

//   });


//   try {
//     await sql`
//     UPDATE bahan
//     SET id_bahan = ${id_bahan}, id_karyawan = ${id_karyawan}, nama_bahan = ${nama_bahan}, kategori_bahan = ${kategori_bahan}, stok_bahan = ${stok_bahan}
//     WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update bahan.' };
//   }


//   revalidatePath('/dashboard/bahan');
//   redirect('/dashboard/bahan');
// }

const UpdateBahan = FormSchemaP.omit({ id_bahan: true });

export async function updateBahan(id: string, formData: FormData) {
  const stokBahanString = formData.get('stok_bahan');
  const stok_bahan = stokBahanString ? Number(stokBahanString) : null;

  const { 
    nama_bahan, 
    kategori_bahan 
  } = UpdateBahan.parse({
    nama_bahan: formData.get('nama_bahan'),
    kategori_bahan: formData.get('kategori_bahan'),
    stok_bahan, 
  });

  console.log('Updating bahan with values:', {
    nama_bahan,
    kategori_bahan,
    stok_bahan,
  });

  try {
    const result = await sql`
      UPDATE bahan
      SET 
        nama_bahan = ${nama_bahan}, 
        kategori_bahan = ${kategori_bahan}, 
        stok_bahan = ${stok_bahan}
      WHERE id_bahan = ${id}
    `;

    console.log('Rows affected:', result.rowCount); // Log the number of affected rows
    if (result.rowCount === 0) {
      return { message: 'No rows updated. Check if the ID is correct.' };
    }
  } catch (error) {
    console.error('Database update error:', error);
    return { message: 'Database Error: Gagal memperbarui bahan.' };
  }

  revalidatePath('/dashboard/bahan');
  redirect('/dashboard/bahan');
}


import { ZodError } from 'zod';

const FormSchemaPelang = z.object({
  id_pelanggan: z.string().optional(),
  id_jenjang: z.string().optional(),
  nama_pelanggan: z.string(),
  nomor_hp_pelanggan: z.string(),
  tanggal_daftar_pelanggan: z.string(),
});
const UpdatePelanggan = FormSchemaPelang.omit({ id_pelanggan: true });

export async function updatePelanggan(id: string, formData: FormData) {
  const data = {
    nama_pelanggan: formData.get('nama_pelanggan') || '',
    nomor_hp_pelanggan: formData.get('nomor_hp_pelanggan') || '',
    tanggal_daftar_pelanggan: formData.get('tanggal_daftar_pelanggan')
      ? new Date(formData.get('tanggal_daftar_pelanggan') as string).toISOString()
      : new Date().toISOString(),
  };

  try {
    const parsedData = UpdatePelanggan.parse(data); // Zod schema validation

    // Update only the necessary fields in the pelanggan table
    await sql`
      UPDATE pelanggan
      SET 
          nama_pelanggan = ${parsedData.nama_pelanggan},
          nomor_hp_pelanggan = ${parsedData.nomor_hp_pelanggan},
          tanggal_daftar_pelanggan = ${parsedData.tanggal_daftar_pelanggan}
      WHERE id_pelanggan = ${id};
    `;

    // Revalidate and redirect after successful update
    revalidatePath('/dashboard/pelanggan');
    redirect('/dashboard/pelanggan');
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      return { message: 'Validation Error: Data input tidak valid.' };
    } else {
      console.error('Database update error:', error);
      return { message: 'Database Error: Gagal meng-update pelanggan.' };
    }
  }
}



const UpdateProduk = FormSchemaPro.omit({ id_produk: true });

export async function updateProduk(id: string, formData: FormData) {
  const { nama_produk, harga_produk, kategori_produk, gambar } = UpdateProduk.parse({
    nama_produk: formData.get('nama_produk'),
    harga_produk: formData.get('harga_produk'),
    kategori_produk: formData.get('kategori_produk'),
    gambar: formData.get('gambar'),
  });

  try {
    await sql`
      UPDATE produk
      SET nama_produk = ${nama_produk}, harga_produk = ${harga_produk}, kategori_produk = ${kategori_produk}, gambar = ${gambar}
      WHERE id_produk = ${id}
    `;
  } catch (error) {
    console.error('Database update error:', error); // Log the actual error for debugging
    return { message: 'Database Error: Failed to Update produk.' };
  }

  revalidatePath('/dashboard/produk');
  redirect('/dashboard/produk');
}

const UpdateKaryawan = FormSchemaKar.omit({ id_karyawan: true });

export async function updateKaryawan(id: string, formData: FormData) {
  const { nama_karyawan, nomor_hp_karyawan, bank_karyawan, nomor_rekening_karyawan, alamat_karyawan, kata_sandi_karyawan, username_karyawan, role_karyawan } = UpdateKaryawan.parse({
    nama_karyawan: formData.get('nama_karyawan'),
    nomor_hp_karyawan: formData.get('nomor_hp_karyawan'),
    bank_karyawan: formData.get('bank_karyawan'),
    nomor_rekening_karyawan: formData.get('nomor_rekening_karyawan'),
    alamat_karyawan: formData.get('alamat_karyawan'),
    kata_sandi_karyawan: formData.get('kata_sandi_karyawan'),
    username_karyawan: formData.get('username_karyawan'),
    role_karyawan: formData.get('role_karyawan'),
  });

  try {
    await sql`
      UPDATE Karyawan
      SET 
        nama_karyawan = ${nama_karyawan}, 
        nomor_hp_karyawan = ${nomor_hp_karyawan},
        bank_karyawan = ${bank_karyawan},
        nomor_rekening_karyawan = ${nomor_rekening_karyawan},
        alamat_karyawan = ${alamat_karyawan}, 
        kata_sandi_karyawan = ${kata_sandi_karyawan},
        username_karyawan = ${username_karyawan}, 
        role_karyawan = ${role_karyawan}
      WHERE id_karyawan = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update karyawan.' };
  }

  revalidatePath('/dashboard/karyawan');
  redirect('/dashboard/karyawan');
}

export async function tampilKaryawan(id: string, formData: FormData) {
  const { nama_karyawan, nomor_hp_karyawan, bank_karyawan, nomor_rekening_karyawan ,alamat_karyawan ,kata_sandi_karyawan,username_karyawan,role_karyawan} = UpdateKaryawan.parse({
    nama_karyawan: formData.get('nama_karyawan'),
    nomor_hp_karyawan: formData.get('nomor_hp_karyawan'),
    bank_karyawan: formData.get('bank_karyawan'),
    nomor_rekening_karyawan: formData.get('nomor_rekening_karyawan'),
    alamat_karyawan: formData.get('alamat_karyawan'),
    kata_sandi_karyawan: formData.get('kata_sandi_karyawan'),
    username_karyawan: formData.get('username_karyawan'),
    role_karyawan: formData.get('role_karyawan'),
  });


  try {
    await sql`
    TAMPIL Karyawan
    SET nama_karyawan = ${nama_karyawan}, nomor_hp_karyawan = ${nomor_hp_karyawan},bank_karyawan = ${bank_karyawan},nomor_rekening_karyawan = ${nomor_rekening_karyawan},alamat_karyawan = ${alamat_karyawan}, kata_sandi_karyawan = ${kata_sandi_karyawan},username_karyawan = ${username_karyawan}, role_karyawan = ${role_karyawan},
    WHERE id_karyawan = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update karyawan.' };
  }


  revalidatePath('/dashboard/karyawan');
  redirect('/dashboard/karyawan');
}



// Skema Validasi
const FormSchemaTrans = z.object({
  id_transaksi: z.string(),
  id_karyawan: z.string(),
  id_pelanggan: z.string(),
  total_transaksi: z.number(),
  waktu_transaksi: z.string(),
  poin: z.number(),
  nama_pelanggan: z.string(),
  nomor_hp_pelanggan: z.string(),
  nama_karyawan: z.string(),
  nama_produk: z.string(),
  quantity: z.number(),
  harga_produk: z.number(),
  id_jenjang: z.string(),
  nama_jenjang: z.string(),
  diskon: z.number(),
  batas_pemakaian: z.number(),
  detail_pesanan: z.any().optional(),
});

// Skema tanpa `id_transaksi`
const TampilTransaksi = FormSchemaTrans.omit({ id_transaksi: true });

export async function tampilTransaksi(id: string, formData: FormData) {
  try {
    // Parsing data dari FormData menggunakan TampilTransaksi
    const {
      id_karyawan,
      id_pelanggan,
      total_transaksi,
      waktu_transaksi,
      poin,
      nama_pelanggan,
      nomor_hp_pelanggan,
      nama_karyawan,
      nama_produk,
      quantity,
      harga_produk,
      id_jenjang,
      nama_jenjang,
      diskon,
      batas_pemakaian,
      detail_pesanan,
    } = TampilTransaksi.parse({
      id_karyawan: formData.get('id_karyawan'),
      id_pelanggan: formData.get('id_pelanggan'),
      total_transaksi: Number(formData.get('total_transaksi')),
      waktu_transaksi: formData.get('waktu_transaksi'),
      poin: Number(formData.get('poin')),
      nama_pelanggan: formData.get('nama_pelanggan'),
      nomor_hp_pelanggan: formData.get('nomor_hp_pelanggan'),
      nama_karyawan: formData.get('nama_karyawan'),
      nama_produk: formData.get('nama_produk'),
      quantity: Number(formData.get('quantity')),
      harga_produk: Number(formData.get('harga_produk')),
      id_jenjang: formData.get('id_jenjang'),
      nama_jenjang: formData.get('nama_jenjang'),
      diskon: Number(formData.get('diskon')),
      batas_pemakaian: Number(formData.get('batas_pemakaian')),
      detail_pesanan: formData.get('detail_pesanan')
        ? JSON.parse(formData.get('detail_pesanan') as string)
        : undefined,
    });

    // Eksekusi query SQL untuk memperbarui data
    await sql`
      UPDATE Transaksi
      SET 
        id_karyawan = ${id_karyawan}, 
        id_pelanggan = ${id_pelanggan}, 
        total_transaksi = ${total_transaksi}, 
        waktu_transaksi = ${waktu_transaksi}, 
        poin = ${poin}, 
        nama_pelanggan = ${nama_pelanggan}, 
        nomor_hp_pelanggan = ${nomor_hp_pelanggan}, 
        nama_karyawan = ${nama_karyawan}, 
        nama_produk = ${nama_produk}, 
        quantity = ${quantity}, 
        harga_produk = ${harga_produk}, 
        id_jenjang = ${id_jenjang}, 
        nama_jenjang = ${nama_jenjang}, 
        diskon = ${diskon}, 
        batas_pemakaian = ${batas_pemakaian}, 
        detail_pesanan = ${JSON.stringify(detail_pesanan)}
      WHERE id_transaksi = ${id}
    `;
  } catch (error) {
    // Menangani kesalahan validasi atau database
    console.error('Error:', error);
    return { message: 'Database Error: Failed to Update Transaksi.' };
  }

  // Revalidasi dan redirect setelah berhasil
  revalidatePath('/dashboard/transaksi');
  redirect('/dashboard/transaksi');
}


// const UpdateProduk = FormSchema.omit({ id: true });

// export async function updateProduk(id: string, formData: FormData) {
//   const { name, email, nohp } = UpdateProduk.parse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     nohp: formData.get('nohp'),
//   });


//   try {
//     await sql`
//     UPDATE produk
//     SET nama_produk = ${nama_produk}, harga_produk = ${harga_produk}, nohp = ${nohp}
//     WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update produk.' };
//   }


//   revalidatePath('/dashboard/produk');
//   redirect('/dashboard/produk');
// }

// const CreateBahan = FormSchema.omit({ id: true });
// export async function createBahan(formData: FormData) {
//   const { nama_bahan, kategori_bahan, stok_bahan } = CreateBahan.parse({
//     // id: formData.get('id'),
//     nama_bahan: formData.get('nama_bahan'),
//     kategori_bahan: formData.get('kategori_bahan'),
//     stok_bahan: formData.get('stok_bahan'),
//   });
//   // Test it out:


//   const date = new Date().toISOString().split('T')[0];


//   await sql`
//     INSERT INTO bahan (nama_bahan, kategori_bahan, stok_bahan)
//     VALUES (${nama_bahan}, ${kategori_bahan}, ${stok_bahan})
//   `;


//   revalidatePath('/dashboard/bahan');
//   redirect('/dashboard/bahan');
// }

// const UpdateBahan = FormSchema.omit({ id: true });

// export async function updateBahan(id: string, formData: FormData) {
//   const { nama_bahan, kategori_bahan, stok_bahan } = UpdateBahan.parse({
//     nama_bahan: formData.get('nama_bahan'),
//     kategori_bahan: formData.get('kategori_bahan'),
//     stok_bahan: formData.get('stok_bahan'),
//   });


//   try {
//     await sql`
//     UPDATE bahan
//     SET nama_bahan = ${nama_bahan}, kategori_bahan = ${kategori_bahan}, stok_bahan = ${stok_bahan}
//     WHERE ID_bahan = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Bahan.' };
//   }


//   revalidatePath('/dashboard/bahan');
//   redirect('/dashboard/bahan');
// }

// const CreateProduk = FormSchema.omit({ id: true });
// export async function createProduk(formData: FormData) {
//   const { nama_produk, harga_produk, kategori_produk, gambar} = CreateProduk.parse({
//     // id: formData.get('id'),
//     nama_produk: formData.get('nama_produk'),
//     harga_produk: formData.get('harga_produk'),
//     kategori_produk: formData.get('kategori_produk'),
//     gambar: formData.get('gambar'),
//   });
//   // Test it out:


//   const date = new Date().toISOString().split('T')[0];


//   await sql`
//     INSERT INTO pelanggan (nama_produk, harga_produk, kategori_produk, gambar)
//     VALUES (${nama_produk}, ${harga_produk}, ${kategori_produk}, ${gambar})
//   `;


//   revalidatePath('/dashboard/produk');
//   redirect('/dashboard/produk');
// }
const FormSchemaMy = z.object({
  id_my_reward: z.string(),
  id_pelanggan: z.string().optional(),
  nama_pelanggan: z.string(),
  nomor_hp_pelanggan: z.string().optional(),
  id_transaksi: z.string(),
  poin: z.number(),
});


// import { v4 as uuidv462 } from 'uuid'; // Import UUID generator

// // Define the schema while excluding id_my_reward
// const CreateMy_reward = FormSchemaMy.omit({ id_my_reward: true });

// export async function createMy_reward(formData: FormData) {
//   try {
//     // Generate a new UUID for id_my_reward
//     const id_my_reward = uuidv462();

//     // Parse the poin value using the schema
//     const parsedData = CreateMy_reward.parse({
//       poin: formData.get('poin')?.toString() || "", // Ensure the value is a string
//     });

//     // Destructure the parsed value
//     const { poin } = parsedData;

//     // Insert the parsed data into the database
//     await sql`
//       INSERT INTO my_reward (id_my_reward, poin)
//       VALUES (${id_my_reward}, ${poin})
//     `;

//     // Revalidate and redirect
//     revalidatePath('/dashboard/my_reward');
//     redirect('/dashboard/my_reward');
//   } catch (error) {
//     console.error('Failed to create my_reward:', error);

//     // Throw a meaningful error for debugging
//     throw new Error('Failed to process my_reward creation. Please check your input.');
//   }
// }



import { v4 as uuidv46 } from 'uuid'; // Import UUID generator
// import { TampilTransaksi } from '../ui/transaksi/buttons';

const CreatePelanggan = FormSchemaPela.omit({ id_pelanggan: true });

export async function createPelanggan(formData: FormData) {
  const id_pelanggan = uuidv46(); // Generate a new UUID for id_pelanggan
  const id_my_reward = uuidv46(); // Generate a new UUID for id_my_reward
  const id_transaksi = uuidv46(); // Generate a new UUID for id_transaksi
  const id_jenjang = uuidv46();
  const nama_pelanggan = formData.get('nama_pelanggan')?.toString() || "";
  const nomor_hp_pelanggan = formData.get('nomor_hp_pelanggan')?.toString() || "";
  const tanggal_daftar_pelanggan = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  const poin = formData.get('poin')?.toString() || "";

  const parsedData = {
    id_pelanggan,
    id_my_reward,
    id_transaksi,
    id_jenjang,
    nama_pelanggan,
    nomor_hp_pelanggan,
    tanggal_daftar_pelanggan,
    poin,
  };

  // Insert into pelanggan table
  await sql`
    INSERT INTO pelanggan (id_pelanggan, id_jenjang, nama_pelanggan, nomor_hp_pelanggan, tanggal_daftar_pelanggan)
    VALUES (${parsedData.id_pelanggan}, ${parsedData.id_jenjang}, ${parsedData.nama_pelanggan}, ${parsedData.nomor_hp_pelanggan}, ${parsedData.tanggal_daftar_pelanggan})
  `;

  // Insert into myreward table with initial poin set to 0
  await sql`
    INSERT INTO myreward (id_my_reward, id_transaksi, id_pelanggan, poin)
    VALUES (${parsedData.id_my_reward}, ${parsedData.id_transaksi}, ${parsedData.id_pelanggan}, 0)
  `;

  // Revalidate and redirect after successful insertion
  revalidatePath('/dashboard/pelanggan');
  redirect('/dashboard/pelanggan');
}





// const UpdateMy_reward = FormSchemaMy.omit({ id_my_reward: true });
const UpdateMyRewardSchema = z.object({
  poin: z.preprocess(
    (value) => Number(value), // Ensure value is converted to number
    z.number().min(1, 'Poin must be at least 1') // Validate minimum value
  ),
});

// Update function for my_reward
export async function updateMy_reward(id: string, formData: FormData) {
  // Parse and validate form data
  const parsedData = UpdateMyRewardSchema.safeParse({
    poin: formData.get('poin'),
  });

  if (!parsedData.success) {
    console.error('Validation Error:', parsedData.error.errors);
    return { message: 'Invalid input data' };
  }

  const { poin } = parsedData.data;

  try {
    // Execute update query
    await sql`
      UPDATE myreward
      SET poin = ${poin}
      WHERE id_my_reward = ${id};
    `;

    // Revalidate and redirect
    revalidatePath('/dashboard/my_reward');
    redirect('/dashboard/my_reward');
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Failed to update my_reward' };
  }
}

export async function fetchPelangganByNoHp(nomor_hp_pelanggan: string): Promise<pelangganField | null> {
  try {
    console.log("Fetching pelanggan with nomor_hp_pelanggan:", nomor_hp_pelanggan);

    // Pastikan query SQL memfilter berdasarkan nomor_hp_pelanggan
    const result = await sql<pelangganField>`
      SELECT
        p.id_pelanggan,
        p.id_jenjang,
        p.nama_pelanggan,
        p.nomor_hp_pelanggan,
        p.tanggal_daftar_pelanggan,
        my.poin
      FROM pelanggan p
      JOIN myreward my ON p.id_pelanggan = my.id_pelanggan
      WHERE p.nomor_hp_pelanggan = ${nomor_hp_pelanggan}  -- Filter berdasarkan nomor_hp_pelanggan
      ORDER BY my.poin DESC
    `;

    console.log("Database result:", result.rows);

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error fetching pelanggan:", error);
    throw new Error("Failed to fetch pelanggan data.");
  }
}



export async function fetchtanggaltransaksi({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<transaksiField[]> {
  try {
    const result = await sql<transaksiField[]>`
      SELECT 
        id_transaksi, 
        waktu_transaksi, 
        total_transaksi, 
        nama_pelanggan
      FROM transaksi
      JOIN pelanggan ON pelanggan.id_pelanggan = transaksi.id_pelanggan
      WHERE waktu_transaksi BETWEEN ${startDate + ' 23:59:59'} AND ${endDate + ' 23:59:59'}
      ORDER BY waktu_transaksi DESC;
    `;

    // Pastikan hasil diratakan jika berbentuk dua dimensi
    return result.rows.flat();
  } catch (error) {
    console.error("Error fetching transaksi_penjualan:", error);
    throw new Error("Failed to fetch transaksi_penjualan data.");
  }
}
