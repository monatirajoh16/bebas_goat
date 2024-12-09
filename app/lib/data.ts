import { sql } from '@vercel/postgres';
import {
  CustomerField,
  produkField,
  bahanField,
  transaksiField,
  karyawanField,
  pelangganField,
  my_rewardField,
  jenjangField,
  detail_transaksiField,
  CustomersTableType,
  InvoiceForm,
  BahanForm,
  MyRewardForm,
  transaksiForm,
  ProdukForm,
  KaryawanForm,
  PelangganForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Penjualan,
  User,
  PelangganTableType,
  BahanTable,
  TransaksiTable,
  My_rewardTable,
  produkTable,
  PelangganTable,
  Detail_transaksiTable,
  ProdukTableType,
  karyawanTable,
  KaryawanTableType,
  My_rewardTableType
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';


export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function fetchPenjualan() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Penjualan>`SELECT * FROM transaksi`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data penjualan.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchmy_reward() {
  try {
    const data = await sql<my_rewardField>`
      SELECT 
            mr.id_my_reward,
            p.id_pelanggan,
            p.nama_pelanggan,
            p.nomor_hp_pelanggan,
            t.id_transaksi,
            mr.poin
          FROM myreward mr
          JOIN pelanggan p ON mr.id_pelanggan = p.id_pelanggan
          JOIN transaksi t ON mr.id_transaksi = t.id_transaksi
          ORDER BY poin DESC
    `;

    const poin = data.rows;
    return poin;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all my reward.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) );
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchKaryawanById(id: string) {
  unstable_noStore()
  try {
    const data = await sql<KaryawanForm>`
      SELECT 
      id_karyawan,
      nama_karyawan,
      nomor_hp_karyawan,
      bank_karyawan,
      nomor_rekening_karyawan,
      alamat_karyawan,
      kata_sandi_karyawan,
      username_karyawan,
      role_karyawan
      FROM karyawan
      WHERE karyawan.id_karyawan = ${id};
    `;

    const karyawan = data.rows.map((karyawan) => ({
      ...karyawan,
      // Convert amount from cents to dollars
      // amount: bahan.amount / 100,
    }));
    console.log(karyawan);
    return karyawan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch karyawan.');
  }
}

export async function fetchBahanById(id: string) {
  unstable_noStore();
  try {
    const data = await sql<bahanField>`
      SELECT
        b.id_bahan,
        b.nama_bahan,
        b.kategori_bahan,
        b.stok_bahan
      FROM bahan b 
      WHERE b.id_bahan = ${id};
    `;

    return data.rows[0]; // Return the first item from the result
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Gagal mengambil bahan.');
  }
}

export async function fetchMy_reward(id: string) {
  unstable_noStore()
  try {
    const data = await sql<MyRewardForm>`
      SELECT 
      mr.id_my_reward,
            p.id_pelanggan,
            p.nama_pelanggan,
            p.nomor_hp_pelanggan,
            t.id_transaksi,
            mr.poin
          FROM myreward mr
          JOIN pelanggan p ON mr.id_pelanggan = p.id_pelanggan
          JOIN transaksi t ON mr.id_transaksi = t.id_transaksi
          ORDER BY poin DESC
    `;

    const my_reward = data.rows.map((my_reward) => ({
      ...my_reward,
      // Convert amount from cents to dollars
      // amount: bahan.amount / 100,
    }));
    console.log(my_reward);
    return my_reward[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch my_reward.');
  }
}

// export async function fetchMy_rewardById(id: string) {
//   unstable_noStore()
//   try {
//     const data = await sql<BahanForm>`
//       SELECT 
//       ID_bahan,
//       nama_bahan,
//       kategori_bahan,
//       stok_bahan
//       FROM bahan
//       WHERE bahan.ID_bahan = ${id};
//     `;

//     const bahan = data.rows.map((bahan) => ({
//       ...bahan,
//       // Convert amount from cents to dollars
//       // amount: bahan.amount / 100,
//     }));
//     console.log(bahan);
//     return bahan[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch bahan.');
//   }
// }

export async function fetchMy_rewardById(id: string) {
  unstable_noStore()
  try {
    const data = await sql<MyRewardForm>`
     SELECT 
      mr.id_my_reward,
            mr.id_pelanggan,
            p.nama_pelanggan,
            p.nomor_hp_pelanggan,
            t.id_transaksi,
            mr.poin
          FROM myreward mr
          JOIN pelanggan p ON mr.id_pelanggan = p.id_pelanggan
          JOIN transaksi t ON p.id_pelanggan = t.id_pelanggan
          WHERE mr.id_my_reward = ${id}
          ORDER BY poin DESC

    `;

    const my_reward = data.rows.map((my_reward) => ({
      ...my_reward,
      // Convert amount from cents to dollars
      // amount: bahan.amount / 100,
    }));
    console.log(my_reward);
    return my_reward[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch my reward.');
  }
}

export async function fetchProdukById(id: string) {
  unstable_noStore()
  try {
    const data = await sql<ProdukForm>`
      SELECT 
      ID_produk,
      nama_produk,
      harga_produk,
      kategori_produk,
      gambar
      FROM produk
      WHERE produk.ID_produk = ${id};
    `;

    const produk = data.rows.map((produk) => ({
      ...produk,
      // Convert amount from cents to dollars
      // amount: bahan.amount / 100,
    }));
    console.log(produk);
    return produk[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk.');
  }
}

// export async function fetchTransaksiById(id: string) {
//   unstable_noStore()
//   try {
//     const data = await sql<TransaksiForm>`
//       SELECT 
//       id_transaksi,
//       id_karyawan,
//       id_pelanggan,
//       total_transaksi,
//       waktu_transaksi,
//       poin
//       WHERE transaksi.id_transaksi = ${id};
//     `;

//     const transaksi = data.rows.map((transaksi) => ({
//       ...transaksi,
//       // Convert amount from cents to dollars
//       // amount: bahan.amount / 100,
//     }));
//     console.log(transaksi);
//     return transaksi[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch transaksi.');
//   }
// }

export async function fetchTransaksiById(id: string, currentPage: number) {
  try {
    const data = await sql<transaksiForm>`
  SELECT 
    t.id_transaksi,
    t.id_pelanggan,
    p.nama_pelanggan,
    p.nomor_hp_pelanggan,
    t.total_transaksi,
    t.waktu_transaksi
FROM transaksi t
JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
WHERE t.id_transaksi = ${id}
ORDER BY t.waktu_transaksi ASC;

`;

    const transaksi = data.rows;
    console.log('Fetched transaksi:', transaksi); // Log hasil dari database
    return transaksi;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch transaksi table.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchProduk() {
  try {
    const data = await sql<produkField>`
      SELECT
        ID_produk,
        nama_produk,
        harga_produk,
        kategori_produk,
        gambar
      FROM produk
      ORDER BY nama_produk ASC
    `;

    const produk = data.rows;
    return produk;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// export async function fetchTransaksi() {
//   try {
//     const data = await sql<transaksiField>`
//       SELECT
//         id_transaksi,
//         id_karyawan,
//         id_pelanggan,
//         total_transaksi,
//         waktu_transaksi,
//         poin
//       FROM transaksi
//       ORDER BY waktu_transaksi ASC
//     `;

//     const transaksi = data.rows;
//     return transaksi;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

export async function fetchTransaksi() {
  unstable_noStore()
  try {
    const data = await sql<transaksiField>`
SELECT 
    t.id_transaksi,
    t.id_karyawan,
    t.id_pelanggan,
    p.nama_pelanggan,
    t.total_transaksi,
    t.waktu_transaksi
FROM transaksi t
JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
ORDER BY t.total_transaksi ASC
`;

    const transaksi = data.rows;
    console.log('Fetched transaksi:', transaksi); // Log hasil dari database
    return transaksi;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch transaksi table.');
  }
}

// export async function fetchTransaksi() {
//   try {
//     const data = await sql<transaksiField>`
// SELECT 
//     t.id_transaksi,
//     t.id_karyawan,
//     t.id_pelanggan,
//     p.nama_pelanggan,
//     p.nomor_hp_pelanggan,
//     t.total_transaksi,
//     t.waktu_transaksi,
//     dt.id_detail_transaksi,
//     dt.id_produk,
//     dt.jumlah_transaksi,
//     pr.nama_produk,
//     pr.harga_produk,
//     dd.id_detail_diskon,
//     j.id_jenjang,
//     j.nama_jenjang,
//     j.diskon,
//     j.batas_pemakaian
// FROM transaksi t
// JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
// JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
// JOIN produk pr ON dt.id_produk = pr.id_produk
// LEFT JOIN detail_diskon dd ON t.id_transaksi = dd.id_transaksi
// LEFT JOIN jenjang j ON dd.id_jenjang = j.id_jenjang -- JOIN ke tabel jenjang
// ORDER BY t.total_transaksi ASC
// `;

//     const transaksiWithJenjang = data.rows;
//     console.log('Fetched transaksi with jenjang details:', transaksiWithJenjang); // Log hasil dari database
//     return transaksiWithJenjang;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch transaksi with jenjang details.');
//   }
// }


// export async function fetchTransaksi() {
//   try {
//     const data = await sql<transaksiField>`
//   SELECT 
//     t.id_transaksi,
//     t.id_pelanggan,
//     p.nama_pelanggan,
//     p.nomor_hp_pelanggan,
//     t.total_transaksi,
//     t.waktu_transaksi
// FROM transaksi t
// JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
// ORDER BY t.waktu_transaksi ASC;

// `;

//     const transaksiWithPelangganAndJenjang = data.rows;
//     console.log('Fetched transaksi with pelanggan and jenjang details:', transaksiWithPelangganAndJenjang); // Log hasil dari database
//     return transaksiWithPelangganAndJenjang;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch transaksi with pelanggan and jenjang details.');
//   }
// }



// export async function fetchDetailTransaksi() {
//   try {
//     const data = await sql<detail_transaksiField>`
// SELECT 
//     t.id_transaksi,
//     t.id_karyawan,
//     t.id_pelanggan,
//     p.nama_pelanggan,
//     p.id_pelanggan,
//     p.nomor_hp_pelanggan,
//     t.total_transaksi,
//     t.waktu_transaksi,
//     dt.id_detail_transaksi,
//     dt.id_produk,
//     dt.jumlah_transaksi,
//     pr.nama_produk,
//     pr.harga_produk
// FROM transaksi t
// JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
// JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
// JOIN produk pr ON dt.id_produk = pr.id_produk
// ORDER BY t.total_transaksi ASC
// `;

//     const transaksi = data.rows;
//     console.log('Fetched transaksi with details:', transaksi); // Log hasil dari database
//     return transaksi;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch transaksi with details.');
//   }
// }

export async function fetchDetailTransaksi() {
  try {
    const data = await sql<detail_transaksiField>`
SELECT 
    t.id_transaksi,
    t.id_karyawan,
    t.id_pelanggan,
    p.nama_pelanggan,
    p.nomor_hp_pelanggan,
    t.total_transaksi,
    t.waktu_transaksi,
    dt.id_detail_transaksi,
    dt.id_produk,
    dt.jumlah_transaksi,
    pr.nama_produk,
    pr.harga_produk,
    dd.id_detail_diskon,
    j.id_jenjang,
    j.nama_jenjang,
    j.diskon,
    j.batas_pemakaian
FROM transaksi t
JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
JOIN produk pr ON dt.id_produk = pr.id_produk
LEFT JOIN detail_diskon dd ON t.id_transaksi = dd.id_transaksi
LEFT JOIN jenjang j ON dd.id_jenjang = j.id_jenjang -- JOIN ke tabel jenjang
ORDER BY t.total_transaksi ASC
`;

    const transaksiWithPelangganAndJenjang = data.rows;
    console.log('Fetched transaksi with pelanggan and jenjang details:', transaksiWithPelangganAndJenjang); // Log hasil dari database
    return transaksiWithPelangganAndJenjang;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch transaksi with pelanggan and jenjang details.');
  }
}

export async function fetchKaryawan() {
  try {
    const data = await sql<karyawanField>`
      SELECT
        id_karyawan,
        nama_karyawan,
        nomor_hp_karyawan,
        bank_karyawan,
        nomor_rekening_karyawan,
        alamat_karyawan,
        kata_sandi_karyawan,
        username_karyawan,
        role_karyawan
      FROM karyawan
      ORDER BY nama_karyawan ASC
    `;

    const karyawan = data.rows;
    return karyawan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all karyawan.');
  }
}


export async function fetchBahan() {
  try {
    const data = await sql<bahanField>`
      SELECT
        id_bahan,
        id_karyawan,
        nama_bahan,
        kategori_bahan,
        stok_bahan
      FROM bahan
      ORDER BY nama_bahan ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Gagal mengambil semua bahan.');
  }
}



export async function fetchPelanggan() {
  try {
    const data = await sql<pelangganField>`
      SELECT
    p.id_pelanggan,
    p.id_jenjang,
    p.nama_pelanggan,
    p.nomor_hp_pelanggan,
    p.tanggal_daftar_pelanggan,
    my.poin
FROM pelanggan p
JOIN myreward my ON p.id_pelanggan = my.id_pelanggan
ORDER BY p.nama_pelanggan ASC;

    `;

    const pelanggan = data.rows;
    return pelanggan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all pelanggan.');
  }
}

export async function fetchJenjang() {
  try {
    const data = await sql<jenjangField>`
      SELECT
        id_jenjang,
        nama_jenjang,
        diskon,
        batas_pemakaian
      FROM jenjang
      ORDER BY nama_jenjang ASC
    `;

    const jenjang = data.rows;
    return jenjang;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all jenjang.');
  }
}


export async function fetchPelangganByNoHP(id: string) {
  unstable_noStore()
  try {
    const data = await sql<PelangganForm>`
     
    
    `;

    const pelanggan = data.rows.map((pelanggan) => ({
      ...pelanggan,
      // Convert amount from cents to dollars
      // amount: pelanggan.amount / 100,
    }));
    console.log(pelanggan);
    return pelanggan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pelanggan.');
  }
}

export async function fetchPelangganById(id: string) {
  unstable_noStore()
  try {
    const data = await sql<PelangganForm>`
      SELECT 
      id_pelanggan,
      id_jenjang,
      nama_pelanggan,
      nomor_hp_pelanggan,
      tanggal_daftar_pelanggan
      FROM pelanggan
      WHERE pelanggan.id_pelanggan = ${id};
    `;

    const pelanggan = data.rows.map((pelanggan) => ({
      ...pelanggan,
      // Convert amount from cents to dollars
      // amount: pelanggan.amount / 100,
    }));
    console.log(pelanggan);
    return pelanggan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pelanggan.');
  }
}

// export async function fetchFilteredProduk(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const produk = await sql<produkTable>`
//       SELECT *  
//       FROM produk
//       WHERE
//         CAST(produk.ID_produk AS TEXT) ILIKE ${`%${query}%`} OR
//         produk.nama_produk ILIKE ${`%${query}%`} OR
//         CAST(produk.harga_produk AS TEXT) ILIKE ${`%${query}%`} OR
//         CAST(produk.kategori_produk AS TEXT) ILIKE ${`%${query}%`} OR
//         produk.gambar ILIKE ${`%${query}%`}
//       ORDER BY produk.nama_produk DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return produk.rows;  // Mengakses data di dalam properti `rows`
//   } catch (error) {
//     console.error('Database Error:', error instanceof Error ? error.message : error);
//     throw new Error(`Failed to fetch produk: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// }


export async function fetchFilteredKaryawan(query: string, currentPage: number) {
  try {
    // Define the number of items per page

    // Calculate the offset for pagination
    const offset = (currentPage - 1);

    // Use parameterized queries to prevent SQL injection
    const data = await sql<karyawanTable>`
      SELECT 
        id_karyawan,
        nama_karyawan,
        nomor_hp_karyawan,
        bank_karyawan,
        nomor_rekening_karyawan,
        alamat_karyawan,
        kata_sandi_karyawan,
        username_karyawan,
        role_karyawan
      FROM karyawan
      WHERE LOWER(nama_karyawan) LIKE LOWER(${`%${query}%`}) -- Filter based on the query
      ORDER BY nama_karyawan ASC
    `;

    const karyawan = data.rows;
    console.log('Fetched karyawan:', karyawan); // Log results from the database
    return karyawan;
  } catch (error) {
    console.error('Database Error:', error instanceof Error ? error.message : error);
    throw new Error(`Failed to fetch karyawan: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}



export async function fetchFilteredProduk(
  query: string,
  currentPage: number,
) {
  try {
    // Define the number of items per page

    // Calculate the offset for pagination
    const offset = (currentPage - 1);

    // Use parameterized queries to prevent SQL injection
    const data = await sql<produkTable>`
      SELECT 
        id_produk,
        nama_produk,
        harga_produk,
        kategori_produk,
        gambar
      FROM produk
      WHERE LOWER(nama_produk) LIKE LOWER(${`%${query}%`}) -- Filter based on the query
      ORDER BY nama_produk ASC
    `;

    const produk = data.rows;
    console.log('Fetched produk:', produk); // Log results from the database
    return produk;  // Access data in the `rows` property
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch produk table.');
  }
}



export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchPelangganPages(query: string) {
  unstable_noStore()
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM pelanggan
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count));
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pelanggan.');
  }
}


export async function fetchKaryawanPages(query: string) {
  unstable_noStore()
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM karyawan
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) );
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of karyawan.');
  }
}
export async function fetchProdukPages(query: string) {
  unstable_noStore()
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM produk
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) );
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of produk.');
  }
}


export async function fetchMy_rewardPages(query: string) {
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM myreward
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) );
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of myreward.');
  }
}


export async function fetchBahanPages(query: string) {
  // unstable_noStore()
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM bahan
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count));
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of bahan.');
  }
}

export async function fetchFilteredPelanggan(
  query: string,
  currentPage: number
) {
  try {
    // Define the number of items per page

    // Calculate the offset for pagination
    const offset = (currentPage - 1);

    // Use parameterized queries to prevent SQL injection
    const data = await sql<pelangganField>`
      SELECT
        p.id_pelanggan,
        p.id_jenjang,
        p.nama_pelanggan,
        p.nomor_hp_pelanggan,
        p.tanggal_daftar_pelanggan,
        my.poin
      FROM pelanggan p
      JOIN myreward my ON p.id_pelanggan = my.id_pelanggan
      WHERE LOWER(p.nama_pelanggan) LIKE LOWER(${`%${query}%`}) -- Filter based on the query
      OR p.nomor_hp_pelanggan LIKE ${`%${query}%`} -- Optionally filter by phone number
      ORDER BY my.poin DESC
    `;

    const pelanggan = data.rows;
    console.log('Fetched pelanggan:', pelanggan); // Log results from the database
    return pelanggan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch pelanggan table.');
  }
}

export async function fetchFilteredBahan(query: string, currentPage: number) {
  try {
    // Define the number of items per page

    // Calculate the offset for pagination
    const offset = (currentPage - 1);

    // Use parameterized queries to prevent SQL injection
    const data = await sql<BahanTable>`
      SELECT 
        id_bahan,
        id_karyawan,
        nama_bahan,
        kategori_bahan,
        stok_bahan
      FROM bahan
      WHERE LOWER(nama_bahan) LIKE LOWER(${`%${query}%`}) -- Filter based on the query
      ORDER BY nama_bahan ASC
    `;

    const bahan = data.rows;
    console.log('Fetched bahan:', bahan); // Log results from the database
    return bahan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch bahan table.');
  }
}

export async function fetchFilteredTransaksi(query: string, currentPage: number) {
  try {
    // Define the number of items per page

    // Calculate the offset for pagination

    // Use parameterized queries to prevent SQL injection
    const data = await sql<TransaksiTable>`
      SELECT 
        t.id_transaksi,
        t.id_karyawan,
        t.id_pelanggan,
        p.nama_pelanggan,
        t.total_transaksi,
        t.waktu_transaksi,
        my.poin
      FROM transaksi t
      JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
      JOIN myreward my ON t.id_pelanggan = my.id_pelanggan
      WHERE LOWER(p.nama_pelanggan) LIKE LOWER(${`%${query}%`}) -- Filter based on the query
      OR t.id_transaksi::text LIKE ${`%${query}%`} -- Optionally filter by transaction ID
      ORDER BY t.waktu_transaksi DESC
    `;

    const transaksi = data.rows;
    console.log('Fetched transaksi:', transaksi); // Log results from the database
    return transaksi;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch transaksi table.');
  }
}

// export async function fetchFilteredLaporan(query: string, currentPage: number) {
//   try {
//     const data = await sql<LaporanTable>`
// SELECT 
//     t.id_transaksi,
//     t.id_karyawan,
//     t.id_pelanggan,
//     p.nama_pelanggan,
//     t.total_transaksi,
//     t.waktu_transaksi,
//     my.poin
// FROM transaksi t
// JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
// JOIN myreward my ON t.id_pelanggan = my.id_pelanggan
// ORDER BY t.waktu_transaksi DESC
// `;

//     const transaksi = data.rows;
//     console.log('Fetched transaksi:', transaksi); // Log hasil dari database
//     return transaksi;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch transaksi table.');
//   }
// }
export async function fetchFilteredDetail_transaksi(query: string, currentPage: number) {
  try {
    const data = await sql<Detail_transaksiTable>`
SELECT 
    dt.id_detail_transaksi,
    t.id_transaksi,
    t.id_karyawan,
    t.id_pelanggan,
    p.nama_pelanggan,
    t.total_transaksi,
    t.waktu_transaksi,
    my.poin
FROM detail_transaksi dt
JOIN transaksi t ON dt.id_transaksi = t.id_transaksi
JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
JOIN myreward my ON t.id_pelanggan = my.id_pelanggan
ORDER BY t.waktu_transaksi DESC
`;

    const transaksi = data.rows;
    console.log('Fetched transaksi:', transaksi); // Log hasil dari database
    return transaksi;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch transaksi table.');
  }
}

export async function fetchTransaksiPages(query: string, currentPage: number) {

    unstable_noStore()
    try {
      const count = await sql`
      SELECT COUNT(*)
      FROM transaksi
      `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count));
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of bahan.');
    }
  }
// export async function fetchFilteredProduk(
//   query: string,
//   currentPage: number) {
//   // unstable_noStore(); // Pastikan ini sesuai dengan penggunaan Anda

//   // try {
//   const data = await sql<ProdukTableType>`
//             SELECT 
//               ID_produk,
//               nama_pelanggan,
//               kategori_produk,
//               harga_produk,
//               gambar
//             FROM produk
//             WHERE
// 		     ID_produk ILIKE ${`%${query}%`} OR
//         nama_pelanggan ILIKE ${`%${query}%`}

//           `;

//   const produk = data.rows.map((produk) => ({
//     ...produk,
//   }));

//   return produk;
//   // } catch (err) {
//   //   console.error('Database Error:', err);
//   //   throw new Error('Failed to fetch pelanggan table.');
//   // }
// }

// export async function fetchFilteredMy_reward(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const karyawan = await sql<My_rewardTableType>`
//        SELECT 
//           my_reward.nama_pelanggan,
//           my_reward.nomor_hp_pelanggan,
//           my_reward.poin,

//         FROM my_reward

//     `;

//     return karyawan.rows;  // Mengakses data di dalam properti `rows`
//   } catch (error) {
//     console.error('Database Error:', error instanceof Error ? error.message : error);
//     throw new Error(`Failed to fetch my_reward: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// }


export async function fetchFilteredMy_reward(query: string, currentPage: number) {
  try {
    // Define the number of items per page

    // Calculate the offset for pagination
    const offset = (currentPage - 1);

    // Use parameterized queries to prevent SQL injection
    const data = await sql<My_rewardTable>`
      SELECT
        p.id_pelanggan,
        p.id_jenjang,
        p.nama_pelanggan,
        p.nomor_hp_pelanggan,
        p.tanggal_daftar_pelanggan,
        my.poin,
        my.id_my_reward
      FROM myreward my
      JOIN pelanggan p ON p.id_pelanggan = my.id_pelanggan
      WHERE LOWER(p.nama_pelanggan) LIKE LOWER(${`%${query}%`}) -- Filter based on the query
      OR p.nomor_hp_pelanggan LIKE ${`%${query}%`} -- Optionally filter by phone number
      ORDER BY my.poin DESC
    `;

    const myreward = data.rows;
    console.log('Fetched myreward:', myreward); // Log results from the database
    return myreward;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch myreward table.');
  }
}



// } catch (err) {
//   console.error('Database Error:', err);
//   throw new Error('Failed to fetch pelanggan table.');
// }
