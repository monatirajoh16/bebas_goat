// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type bahan = {
  id_bahan: string;
  id_karyawan:string;
  nama_bahan: string;
  kategori_bahan: string;
  stok_bahan: string;
};

export type BahanForm = {
  id_bahan: string;
  id_karyawan:string;
  nama_bahan: string;
  kategori_bahan: string;
  nama_karyawan: string;
  stok_bahan: string;
};

export type MyRewardForm = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type KaryawanForm = {
  id_karyawan:string;
  nama_karyawan: string;
  nomor_hp_karyawan: string;
  bank_karyawan: string;
  nomor_rekening_karyawan: string;
  alamat_karyawan: string;
  kata_sandi_karyawan: string;
  username_karyawan: string;
  role_karyawan: string;
};

export type karyawan = {
  id_karyawan:string;
  nama_karyawan: string;
  nomor_hp_karyawan: string;
  bank_karyawan: string;
  nomor_rekening_karyawan: string;
  alamat_karyawan: string;
  kata_sandi_karyawan: string;
  username_karyawan: string;
  role_karyawan: string;
};

export type my_reward = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type transaksi = {
  id_transaksi:string;
  id_karyawan:string;
  id_pelanggan:string;
  total_transaksi:number;
  waktu_transaksi:Date;
  poin:number;
};

// export type transaksiField = {
//   id_transaksi:string;
//   id_karyawan:string;
//   id_pelanggan:string;
//   total_transaksi:number;
//   waktu_transaksi:Date;
//   poin:string;
//   nama_pelanggan:string;
//   nomor_hp_pelanggan:string;
//   nama_karyawan:string;
//   nama_produk:string;
//   quantity: number;
//   harga_produk:number;
//   id_jenjang: string;
//   nama_jenjang: string;
//   diskon: number;
//   batas_pemakaian:number;

// };

export type transaksiField = {
  id_transaksi: string;          // ID transaksi
  id_karyawan: string;           // ID karyawan yang menangani transaksi
  id_pelanggan: string;          // ID pelanggan yang melakukan transaksi
  total_transaksi: number;       // Total biaya transaksi
  waktu_transaksi: string;         // Waktu transaksi
  poin:number;
  nama_pelanggan: string;        // Nama pelanggan
  nomor_hp_pelanggan: string;    // Nomor HP pelanggan
  nama_karyawan: string;         // Nama karyawan yang menangani transaksi
  nama_produk: string;           // Nama produk yang dibeli
  quantity: number;              // Jumlah produk yang dibeli
  harga_produk: number;          // Harga per unit produk
  id_jenjang: string;            // ID jenjang diskon (jika ada)
  nama_jenjang: string;          // Nama jenjang diskon (jika ada)
  diskon: number;                // Diskon yang diterapkan pada transaksi
  batas_pemakaian: number;       // Batas pemakaian diskon (jika ada)
  detail_pesanan?: { item: string; harga: number }[]; // Add this property
};

export type TransaksiTable = {
  id_transaksi: string;          // ID transaksi
  id_karyawan: string;           // ID karyawan yang menangani transaksi
  id_pelanggan: string;          // ID pelanggan yang melakukan transaksi
  total_transaksi: number;       // Total biaya transaksi
  waktu_transaksi: string;         // Waktu transaksi
  poin:number;
  nama_pelanggan: string;        // Nama pelanggan
  nomor_hp_pelanggan: string;    // Nomor HP pelanggan
  nama_karyawan: string;         // Nama karyawan yang menangani transaksi
  nama_produk: string;           // Nama produk yang dibeli
  quantity: number;              // Jumlah produk yang dibeli
  harga_produk: number;          // Harga per unit produk
  id_jenjang: string;            // ID jenjang diskon (jika ada)
  nama_jenjang: string;          // Nama jenjang diskon (jika ada)
  diskon: number;                // Diskon yang diterapkan pada transaksi
  batas_pemakaian: number;       // Batas pemakaian diskon (jika ada)
  detail_pesanan?: { nama_produk: string; harga_produk: number }[];
  

};

export type Detail_transaksiTable = {
  id_transaksi: string;          // ID transaksi
  id_karyawan: string;           // ID karyawan yang menangani transaksi
  id_pelanggan: string;          // ID pelanggan yang melakukan transaksi
  total_transaksi: number;       // Total biaya transaksi
  waktu_transaksi: string;         // Waktu transaksi
  poin:number;
  nama_pelanggan: string;        // Nama pelanggan
  nomor_hp_pelanggan: string;    // Nomor HP pelanggan
  nama_karyawan: string;         // Nama karyawan yang menangani transaksi
  nama_produk: string;           // Nama produk yang dibeli
  quantity: number;              // Jumlah produk yang dibeli
  harga_produk: number;          // Harga per unit produk
  id_jenjang: string;            // ID jenjang diskon (jika ada)
  nama_jenjang: string;          // Nama jenjang diskon (jika ada)
  diskon: number;                // Diskon yang diterapkan pada transaksi
  batas_pemakaian: number;       // Batas pemakaian diskon (jika ada)
  detail_pesanan?: { nama_produk: string; harga_produk: number }[];
  id_detail_transaksi:string;
  id_produk:string;
  jumlah_transaksi:number;
  

};

export type detail_transaksi = {
  id_detail_transaksi:string;
  id_transaksi:string;
  id_produk:string;
  jumlah_transaksi:number;
  quantity: number;
};

export type detail_transaksiField = {
  id_detail_transaksi:string;
  id_transaksi:string;
  id_produk:string;
  jumlah_transaksi:number;
  id_karyawan: string;
  id_pelanggan: string;
  nama_pelanggan: string;
  total_transaksi: number;
  nomor_hp_pelanggan: number;
  waktu_transaksi: Date;
  nama_produk: string;
  harga_produk: number;
  quantity: number;
};

export type produk = {
  id_produk:string;
  nama_produk:string;
  harga_produk:number;
  kategori_produk:string;
  gambar:string;
  quantity: number;
};

export type produkTable = {
  id_produk:string;
  nama_produk:string;
  harga_produk:number;
  kategori_produk:string; 
  gambar:string;
  quantity: number;
};
export type karyawanTable = {
  id_karyawan:string;
  nama_karyawan: string;
  nomor_hp_karyawan: string;
  bank_karyawan: string;
  nomor_rekening_karyawan: string;
  alamat_karyawan: string;
  kata_sandi_karyawan: string;
  username_karyawan: string;
  role_karyawan: string;
};

export type detail_diskon = {
  id_detail_diskon:string;
  id_pelanggan:string;
  id_transaksi:string;
  id_jenjang:string;
};

export type pelanggan = {
  id_pelanggan: string;
  id_jenjang: string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  tanggal_daftar_pelanggan: Date;
  poin: number;
};

export type jenjang = {
  id_jenjang: string;
  nama_jenjang: string;
  diskon: number;
  batas_pemakaian:number;
};

export type jenjangField = {
  id_jenjang: string;
  nama_jenjang: string;
  diskon: number;
  batas_pemakaian:number;
};

export type PelangganTable = {
  id_pelanggan: string;
  id_jenjang: string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  tanggal_daftar_pelanggan:Date;
  poin:number;
};
export type BahanTable = {
  id_bahan: string;
  id_karyawan:string;
  nama_bahan: string;
  kategori_bahan: string;
  stok_bahan: string;
};

export type MyrewardTable = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type Myreward = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type PelangganTableType = {
  id_pelanggan: string;
  id_jenjang: string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  tanggal_daftar_pelanggan: Date;
  poin: number;
};

export type My_rewardTableType = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type My_rewardTable = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};
export type KaryawanTableType = {
  id_karyawan:string;
  nama_karyawan: string;
  nomor_hp_karyawan: string;
  bank_karyawan: string;
  nomor_rekening_karyawan: string;
  alamat_karyawan: string;
  kata_sandi_karyawan: string;
  username_karyawan: string;
  role_karyawan: string;
};
export type ProdukTableType = {
  id_produk:string;
  nama_produk:string;
  harga_produk:number;
  kategori_produk:string;
  gambar:string;
  quantity: number;
};

// export type BahanTableType = {
//   id_bahan: string;
//   nama_bahan: string;
//   kategori_bahan: string;
//   stok_bahan: string;
// };


export type pelangganField = {
  id_pelanggan: string;
  id_jenjang: string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  tanggal_daftar_pelanggan:string;
  poin: number;
};

export type produkField = {
  id_produk:string;
  nama_produk:string;
  harga_produk:number;
  kategori_produk:string;
  gambar:string;
  quantity: number;
};


export type karyawanField = {
  id_karyawan:string;
  nama_karyawan:string;
  nomor_hp_karyawan:string;
  bank_karyawan:string;
  nomor_rekening_karyawan:string;
  alamat_karyawan:string;
  kata_sandi_karyawan:string;
  username_karyawan:string;
  role_karyawan:string;
};


export type bahanField = {
  id_bahan: string;
  id_karyawan: string,
  nama_bahan: string;
  kategori_bahan: string;
  stok_bahan: string;
};

export type my_rewardField = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type PelangganForm = {
  id_pelanggan: string;
  id_jenjang: string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  tanggal_daftar_pelanggan:string;
  poin: number;
};

export type transaksiForm = {
  id_transaksi: string;          // ID transaksi
  id_karyawan: string;           // ID karyawan yang menangani transaksi
  id_pelanggan: string;          // ID pelanggan yang melakukan transaksi
  total_transaksi: number;       // Total biaya transaksi
  waktu_transaksi: string;         // Waktu transaksi
  poin:number;
  nama_pelanggan: string;        // Nama pelanggan
  nomor_hp_pelanggan: string;    // Nomor HP pelanggan
  nama_karyawan: string;         // Nama karyawan yang menangani transaksi
  nama_produk: string;           // Nama produk yang dibeli
  quantity: number;              // Jumlah produk yang dibeli
  harga_produk: number;          // Harga per unit produk
  id_jenjang: string;            // ID jenjang diskon (jika ada)
  nama_jenjang: string;          // Nama jenjang diskon (jika ada)
  diskon: number;                // Diskon yang diterapkan pada transaksi
  batas_pemakaian: number;       // Batas pemakaian diskon (jika ada)
  detail_pesanan?: { nama_produk: string; harga_produk: number }[];
};
// export type BahanForm = {
//   id_bahan: string;
//   nama_bahan: string;
//   kategori_bahan: string;
//   stok_bahan: string;
// };

export type ProdukForm = {
  id_produk:string;
  nama_produk:string;
  harga_produk:number;
  kategori_produk:string;
  gambar:string;
  quantity: number;
};

export type MyrewardForm = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Penjualan = {
  month: string;
  year: string;
  total_transaksi:number;
  penjualan: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};



export type FormattedMyrewardTable = {
  id_my_reward: string;
  id_pelanggan:string;
  nama_pelanggan: string;
  nomor_hp_pelanggan: string;
  id_transaksi:string;
  poin:number;
};

export type FormattedBahanTable = {
  id_bahan: string;
  id_karyawan:string;
  nama_bahan: string;
  kategori_bahan: string;
  stok_bahan: string;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


