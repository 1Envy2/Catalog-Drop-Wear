# drop.wear (My Katalog Wear)

drop.wear adalah platform katalog dan e-commerce pakaian bergaya modern minimalis yang dirancang dengan performa tinggi dan desain UI/UX yang premium. Platform ini mendukung pengelolaan keranjang belanja (cart) interaktif dan terintegrasi penuh dengan sistem pembayaran online yang aman.

## 🚀 Fitur Utama
- **Katalog Produk Dinamis:** Menampilkan produk pakaian dengan desain responsif.
- **State Management (Cart):** Pengelolaan keranjang belanja secara *real-time* menggunakan Zustand.
- **Checkout & Payment Gateway:** Terintegrasi dengan Midtrans (Snap) untuk pembayaran instan dan aman (mendukung e-wallet, virtual account, kartu kredit, dll).
- **Sistem Webhook yang Aman:** Sinkronisasi status pembayaran secara otomatis dengan database menggunakan validasi signature Midtrans dan Supabase Service Role (Anti-Manipulasi Harga).
- **Validasi Form:** Pengisian data pesanan divalidasi dengan sangat aman menggunakan Zod dan React Hook Form.

## 🛠️ Teknologi yang Digunakan
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Database & Backend API:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Payment Gateway:** [Midtrans](https://midtrans.com/) (Snap UI & Node.js API)

---

## 💻 Cara Menjalankan Project (Local Development)

### 1. Persiapan Awal
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi terbaru disarankan).

Kloning atau buka folder repositori ini di terminal Anda:
```bash
cd my-katalog-wear
```

### 2. Install Dependensi
Jalankan perintah berikut untuk mengunduh semua paket yang dibutuhkan:
```bash
npm install
```

### 3. Pengaturan Environment Variables (.env)
Project ini membutuhkan kredensial dari layanan pihak ketiga (Supabase & Midtrans). Buat file bernama `.env.local` di folder *root* proyek (sejajar dengan file `package.json`) lalu isi dengan format berikut:

```env
# ===== SUPABASE CONFIGURATION =====
# Dapatkan dari Dashboard Supabase -> Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Rahasia Backend (Jangan pernah dibagikan ke client/frontend!)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ===== MIDTRANS CONFIGURATION =====
# Dapatkan dari Dashboard Midtrans (Sandbox / Production) -> Settings -> Access Keys
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser Anda dan kunjungi [http://localhost:3000](http://localhost:3000) untuk melihat website beroperasi.

### 5. Simulasi Manajemen Pesanan (Halaman Admin Rahasia)
Karena sistem *webhook* dari Midtrans tidak bisa diakses secara langsung di `localhost`, pembayaran sukses tidak akan otomatis mengubah status pesanan.
Untuk mengubah status pesanan dan memasukkan nomor resi pengiriman secara manual, Anda dapat menggunakan halaman admin rahasia:
- Akses URL: [http://localhost:3000/admin-secret-update](http://localhost:3000/admin-secret-update)
- Halaman ini tidak terhubung dengan UI publik dan diperuntukkan bagi admin untuk melakukan update status pengiriman (*Shipped*, *Delivered*) serta input nama Kurir dan Nomor Resi.

---

## 🤝 Cara Berkontribusi

Jika Anda masuk ke dalam tim *developer* atau ingin berkontribusi pada repositori ini, ikuti langkah berikut:

1. **Buat Branch Baru:** Jangan melakukan push langsung ke branch `main`. Buat branch baru untuk fitur atau perbaikan Anda.
   ```bash
   git checkout -b feature/nama-fitur-anda
   ```
2. **Kembangkan Kode:** Tulis kode Anda, pastikan tidak ada *error*, dan pastikan tampilan UI tidak rusak (responsive).
3. **Commit Perubahan:**
   ```bash
   git add .
   git commit -m "feat: Menambahkan fitur X"
   ```
4. **Push & Pull Request:** Push branch Anda ke repositori dan buka *Pull Request* agar bisa ditinjau oleh developer lainnya.
   ```bash
   git push origin feature/nama-fitur-anda
   ```

## 🔐 Standar Keamanan & Panduan Penggunaan API
Bagi developer yang mengembangkan API, **mohon perhatikan:**
- **Jangan Percaya Data Harga dari Client:** Selalu verifikasi `total_price` dari Supabase berdasarkan ID keranjang atau produk. Harga tidak boleh dikalkulasi dari *request payload* (seperti pada API Tokenizer).
- **Gunakan Service Role untuk Webhook:** Gunakan `supabaseAdmin` di backend (misal: webhook pembayaran) untuk memperbarui data sensitif yang melampaui aturan RLS (Row Level Security).
