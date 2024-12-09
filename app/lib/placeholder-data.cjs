// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// const users = [
//   {
//     id: '410544b2-4001-4271-9855-fec4b6a6442a',
//     name: 'User',
//     email: 'user@nextmail.com',
//     password: '123456',
//   },
// ];
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    username: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '0ba80413-dc92-45b2-b2a7-28e22aa1ad72',
    name: 'usus',
    username: 'usus@nextmail.com',
    password: '1234567',
  },
  ];

  const pelanggan = [
    {
      id_pelanggan: '9f645cda-2e37-47b7-961d-9a5dc40bcacf',
      id_jenjang:'97f35953-85c2-443c-b1c7-1361869f172e',
      nama_pelanggan: 'Mona T',
      nomor_hp_pelanggan: '081234567890',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '54ea55d3-42a2-4574-934e-9aba37427594',
      id_jenjang:'710d3de2-253e-4d93-8403-bbecdec0c73d',
      nama_pelanggan: 'Siska S',
      nomor_hp_pelanggan: '082345678901',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '1ba6bcf6-2053-42db-ba5b-8d17c204dfe7',
      id_jenjang:'d99e1af6-c676-4321-b659-c7da1d0af644',
      nama_pelanggan: 'Fenia Kim',
      nomor_hp_pelanggan: '0821295734859',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '8844b8d3-720a-4c8a-82b4-363dd63f5cbf',
      id_jenjang:'e6d12d6a-c6e0-4a1f-ba64-646a860840b4',
      nama_pelanggan: 'Evan Oh',
      nomor_hp_pelanggan: '08229573524',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '3a796a38-4450-4370-959d-023ce0e0d1b2',
      id_jenjang:'94e04f6e-989c-427e-b8e1-8cf29238ac8a',
      nama_pelanggan: 'Felix Lie',
      nomor_hp_pelanggan: '085638594937',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '4146f42d-de37-4707-9bba-f2a489c99904',
      id_jenjang:'b1d5610c-6e5c-4405-a8d6-a5a18fca18fe',
      nama_pelanggan: 'Hanna Tas',
      nomor_hp_pelanggan: '085638594726',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: 'e5b90611-2dbc-4266-af8e-a928073c68bf',   
      id_jenjang:'38886c03-52eb-4802-90a2-163819dd66c6',
      nama_pelanggan: 'Marky Sim',
      nomor_hp_pelanggan: '082195746254',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '2e2dea86-53be-4f92-aba5-9b8d5da6970c',
      id_jenjang:'0798ea66-5761-4055-a469-ce9a23a23e63',
      nama_pelanggan: 'Eng Song',
      nomor_hp_pelanggan: '082293746382',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: 'aa2e4442-2a20-40ab-ae01-21f39ce7d59f',
      id_jenjang:'73be0dc7-de82-4302-95c0-7d79f5620e15',
      nama_pelanggan: 'Yo Shin',
      nomor_hp_pelanggan: '082258694735',
      tanggal_daftar_pelanggan: new Date(),
    },
    {
      id_pelanggan: '115fe5f4-8074-4df1-b571-a1854ec4b762',
      id_jenjang:'52d79351-953a-43d3-ba53-95399ac986ea',
      nama_pelanggan: 'Mel Park',
      nomor_hp_pelanggan: '082295735241',
      tanggal_daftar_pelanggan: new Date(),
    },
  ];
  
  const bahan = [
    {
      id_bahan: '4bfb94da-5c59-4a3d-8bb1-e6a2c955b08d',
      id_karyawan:'a660ed32-8dfc-4540-9128-2e148b11ecc2',
      nama_bahan: 'Kopi Kapal Api',
      kategori_bahan: 'Kopi',
      stok_bahan:'10kg',
    },
    {
      id_bahan: 'aee64fad-e036-4452-b01b-1413ada279c7',
      id_karyawan:'bf6d2e0b-8ea2-459a-a5bf-a143ab97c1f0',
      nama_bahan: 'Kopi Arabica',
      kategori_bahan: 'Kopi',
      stok_bahan:'10kg',
    },
    {
      id_bahan: 'cb9a049f-f36d-4254-8c5a-bdc3a1b435cf',
      id_karyawan:'76de38d3-5849-41df-96ad-ad69b71ba2a2',
      nama_bahan: 'Dancow',
      kategori_bahan: 'Susu',
      stok_bahan:'15kg',
    },
    {
      id_bahan: 'dd4d57e0-4795-4627-b044-34ae9f9590e7',
      id_karyawan:'8778cf5b-f3cb-4b8f-be50-767ad5c8af65',
      nama_bahan: 'Kopi Luwak',
      kategori_bahan: 'Kopi',
      stok_bahan:'13kg',
    },
    {
      id_bahan: 'b9ddc568-4a73-4b3e-ac70-aa5943683c23',
      id_karyawan:'6cb9af25-0a75-4462-8b56-8a8f85b7c762',
      nama_bahan: 'Kental Manis',
      kategori_bahan: 'Susu',
      stok_bahan:'14kg',
    },
    {
      id_bahan: '7eb2907d-ec09-4a6c-b911-52d1e7eb2f91',
      id_karyawan:'f7f73c52-b043-4adb-ab6e-93402a7745b3',
      nama_bahan: 'ABC Melon',
      kategori_bahan: 'Sirup',
      stok_bahan:'4kg',
    },
    {
      id_bahan: '90a4c2c7-3039-4ece-9136-33f6590d56e3',
      id_karyawan:'1b734392-532f-48c0-82b3-dd7a98615b44',
      nama_bahan: 'ABC Stroberi',
      kategori_bahan: 'Sirup',
      stok_bahan:'5kg',
    },
    {
      id_bahan: 'e393018b-748d-4ff7-948e-165f31dc25b9',
      id_karyawan:'6eb8b989-32eb-4785-863d-3119254aa12f',
      nama_bahan: 'Coklat Hazelnut',
      kategori_bahan: 'Selai',
      stok_bahan:'7kg',
    },
    {
      id_bahan: '3238af3a-eedc-43ca-a1ae-2c401489fed9',
      id_karyawan:'76c4a270-d66d-46b3-8d9f-8ea359778864',
      nama_bahan: 'Srikaya',
      kategori_bahan: 'Selai',
      stok_bahan:'5kg',
    },
    {
      id_bahan: 'fde214aa-fb88-4a92-b098-dfcc28c5ab82',
      id_karyawan:'7d0fe387-9723-4592-aa5a-84740d2a0d60',
      nama_bahan: 'Mangga',
      kategori_bahan: 'Selai',
      stok_bahan:'5kg',
    },
  ];
  
  const detail_diskon = [
    {
      id_detail_diskon:'cee08475-548a-417a-bcc0-3877ea1b38b4',
      id_pelanggan: '9f645cda-2e37-47b7-961d-9a5dc40bcacf',
      id_jenjang: '97f35953-85c2-443c-b1c7-1361869f172e',
      id_transaksi:'f6367d98-1007-4f5d-9458-b443fd45b244',
    },
    {
      id_detail_diskon:'fd69d026-ce9f-4b41-b086-23b0662d4f35',
      id_pelanggan: '54ea55d3-42a2-4574-934e-9aba37427594',
      id_jenjang: '710d3de2-253e-4d93-8403-bbecdec0c73d',
      id_transaksi:'f319caff-b614-4bb4-9873-5ce18d9b4fa7',
    },
    {
      id_detail_diskon:'382b5c7e-f76e-44b4-af6a-950219d0d9cf',
      id_pelanggan: '1ba6bcf6-2053-42db-ba5b-8d17c204dfe7',
      id_jenjang: 'd99e1af6-c676-4321-b659-c7da1d0af644',
      id_transaksi:'37f905e1-e55c-4003-87d1-39bbdd524793',
    },
    {
      id_detail_diskon:'ddb71a81-a6c7-4963-823a-4f472c144379',
      id_pelanggan: '8844b8d3-720a-4c8a-82b4-363dd63f5cbf',
      id_jenjang: 'e6d12d6a-c6e0-4a1f-ba64-646a860840b4',
      id_transaksi:'279011b9-89c7-4540-aef7-702bbef3391e',
    },
    {
      id_detail_diskon:'be132fe3-8118-4dea-a90c-a3d47e9dcf6c',
      id_pelanggan: '3a796a38-4450-4370-959d-023ce0e0d1b2',
      id_jenjang: '94e04f6e-989c-427e-b8e1-8cf29238ac8a',
      id_transaksi:'5fe90966-bdd7-4d1a-b077-06612e5db313',
    },
    {
      id_detail_diskon:'34786a7c-009b-4d9e-8f7c-46d8eba380fa',
      id_pelanggan: '4146f42d-de37-4707-9bba-f2a489c99904',
      id_jenjang: 'b1d5610c-6e5c-4405-a8d6-a5a18fca18fe',
      id_transaksi:'83e1a6f3-f388-4c33-a878-90d7ab579740',
    },
    {
      id_detail_diskon:'92345769-cb9e-45de-b1af-88bbab70ede3',
      id_pelanggan: 'e5b90611-2dbc-4266-af8e-a928073c68bf',
      id_jenjang: '38886c03-52eb-4802-90a2-163819dd66c6',
      id_transaksi:'40203b32-d65b-4111-ad2a-6ef928e4e7e1',
    },
    {
      id_detail_diskon:'985a5d83-dc6b-4429-8727-3cba2c62b583',
      id_pelanggan: '2e2dea86-53be-4f92-aba5-9b8d5da6970c',
      id_jenjang: '0798ea66-5761-4055-a469-ce9a23a23e63',
      id_transaksi:'36c8bdc8-6263-4ebb-b0fc-4c19f3ae5640',
    },
    {
      id_detail_diskon:'d3143974-2f33-4aaf-8aed-9af48f948a01',
      id_pelanggan: 'aa2e4442-2a20-40ab-ae01-21f39ce7d59f',
      id_jenjang: '73be0dc7-de82-4302-95c0-7d79f5620e15',
      id_transaksi:'390d00b5-222e-4250-95fc-2ff902891bc6',
    },
    {
      id_detail_diskon:'3bad1399-35ca-4eef-bd98-2307732e03e9',
      id_pelanggan: '115fe5f4-8074-4df1-b571-a1854ec4b762',
      id_jenjang: '52d79351-953a-43d3-ba53-95399ac986ea',
      id_transaksi:'615c0590-2925-4283-a51b-16f159a4a3ba',
    },
  ]
  
  const karyawan = [
    {
      id_karyawan: 'a660ed32-8dfc-4540-9128-2e148b11ecc2',
      nama_karyawan: 'Engky Wong',
      nomor_hp_karyawan: '082299329122',
      bank_karyawan:'BRI',
      nomor_rekening_karyawan:'234234277532',
      alamat_karyawan:'Jl. Tambak Bayan no 5a',
      kata_sandi_karyawan:'admin',
      username_karyawan:'engky.wong',
      role_karyawan:'SPV'
    },
  {
      id_karyawan: 'bf6d2e0b-8ea2-459a-a5bf-a143ab97c1f0',
      nama_karyawan: 'Ayu Cantika',
      nomor_hp_karyawan: '083837957362',
      bank_karyawan:'BRI',
      nomor_rekening_karyawan:'235930277540',
      alamat_karyawan:'Jl. Tambak Bayan no 6a	',
      kata_sandi_karyawan:'admin1',
      username_karyawan:'ayu.cantika',
      role_karyawan:'karyawan'
    },
  
  {
    id_karyawan: '76de38d3-5849-41df-96ad-ad69b71ba2a2',
    nama_karyawan: 'Budianto Agung',
    nomor_hp_karyawan: '082194726142',
    bank_karyawan:'BRI',
    nomor_rekening_karyawan:'495930277162',
    alamat_karyawan:'Jl. Tambak Bayan no 7a	',
    kata_sandi_karyawan:'admin2',
    username_karyawan:'budianto.agung',
    role_karyawan:'karyawan'
    },
  
  {
    id_karyawan: '8778cf5b-f3cb-4b8f-be50-767ad5c8af65',
    nama_karyawan: 'Cecep Pribadi',
    nomor_hp_karyawan: '082295757790',
    bank_karyawan:'BCA',
    nomor_rekening_karyawan:'4967205821',
    alamat_karyawan:'Jl. Tambak Bayan no 8a',
    kata_sandi_karyawan:'admin3',
    username_karyawan:'cecep.pribadi',
    role_karyawan:'karyawan'
    },
  {
    id_karyawan: '6cb9af25-0a75-4462-8b56-8a8f85b7c762',
    nama_karyawan: 'Dani Sutarno',
    nomor_hp_karyawan: '082256706843',
    bank_karyawan:'BCA',
    nomor_rekening_karyawan:'7867205893',
    alamat_karyawan:'Jl. Tambak Bayan no 9a',
    kata_sandi_karyawan:'admin4',
    username_karyawan:'dani.sutarno',
    role_karyawan:'karyawan'
    },
  {
    id_karyawan: 'f7f73c52-b043-4adb-ab6e-93402a7745b3',
    nama_karyawan: 'Mervelyne Jo',
    nomor_hp_karyawan: '082291174931',
    bank_karyawan:'BCA',
    nomor_rekening_karyawan:'0374833436',
    alamat_karyawan:'Jl. Tambak Bayan no 10a',
    kata_sandi_karyawan:'admin5',
    username_karyawan:'mervelyne.jo	',
    role_karyawan:'karyawan'
    },
  {
    id_karyawan: '1b734392-532f-48c0-82b3-dd7a98615b44',
    nama_karyawan: 'Mark Dion',
    nomor_hp_karyawan: '085693752840',
    bank_karyawan:'Mandiri',
    nomor_rekening_karyawan:'5874833436682',
    alamat_karyawan:'Jl. Tambak Bayan no 11a',
    kata_sandi_karyawan:'admin6',
    username_karyawan:'mark.dion',
    role_karyawan:'karyawan'
    },
  {
    id_karyawan: '6eb8b989-32eb-4785-863d-3119254aa12f',
    nama_karyawan: 'Febi Siman',
    nomor_hp_karyawan: '085258391047',
    bank_karyawan:'Mandiri',
    nomor_rekening_karyawan:'9874833436688',
    alamat_karyawan:'Jl. Tambak Bayan no 12a',
    kata_sandi_karyawan:'admin7',
    username_karyawan:'febi.siman',
    role_karyawan:'karyawan'
    },
  {
    id_karyawan: '76c4a270-d66d-46b3-8d9f-8ea359778864',
    nama_karyawan: 'Ekif Lim	',
    nomor_hp_karyawan: '082205836251',
    bank_karyawan:'BCA',
    nomor_rekening_karyawan:'0473658361',
    alamat_karyawan:'Jl. Tambak Bayan no 13a',
    kata_sandi_karyawan:'admin8',
    username_karyawan:'ekif.lim',
    role_karyawan:'karyawan'
    },
  {
    id_karyawan: '7d0fe387-9723-4592-aa5a-84740d2a0d60',
    nama_karyawan: 'Yohanes Kevin',
    nomor_hp_karyawan: '087755116033',
    bank_karyawan:'BCA',
    nomor_rekening_karyawan:'6673658369',
    alamat_karyawan:'Jl. Tambak Bayan no 14a',
    kata_sandi_karyawan:'admin9',
    username_karyawan:'yohanes.kevin',
    role_karyawan:'karyawan'
    },
  ];
  
  // Data tambahan untuk tabel lain
  const my_reward = [
    {
      id_my_reward: 'd585cff7-c244-4d75-951a-f3afbcbf41f4',
      id_transaksi: 'f6367d98-1007-4f5d-9458-b443fd45b244',
      id_pelanggan: '9f645cda-2e37-47b7-961d-9a5dc40bcacf',
      poin:'130000',
    },
    {
      id_my_reward: '14fcf603-0994-4b5d-b914-1f25f9fc7d68',
      id_transaksi: 'f319caff-b614-4bb4-9873-5ce18d9b4fa7',
      id_pelanggan: '54ea55d3-42a2-4574-934e-9aba37427594',
      poin:'120000',
    },
    {
      id_my_reward: '96a211fe-603b-4c07-8199-d3545776e859',
      id_transaksi: '37f905e1-e55c-4003-87d1-39bbdd524793',
      id_pelanggan: '1ba6bcf6-2053-42db-ba5b-8d17c204dfe7',
      poin:'110000',
    },
    {
      id_my_reward: 'c9f8b6c8-703c-4f4e-8ab4-7e798e7986c9',
      id_transaksi: '5fe90966-bdd7-4d1a-b077-06612e5db313',
      id_pelanggan: '8844b8d3-720a-4c8a-82b4-363dd63f5cbf',
      poin:'100000',
    },
    {
      id_my_reward: '1a339a32-2a3a-47e3-b6b6-c94248a6bcd4',
      id_transaksi: '279011b9-89c7-4540-aef7-702bbef3391e',
      id_pelanggan: '3a796a38-4450-4370-959d-023ce0e0d1b2',
      poin:'90000',
    },
    {
      id_my_reward: 'a95711aa-740b-4c2f-b9e9-61a448f989f2',
      id_transaksi: '83e1a6f3-f388-4c33-a878-90d7ab579740',
      id_pelanggan: '4146f42d-de37-4707-9bba-f2a489c99904',
      poin:'80000',
    },
    {
      id_my_reward: 'be685da3-d2b1-4a22-9ea2-b597abd937a1',
      id_transaksi: '40203b32-d65b-4111-ad2a-6ef928e4e7e1',
      id_pelanggan: 'e5b90611-2dbc-4266-af8e-a928073c68bf',
      poin:'70000',
    },
    {
      id_my_reward: '8c06f7a9-1eda-4fd9-bcc6-6d889f1a5c8b',
      id_transaksi: '36c8bdc8-6263-4ebb-b0fc-4c19f3ae5640',
      id_pelanggan: '2e2dea86-53be-4f92-aba5-9b8d5da6970c',
      poin:'60000',
    },
    {
      id_my_reward: '00fce932-0d0d-4980-93d9-ecd09ac3c2d6',
      id_transaksi: '390d00b5-222e-4250-95fc-2ff902891bc6',
      id_pelanggan: 'aa2e4442-2a20-40ab-ae01-21f39ce7d59f',
      poin:'50000',
    },
    {
      id_my_reward: '1241e168-2836-4100-9f96-4b47be0d91d2',
      id_transaksi: '615c0590-2925-4283-a51b-16f159a4a3ba',
      id_pelanggan: '115fe5f4-8074-4df1-b571-a1854ec4b762',
      poin:'40000',
    },
  ];
  
  const transaksi = [
    {
      id_transaksi: 'f6367d98-1007-4f5d-9458-b443fd45b244',
      id_karyawan: 'a660ed32-8dfc-4540-9128-2e148b11ecc2',
      id_pelanggan: '9f645cda-2e37-47b7-961d-9a5dc40bcacf',
      total_transaksi: 50000,
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: 'f319caff-b614-4bb4-9873-5ce18d9b4fa7',
      id_karyawan: 'bf6d2e0b-8ea2-459a-a5bf-a143ab97c1f0',
      id_pelanggan: '54ea55d3-42a2-4574-934e-9aba37427594',
      total_transaksi:'10000',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '37f905e1-e55c-4003-87d1-39bbdd524793',
      id_karyawan: '76de38d3-5849-41df-96ad-ad69b71ba2a2',
      id_pelanggan: '1ba6bcf6-2053-42db-ba5b-8d17c204dfe7',
      total_transaksi:'8750',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '5fe90966-bdd7-4d1a-b077-06612e5db313',
      id_karyawan: '8778cf5b-f3cb-4b8f-be50-767ad5c8af65',
      id_pelanggan: '8844b8d3-720a-4c8a-82b4-363dd63f5cbf',
      total_transaksi:'15000',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '279011b9-89c7-4540-aef7-702bbef3391e',
      id_karyawan: '6cb9af25-0a75-4462-8b56-8a8f85b7c762',
      id_pelanggan: '3a796a38-4450-4370-959d-023ce0e0d1b2',
      total_transaksi:'15000',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '83e1a6f3-f388-4c33-a878-90d7ab579740',
      id_karyawan: 'f7f73c52-b043-4adb-ab6e-93402a7745b3',
      id_pelanggan: '4146f42d-de37-4707-9bba-f2a489c99904',
      total_transaksi:'25000',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '40203b32-d65b-4111-ad2a-6ef928e4e7e1',
      id_karyawan: '1b734392-532f-48c0-82b3-dd7a98615b44',
      id_pelanggan: 'e5b90611-2dbc-4266-af8e-a928073c68bf',
      total_transaksi:'25000',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '36c8bdc8-6263-4ebb-b0fc-4c19f3ae5640',
      id_karyawan: '6eb8b989-32eb-4785-863d-3119254aa12f',
      id_pelanggan: '2e2dea86-53be-4f92-aba5-9b8d5da6970c',
      total_transaksi:'18750',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '390d00b5-222e-4250-95fc-2ff902891bc6',
      id_karyawan: '76c4a270-d66d-46b3-8d9f-8ea359778864',
      id_pelanggan: 'aa2e4442-2a20-40ab-ae01-21f39ce7d59f',
      total_transaksi:'23750',
      waktu_transaksi: new Date(),
    },
    {
      id_transaksi: '615c0590-2925-4283-a51b-16f159a4a3ba',
      id_karyawan: '7d0fe387-9723-4592-aa5a-84740d2a0d60',
      id_pelanggan: '115fe5f4-8074-4df1-b571-a1854ec4b762',
      total_transaksi:'23750',
      waktu_transaksi: new Date(),
    },
  ];
  
  const detail_transaksi = [
    {
      id_detail_transaksi:'5b70c5b1-6e3a-4bf7-a0f0-488082f852e6',
      id_transaksi: 'f6367d98-1007-4f5d-9458-b443fd45b244',
      id_produk: '1f4917ee-104c-4706-94e5-424baeee48df',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'467c3a07-2505-4b07-a4cd-e2dffb4a0822',
      id_transaksi: 'f319caff-b614-4bb4-9873-5ce18d9b4fa7',
      id_produk: 'b96737ec-ac10-4947-aac2-c3b87ceb6be4',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'7dc9c58a-93e2-4c89-a38f-6539e500d57a',
      id_transaksi: '37f905e1-e55c-4003-87d1-39bbdd524793',
      id_produk: '596a8110-26e6-4c57-8b3b-b0e8e3e7b437',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'8e30e1db-2383-41e3-adaf-4711cd7de2d1',
      id_transaksi: '279011b9-89c7-4540-aef7-702bbef3391e',
      id_produk: '6ae8b782-6322-4bc0-9d93-44bfa40555e3',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'3289f810-b3fa-49f0-a19e-e4e705a1fd8b',
      id_transaksi: '5fe90966-bdd7-4d1a-b077-06612e5db313',
      id_produk: 'a23d26c5-dd8f-4ff8-994c-795df08de732',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'d3732414-8617-4ba7-9a99-66d22403eddd',
      id_transaksi: '83e1a6f3-f388-4c33-a878-90d7ab579740',
      id_produk: 'c9af26f5-7e01-4034-8242-3b67c3d74311',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'5af64560-72b7-4f15-9038-2f14b02a46b0',
      id_transaksi: '40203b32-d65b-4111-ad2a-6ef928e4e7e1',
      id_produk: '9a1af8a3-c6d7-4f14-a7af-bc3c64ce3e5d',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'d4559325-ba1e-4907-adb5-9ad12fe706cf',
      id_transaksi: '36c8bdc8-6263-4ebb-b0fc-4c19f3ae5640',
      id_produk: '19f18df6-6d1a-4c95-b3fc-05fa46cf7f21',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'c2529c95-3bee-4ee4-8d07-fdb6df0a047c',
      id_transaksi: '390d00b5-222e-4250-95fc-2ff902891bc6',
      id_produk: '4ae1f752-a982-46fa-a375-8b7ff0009422',
      jumlah_transaksi:'2',
    },
    {
      id_detail_transaksi:'6d50bb10-0aad-4077-ba19-4468fb769329',
      id_transaksi: '615c0590-2925-4283-a51b-16f159a4a3ba',
      id_produk: 'bee66a02-d659-4034-bc9b-1653e4f4b0c2',
      jumlah_transaksi:'2',
    },
  ];
  
  const produk = [
    {
      id_produk: 'b96737ec-ac10-4947-aac2-c3b87ceb6be4',
      nama_produk: 'Ice Kopi Susu Gula Aren',
      harga_produk: '15000',
      kategori_produk:'Minuman',
      gambar:'NULL',
    },
    {
      id_produk: '596a8110-26e6-4c57-8b3b-b0e8e3e7b437',
      nama_produk: 'Ropang Original',
      harga_produk: '8750',
      kategori_produk:'Makanan',
      gambar:'NULL',
    },
    {
      id_produk: '6ae8b782-6322-4bc0-9d93-44bfa40555e3',
      nama_produk: 'Ice Kopi Hitam',
      harga_produk: '10000',
      kategori_produk:'Minuman',
      gambar:'NULL',
    },
    {
      id_produk: 'a23d26c5-dd8f-4ff8-994c-795df08de732',
      nama_produk: 'Ice Kopi Susu Bandung',
      harga_produk: '18500',
      kategori_produk:'Minuman',
      gambar:'NULL',
    },
    {
      id_produk: 'c9af26f5-7e01-4034-8242-3b67c3d74311',
      nama_produk: 'Ropang Noughat',
      harga_produk: '10000',
      kategori_produk:'Makanan',
      gambar:'NULL',
    },
    {
      id_produk: '9a1af8a3-c6d7-4f14-a7af-bc3c64ce3e5d',
      nama_produk: 'Ropang Chick And Cheese',
      harga_produk: '15000',
      kategori_produk:'Makanan',
      gambar:'NULL',
    },
    {
      id_produk: '19f18df6-6d1a-4c95-b3fc-05fa46cf7f21',
      nama_produk: 'Ropang Ham And Cheese',
      harga_produk: '16000',
      kategori_produk:'Makanan',
      gambar:'NULL',
    },
    {
      id_produk: '4ae1f752-a982-46fa-a375-8b7ff0009422',
      nama_produk: 'Ropang Cheese	',
      harga_produk: '9000',
      kategori_produk:'Makanan',
      gambar:'NULL',
    },
    {
      id_produk: 'bee66a02-d659-4034-bc9b-1653e4f4b0c2',
      nama_produk: 'Ice Matcha',
      harga_produk: '10000',
      kategori_produk:'Minuman',
      gambar:'NULL',
    },
    {
      id_produk: '1f4917ee-104c-4706-94e5-424baeee48df',
      nama_produk: 'ice hazelnut latte',
      harga_produk: '17500',
      kategori_produk:'Minuman',
      gambar:'NULL',
    },
  ];
  
  const jenjang = [
    {
      id_jenjang: '97f35953-85c2-443c-b1c7-1361869f172e',
      nama_jenjang: 'Gold',
      diskon: '30',
      batas_pemakaian:'3',
    },
    {
      id_jenjang: '710d3de2-253e-4d93-8403-bbecdec0c73d',
      nama_jenjang: 'Gold',
      diskon: '30',
      batas_pemakaian:'4',
    },
    {
      id_jenjang: 'd99e1af6-c676-4321-b659-c7da1d0af644',
      nama_jenjang: 'Gold',
      diskon: '30',
      batas_pemakaian:'2',
    },
    {
      id_jenjang: 'e6d12d6a-c6e0-4a1f-ba64-646a860840b4',
      nama_jenjang: 'Silver',
      diskon: '15',
      batas_pemakaian:'2',
    },
    {
      id_jenjang: '94e04f6e-989c-427e-b8e1-8cf29238ac8a',
      nama_jenjang: 'Silver',
      diskon: '15',
      batas_pemakaian:'3',
    },
    {
      id_jenjang: 'b1d5610c-6e5c-4405-a8d6-a5a18fca18fe',
      nama_jenjang: 'Silver',
      diskon: '15',
      batas_pemakaian:'5',
    },
    {
      id_jenjang: '38886c03-52eb-4802-90a2-163819dd66c6',
      nama_jenjang: 'Bronze',
      diskon: '10',
      batas_pemakaian:'3',
    },
    {
      id_jenjang: '0798ea66-5761-4055-a469-ce9a23a23e63',
      nama_jenjang: 'Bronze',
      diskon: '10',
      batas_pemakaian:'5',
    },
    {
      id_jenjang: '73be0dc7-de82-4302-95c0-7d79f5620e15',
      nama_jenjang: 'Bronze',
      diskon: '10',
      batas_pemakaian:'2',
    },
    {
      id_jenjang: '52d79351-953a-43d3-ba53-95399ac986ea',
      nama_jenjang: 'Bronze',
      diskon: '10',
      batas_pemakaian:'1',
    },
  ];

const penjualan = [
  { month: 'Jan', year: '2024', penjualan: 2000 },
  { month: 'Feb', year: '2024',penjualan: 1800 },
  { month: 'Mar', year: '2024',penjualan: 2200 },
  { month: 'Apr', year: '2024',penjualan: 2500 },
  { month: 'May',year: '2024', penjualan: 2300 },
  { month: 'Jun',year: '2024', penjualan: 3200 },
  { month: 'Jul', year: '2024',penjualan: 3500 },
  { month: 'Aug', year: '2024',penjualan: 3700 },
  { month: 'Sep',year: '2024', penjualan: 2500 },
  { month: 'Oct',year: '2024', penjualan: 2800 },
  { month: 'Nov', year: '2024',penjualan: 3000 },
  { month: 'Dec', year: '2024',penjualan: 4800 },
];

// // export { users, customers, invoices, penjualan };
export { users, pelanggan, penjualan, produk, bahan, transaksi, detail_transaksi, jenjang, my_reward, detail_diskon,karyawan };
// module.exports = { users, pelanggan, penjualan, produk, bahan, transaksi, detail_transaksi, jenjang, my_reward, detail_diskon, karyawan };
